import TryCatch from "../middlewares/tryCatch.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/lecture.js";
import { User } from "../models/user.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

export const createCourse = TryCatch(async (req, res) => {
  const { title, description, category, createdBy, duration, price } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: "Course thumbnail image is required" });
  }

  const cloudResult = await uploadToCloudinary(image.path, "learnsphere/courses");

  await Courses.create({
    title,
    description,
    category,
    createdBy,
    image: cloudResult.url,
    duration,
    price,
  });
  res.status(201).json({
    message: "course created successfully",
  });
});

export const addLecture = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);
  if (!course)
    return res.status(404).json({
      message: "No course with this id",
    });

  const { title, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "Lecture video file is required" });
  }

  const cloudResult = await uploadToCloudinary(file.path, "learnsphere/lectures", {
    resource_type: "video",
    type: "authenticated",
  });

  const lecture = await Lecture.create({
    title,
    description,
    video: cloudResult.url,
    videoPublicId: cloudResult.public_id,
    course: course._id,
  });

  res.status(202).json({
    message: "Lecture added",
    lecture,
  });
});

export const deleteLecture = TryCatch(async (req, res) => {
  const lecture = await Lecture.findById(req.params.id);

  if (lecture) {
    await deleteFromCloudinary(lecture.videoPublicId || lecture.video);
    await lecture.deleteOne();
  }

  res.json({ message: "Lecture deleted" });
});

export const deleteCourse = TryCatch(async (req, res) => {
  const course = await Courses.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const lectures = await Lecture.find({ course: course._id });

  await Promise.all(
    lectures.map(async (lecture) => {
      await deleteFromCloudinary(lecture.videoPublicId || lecture.video);
    })
  );

  await deleteFromCloudinary(course.image);

  await Lecture.find({ course: req.params.id }).deleteMany();
  await course.deleteOne();
  await User.updateMany({}, { $pull: { subscription: req.params.id } });

  res.json({
    message: "Course deleted",
  });
});


import { Payment } from "../models/payment.js";

export const getAllStats = TryCatch(async (req, res) => {
  const totalCourses = (await Courses.find()).length;
  const totalLectures = (await Lecture.find()).length;
  const totalUsers = (await User.find()).length;
  const users = await User.find({}).select("-password");
  const payments = await Payment.find({}).sort({ createdAt: -1 });

  const stats = {
    totalCourses,
    totalLectures,
    totalUsers,
    users,
    payments,
  };
  res.json({
    stats,
  });
});
