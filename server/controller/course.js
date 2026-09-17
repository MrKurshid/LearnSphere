import { instance } from "../index.js";
import TryCatch from "../middlewares/tryCatch.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/lecture.js";
import { Payment } from "../models/payment.js";
import { User } from "../models/user.js";
import { getAuthenticatedVideoUrl } from "../utils/cloudinary.js";
import crypto from "crypto";

const serializeLecture = (lecture) => {
  const result = lecture.toObject();
  if (result.videoPublicId) {
    result.video = getAuthenticatedVideoUrl(result.videoPublicId);
  }
  return result;
};

export const getAllCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find();
  res.json({
    courses,
  });
});

export const getSingleCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json({
    course,
  });
});

export const fetchLectures = TryCatch(async (req, res) => {
  const lectures = await Lecture.find({ course: req.params.id });

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lectures: lectures.map(serializeLecture) });
  }

  if (!user.subscription.some((courseId) => courseId.toString() === req.params.id))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });
  res.json({
    lectures: lectures.map(serializeLecture),
  });
});

export const fetchLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);
  if (!lecture) {
    return res.status(404).json({ message: "Lecture not found" });
  }

  const user = await User.findById(req.user._id);

  if (user.role === "admin") {
    return res.json({ lecture: serializeLecture(lecture) });
  }

  if (!user.subscription.some((courseId) => courseId.toString() === lecture.course.toString()))
    return res.status(400).json({
      message: "You have not subscribed to this course",
    });
  res.json({
    lecture: serializeLecture(lecture),
  });
});

export const getMyCourses = TryCatch(async (req, res) => {
  const courses = await Courses.find({ _id: req.user.subscription });

  res.json({
    courses,
  });
});

export const checkOut = TryCatch(async (req, res) => {
  console.log(`[Backend Checkout] User: ${req.user._id}, Course: ${req.params.id}`);
  const user = await User.findById(req.user._id);
  const course = await Courses.findById(req.params.id);

  if (!course) {
    console.log(`[Backend Checkout Error] Course not found: ${req.params.id}`);
    return res.status(404).json({ message: "Course not found" });
  }

  if (user.subscription.some((subId) => subId.toString() === course._id.toString())) {
    console.log(`[Backend Checkout Info] User already subscribed to course ${course._id}`);
    return res.status(400).json({
      message: "You have already purchased this course",
    });
  }

  if (!process.env.Razorpay_key || !process.env.Razorpay_Secret) {
    return res.status(503).json({ message: "Payments are not configured" });
  }

  const amount = Math.round(Number(course.price) * 100);
  if (!Number.isSafeInteger(amount) || amount <= 0) {
    return res.status(400).json({ message: "Course has an invalid price" });
  }

  const order = await instance.orders.create({
    amount,
    currency: "INR",
    receipt: `course_${course._id}_${Date.now()}`,
    notes: { userId: user._id.toString(), courseId: course._id.toString() },
  });

  await Payment.create({
    razorpay_order_id: order.id,
    user: user._id,
    course: course._id,
    amount: order.amount,
    currency: order.currency,
  });

  res.status(201).json({
    order,
    course,
  });
});

export const paymentVerification = TryCatch(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Incomplete payment details" });
  }

  const payment = await Payment.findOne({
    razorpay_order_id,
    user: req.user._id,
    course: req.params.id,
  });
  if (!payment || payment.status !== "created") {
    return res.status(400).json({ message: "Payment order is invalid or already processed" });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.Razorpay_Secret)
    .update(body)
    .digest("hex");
  const isAuthentic =
    razorpay_signature.length === expectedSignature.length &&
    crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(razorpay_signature));

  if (!isAuthentic) {
    return res.status(400).json({ message: "Payment verification failed" });
  }

  const user = await User.findById(req.user._id);
  const course = await Courses.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const completedPayment = await Payment.findOneAndUpdate(
    { _id: payment._id, status: "created" },
    {
      $set: {
        razorpay_payment_id,
        razorpay_signature,
        status: "paid",
      },
    },
    { new: true }
  );
  if (!completedPayment) {
    return res.status(400).json({ message: "Payment order is already processed" });
  }

  await User.updateOne(
    { _id: req.user._id },
    { $addToSet: { subscription: course._id } }
  );

  res.status(200).json({ message: "Course purchased successfully" });
});
