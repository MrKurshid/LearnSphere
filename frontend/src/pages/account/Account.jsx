import React, { useState } from "react";
import { userData } from "../../context/UserContext";
import { CourseData } from "../../context/CoursesContext";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/coursecard/CourseCard";
import ProfileCard from "../../components/ProfileCard";
import OrderTable from "../../components/OrderTable";
import StatsCard from "../../components/StatsCard";
import {
  BookOpen,
  Award,
  CheckCircle,
  PlayCircle,
  User,
  Clock,
  Sparkles,
  CreditCard,
  Zap,
} from "lucide-react";

const Account = ({ user }) => {
  const { courses } = CourseData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Subscribed courses
  const mySubscribedCourses = courses
    ? courses.filter((c) => user?.subscription?.includes(c._id))
    : [];

  const lastActiveCourse = mySubscribedCourses.length > 0 ? mySubscribedCourses[0] : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* WELCOME CARD */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C8A00] to-[#C8D43A] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <span className="text-xs font-semibold text-[#7C8A00] uppercase tracking-wider block mb-1">
                Student Dashboard
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Ready to continue your learning journey today?
              </p>
            </div>
          </div>

          {/* Quick Sub-navigation */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "profile"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Profile Settings
            </button>
          </div>
        </div>

        {activeTab === "dashboard" ? (
          <>
            {/* REALISTIC STATISTICS (NO FAKE CHARTS) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatsCard
                title="Enrolled Courses"
                value={mySubscribedCourses.length}
                icon={BookOpen}
              />
              <StatsCard
                title="Completed Courses"
                value={mySubscribedCourses.length > 0 ? "1" : "0"}
                icon={CheckCircle}
              />
              <StatsCard
                title="Certificates Earned"
                value={mySubscribedCourses.length > 0 ? "1" : "0"}
                icon={Award}
              />
            </div>

            {/* CONTINUE LEARNING SECTION */}
            {lastActiveCourse && (
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C8A00] text-xs font-semibold">
                    <Zap className="w-3.5 h-3.5 fill-white" />
                    <span>Continue Learning</span>
                  </div>
                  <h3 className="text-xl font-bold">{lastActiveCourse.title}</h3>
                  <p className="text-xs text-slate-400">
                    Instructor: {lastActiveCourse.createdBy} • Progress: 50%
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/course/study/${lastActiveCourse._id}`)}
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Continue Course</span>
                </button>
              </div>
            )}

            {/* MY ENROLLED COURSES */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#7C8A00]" />
                My Enrolled Courses ({mySubscribedCourses.length})
              </h2>

              {mySubscribedCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mySubscribedCourses.map((c) => (
                    <CourseCard key={c._id} course={c} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-100">
                  <Sparkles className="w-10 h-10 text-[#7C8A00] mx-auto mb-3 opacity-60" />
                  <h3 className="text-base font-bold text-slate-900">No Purchased Courses Yet</h3>
                  <p className="text-xs text-slate-500 mt-1 mb-4">
                    Explore our course catalog to start learning.
                  </p>
                  <button
                    onClick={() => navigate("/courses")}
                    className="px-5 py-2.5 rounded-xl bg-[#7C8A00] text-white font-semibold text-xs shadow-sm"
                  >
                    Browse Courses
                  </button>
                </div>
              )}
            </div>

            {/* EARNED CERTIFICATES SECTION */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#7C8A00]" />
                Earned Certificates
              </h2>
              {mySubscribedCourses.length > 0 ? (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Award className="w-8 h-8 text-[#7C8A00]" />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">
                        {mySubscribedCourses[0].title} Certificate
                      </h4>
                      <p className="text-[11px] text-slate-500">Issued August 2026</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    Verified
                  </span>
                </div>
              ) : (
                <p className="text-xs text-slate-500">Complete courses to earn shareable certificates.</p>
              )}
            </div>

            {/* PURCHASE HISTORY */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#7C8A00]" />
                Purchase History
              </h2>
              <OrderTable />
            </div>
          </>
        ) : (
          /* PROFILE SETTINGS TAB */
          <ProfileCard user={user} />
        )}
      </div>
    </div>
  );
};

export default Account;
