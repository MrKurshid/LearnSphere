import React from "react";
import { server } from "../../main";
import { userData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseData } from "../../context/CoursesContext";
import { motion } from "framer-motion";
import { Clock, User, Star, Trash2, PlayCircle, BookOpenCheck } from "lucide-react";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { user, isAuth } = userData();
  const { fetchCourses } = CourseData();

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this course?")) {
      console.log(`[API Call] DELETE /api/course/${id}`);
      try {
        const { data } = await axios.delete(`${server}/api/course/${id}`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });

        console.log(`[API Response] DELETE /api/course/${id} success:`, data.message);
        toast.success(data.message);
        fetchCourses();
      } catch (error) {
        console.error(`[API Error] DELETE /api/course/${id} failed:`, error.response?.data);
        toast.error(error.response?.data?.message || "Failed to delete course");
      }
    }
  };

  const isSubscribed = user?.subscription?.some(
    (subId) => subId?.toString() === course._id?.toString()
  );

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
    >
      {/* Thumbnail Header */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={`${server}/${course.image}`}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop";
          }}
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#7C8A00] font-semibold text-xs px-3 py-1 rounded-full shadow-sm">
          {course.category || "Development"}
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>4.8</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-[#111827] line-clamp-2 mb-2 group-hover:text-[#7C8A00] transition-colors">
            {course.title}
          </h3>

          <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-4">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7C8A00]" />
              <span className="truncate max-w-[120px]">{course.createdBy || "Instructor"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#7C8A00]" />
              <span>{course.duration} weeks</span>
            </div>
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3 mt-2">
          <div>
            <span className="text-xs text-[#6B7280] block">Price</span>
            <span className="text-xl font-bold text-[#111827]">₹{course.price}</span>
          </div>

          <div className="flex items-center gap-2">
            {isAuth ? (
              <>
                {user && user.role !== "admin" ? (
                  isSubscribed ? (
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white text-sm font-semibold shadow-md shadow-[#7C8A00]/20 transition-all"
                    >
                      <BookOpenCheck className="w-4 h-4" />
                      Study
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate(`/course/${course._id}`)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#7C8A00] text-white text-sm font-semibold transition-all"
                    >
                      <PlayCircle className="w-4 h-4" />
                      Enroll Now
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => navigate(`/course/study/${course._id}`)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white text-sm font-semibold shadow-md"
                  >
                    <BookOpenCheck className="w-4 h-4" />
                    Study
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#111827] hover:bg-[#7C8A00] text-white text-sm font-semibold transition-all"
              >
                Get Started
              </button>
            )}

            {user && user.role === "admin" && (
              <button
                onClick={() => deleteHandler(course._id)}
                className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                title="Delete Course"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
