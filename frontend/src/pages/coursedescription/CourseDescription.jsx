import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../../main";
import { userData } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Clock,
  User,
  Star,
  BookOpen,
  CheckCircle,
  PlayCircle,
  ShieldCheck,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const CourseDescription = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user, isAuth, fetchUser } = userData();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const { data } = await axios.get(`${server}/api/course/${params.id}`);
        setCourse(data.course);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchCourseDetails();
  }, [params.id]);

  const isSubscribed = user?.subscription?.includes(params.id);

  const checkoutHandler = async () => {
    if (!isAuth) {
      toast.error("Please login to purchase course");
      return navigate("/login");
    }

    setBtnLoading(true);

    try {
      const { data } = await axios.get(
        `${server}/api/course/checkout/${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      // Razorpay Modal
      const options = {
        key: process.env.Razorpay_key || "rzp_test_placeholder",
        amount: data.order.amount,
        currency: "INR",
        name: "LearnSphere",
        description: `Enroll in ${course.title}`,
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const { data: verifyData } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  token: localStorage.getItem("token"),
                },
              }
            );

            toast.success(verifyData.message);
            await fetchUser();
            setBtnLoading(false);
            navigate(`/course/study/${params.id}`);
          } catch (err) {
            toast.error(err.response?.data?.message || "Payment Verification Failed");
            setBtnLoading(false);
          }
        },
        theme: {
          color: "#7C8A00",
        },
      };

      const razorpayWindow = new window.Razorpay(options);
      razorpayWindow.open();
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout Failed");
      setBtnLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin w-8 h-8 border-4 border-[#7C8A00] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h2 className="text-2xl font-bold">Course Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HERO COURSE BANNER */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C8A00]/10 text-[#7C8A00] font-semibold text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              {course.category || "Development"}
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-[#111827] tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-base text-[#6B7280] leading-relaxed">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#6B7280] pt-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#7C8A00]" />
                <span className="font-semibold text-[#111827]">{course.createdBy}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#7C8A00]" />
                <span>{course.duration} Weeks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-[#111827]">4.8 / 5.0</span>
              </div>
            </div>
          </div>

          {/* Right Card / Thumbnail */}
          <div className="lg:col-span-5 bg-[#FAFAFA] p-6 rounded-3xl border border-gray-100 text-center space-y-6">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
              <img
                src={`${server}/${course.image}`}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-sm text-[#6B7280]">Course Price</span>
              <span className="text-3xl font-extrabold text-[#111827]">₹{course.price}</span>
            </div>

            {isAuth ? (
              user && (user.role === "admin" || isSubscribed) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="w-full py-4 rounded-2xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-base shadow-lg shadow-[#7C8A00]/25 transition-all flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Go To Course Lectures</span>
                </button>
              ) : (
                <button
                  disabled={btnLoading}
                  onClick={checkoutHandler}
                  className="w-full py-4 rounded-2xl bg-[#111827] hover:bg-[#7C8A00] text-white font-semibold text-base shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>{btnLoading ? "Processing..." : "Buy Now"}</span>
                </button>
              )
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-full py-4 rounded-2xl bg-[#111827] hover:bg-[#7C8A00] text-white font-semibold text-base shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Login To Buy Course</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
