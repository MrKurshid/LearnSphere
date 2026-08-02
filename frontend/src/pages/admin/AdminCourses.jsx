import React, { useState } from "react";
import { CourseData } from "../../context/CoursesContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { Link } from "react-router-dom";
import { BookOpen, Plus, Search, Filter } from "lucide-react";

const AdminCourses = () => {
  const { courses } = CourseData();
  const [search, setSearch] = useState("");

  const filteredCourses = courses
    ? courses.filter((c) =>
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.category?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-[#7C8A00] uppercase tracking-wider block mb-1">
            Course Directory
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Course Management
          </h1>
        </div>

        <Link
          to="/admin/add-course"
          className="px-4 py-2.5 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Course</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search course title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs text-slate-900 focus:outline-none bg-transparent"
        />
      </div>

      {/* Courses Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#7C8A00]" />
          All Courses ({filteredCourses.length})
        </h2>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">No matching courses found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
