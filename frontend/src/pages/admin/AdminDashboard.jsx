import React, { useState, useEffect } from "react";
import { CourseData } from "../../context/CoursesContext";
import { server } from "../../main";
import axios from "axios";
import { Link } from "react-router-dom";
import StatsCard from "../../components/StatsCard";
import OrderTable from "../../components/OrderTable";
import CourseCard from "../../components/coursecard/CourseCard";
import {
  BookOpen,
  Video,
  Users,
  CreditCard,
  Plus,
  ArrowRight,
} from "lucide-react";

const AdminDashboard = () => {
  const { courses } = CourseData();
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLectures: 0,
    totalUsers: 0,
    users: [],
    payments: [],
  });

  async function fetchStats() {
    console.log("[API Call] GET /api/stats");
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log("[API Response] GET /api/stats:", data.stats);
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("[API Error] GET /api/stats failed:", error.response?.data);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-[#7C8A00] uppercase tracking-wider block mb-1">
            Admin Overview
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Summary
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/admin/add-course"
            className="px-4 py-2.5 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-xs shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </Link>
          <Link
            to="/admin/courses"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition-colors"
          >
            Manage Courses
          </Link>
        </div>
      </div>

      {/* REAL DATABASE STATISTICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Courses"
          value={stats.totalCourses || (courses ? courses.length : 0)}
          icon={BookOpen}
        />
        <StatsCard
          title="Video Lectures"
          value={stats.totalLectures || 0}
          icon={Video}
        />
        <StatsCard
          title="Registered Students"
          value={stats.totalUsers || 0}
          icon={Users}
        />
        <StatsCard
          title="Recorded Payments"
          value={stats.payments ? stats.payments.length : 0}
          icon={CreditCard}
        />
      </div>

      {/* RECENT COURSES SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#7C8A00]" />
            Recent Courses
          </h2>
          <Link
            to="/admin/courses"
            className="text-xs font-semibold text-[#7C8A00] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 3).map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">No courses created in database yet.</p>
        )}
      </div>

      {/* RECENT ORDERS TABLE */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#7C8A00]" />
            Recent Student Payments
          </h2>
          <Link
            to="/admin/orders"
            className="text-xs font-semibold text-[#7C8A00] hover:underline flex items-center gap-1"
          >
            <span>View All Payments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <OrderTable orders={stats.payments} />
      </div>
    </div>
  );
};

export default AdminDashboard;
