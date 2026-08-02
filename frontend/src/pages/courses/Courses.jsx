import React, { useState, useMemo } from "react";
import { CourseData } from "../../context/CoursesContext";
import CourseCard from "../../components/coursecard/CourseCard";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  SlidersHorizontal,
  BookOpen,
  X,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";

const Courses = () => {
  const { courses } = CourseData();

  // Local state for search, filter & sorting UI
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ["All", "Web Development", "App Development", "Data Science", "Design", "Marketing"];

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    let result = [...courses];

    // Search Filter
    if (searchQuery.trim()) {
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.createdBy?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory !== "All") {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Sort logic
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "duration") {
      result.sort((a, b) => a.duration - b.duration);
    }

    return result;
  }, [courses, searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C8A00]/10 text-[#7C8A00] font-semibold text-xs uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Explore Catalog
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
              All Available <span className="text-[#7C8A00]">Courses</span>
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Browse top-tier programs taught by industry leaders.
            </p>
          </div>

          {/* Quick Mobile Filter Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-[#111827] shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#7C8A00]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses, topics, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAFAFA] text-[#111827] placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-[#7C8A00] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#7C8A00]" />
              <span>Sort By:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAFAFA] text-[#111827] text-sm font-medium border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#7C8A00]"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration (Weeks)</option>
            </select>
          </div>
        </div>

        {/* Main Catalog Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filters (Desktop) */}
          <div
            className={`lg:block ${
              mobileFilterOpen ? "block" : "hidden"
            } bg-white p-6 rounded-3xl border border-gray-100 shadow-sm h-fit sticky top-28`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2 font-bold text-[#111827]">
                <Filter className="w-4 h-4 text-[#7C8A00]" />
                <span>Filters</span>
              </div>
              {(selectedCategory !== "All" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="text-xs font-semibold text-[#7C8A00] hover:underline"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Category Filter Group */}
            <div>
              <h4 className="font-semibold text-xs text-[#6B7280] uppercase tracking-wider mb-3">
                Categories
              </h4>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${
                      selectedCategory === cat
                        ? "bg-[#7C8A00] text-white font-semibold shadow-md shadow-[#7C8A00]/20"
                        : "text-[#111827] hover:bg-[#FAFAFA]"
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Courses Grid */}
          <div className="lg:col-span-3">
            {filteredCourses && filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((c) => (
                  <CourseCard key={c._id} course={c} />
                ))}
              </div>
            ) : (
              /* Modern Empty State */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-gray-100 p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
              >
                <div className="w-20 h-20 rounded-3xl bg-[#7C8A00]/10 text-[#7C8A00] flex items-center justify-center mb-6">
                  <BookOpen className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827] mb-2">
                  No Courses Available
                </h3>
                <p className="text-sm text-[#6B7280] max-w-sm mb-6 leading-relaxed">
                  We couldn't find any courses matching your current filters or search term. Please try resetting your search or check back soon!
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="px-6 py-3 rounded-xl bg-[#7C8A00] text-white font-semibold text-sm shadow-md shadow-[#7C8A00]/20 hover:bg-[#646f00] transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
