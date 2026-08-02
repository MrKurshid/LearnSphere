import React, { useState, useEffect } from "react";
import { userData } from "../../context/UserContext";
import { CourseData } from "../../context/CoursesContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/coursecard/CourseCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  Users,
  PlusCircle,
  Upload,
  Shield,
  Trash2,
  TrendingUp,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Sparkles,
  CheckCircle2,
  DollarSign,
  Layers,
} from "lucide-react";

const Dashboard = () => {
  const { user, setisAuth, setUser } = userData();
  const { courses, fetchCourses } = CourseData();
  const navigate = useNavigate();

  // Sidebar & Navigation Tabs State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Stats state
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLectures: 0,
    totalUsers: 0,
  });

  // Form states for creating course
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  // Fetch admin stats
  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setisAuth(false);
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  const categories = [
    "Web Development",
    "App Development",
    "Data Science",
    "UI/UX Design",
    "Machine Learning",
    "DevOps & Cloud",
    "Marketing",
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      return toast.error("Please upload a course thumbnail image");
    }

    setBtnLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("createdBy", createdBy);
    formData.append("duration", duration);
    formData.append("price", price);
    formData.append("file", image);

    try {
      const { data } = await axios.post(`${server}/api/course/new`, formData, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      toast.success(data.message);
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setCategory("");
      setCreatedBy("");
      setDuration("");
      setPrice("");
      setImage(null);
      fetchCourses();
      fetchStats();
      setActiveTab("courses");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
      setBtnLoading(false);
    }
  };

  // Redirect non-admin users
  if (user && user.role !== "admin") {
    navigate("/");
    return null;
  }

  const sidebarLinks = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "publish", label: "Publish Course", icon: PlusCircle },
    { id: "users", label: "Users", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 flex">
      {/* SAAS COLLAPSIBLE SIDEBAR */}
      <aside
        className={`fixed top-20 bottom-0 left-0 z-40 bg-[#111827] text-white transition-all duration-300 border-r border-gray-800 flex flex-col justify-between ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="p-4">
          {/* Collapse Toggle */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
            {!sidebarCollapsed && (
              <span className="text-xs font-bold uppercase tracking-wider text-[#C8D43A] flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> Admin Console
              </span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 mx-auto transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-[#7C8A00] text-white shadow-md"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5 shrink-0 text-[#C8D43A]" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logoutHandler}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main
        className={`flex-1 transition-all duration-300 p-6 sm:p-10 ${
          sidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {/* ADMIN TOPBAR */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C8A00]/10 text-[#7C8A00] font-semibold text-xs uppercase tracking-widest mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Control Center
              </div>
              <h1 className="text-2xl font-bold text-[#111827]">
                SaaS Platform <span className="text-[#7C8A00]">Management</span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("publish")}
                className="px-4 py-2.5 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-xs shadow-md flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Course</span>
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* PLATFORM METRICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#7C8A00]/10 text-[#7C8A00] flex items-center justify-center">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#111827]">{stats.totalCourses}</span>
                    <p className="text-xs text-[#6B7280]">Total Courses</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#111827]">{stats.totalLectures}</span>
                    <p className="text-xs text-[#6B7280]">Total Video Lectures</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#111827]">{stats.totalUsers}</span>
                    <p className="text-xs text-[#6B7280]">Registered Users</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#111827]">₹148.5K</span>
                    <p className="text-xs text-[#6B7280]">Platform Revenue</p>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS & RECENT ACTIVITY */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-[#111827] flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#7C8A00]" />
                    Latest Active Courses
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {courses && courses.slice(0, 2).map((c) => (
                      <CourseCard key={c._id} course={c} />
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-lg text-[#111827] flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#7C8A00]" />
                    System Log & Activity
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-[#FAFAFA] rounded-xl flex items-center justify-between">
                      <span className="font-semibold text-[#111827]">New Course Published</span>
                      <span className="text-gray-400">10 mins ago</span>
                    </div>
                    <div className="p-3 bg-[#FAFAFA] rounded-xl flex items-center justify-between">
                      <span className="font-semibold text-[#111827]">Razorpay Payment Verified</span>
                      <span className="text-gray-400">1 hour ago</span>
                    </div>
                    <div className="p-3 bg-[#FAFAFA] rounded-xl flex items-center justify-between">
                      <span className="font-semibold text-[#111827]">User Registered via OTP</span>
                      <span className="text-gray-400">3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COURSES LIST */}
          {activeTab === "courses" && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#7C8A00]" />
                  All Courses Management ({courses ? courses.length : 0})
                </h2>
                <button
                  onClick={() => setActiveTab("publish")}
                  className="px-4 py-2 rounded-xl bg-[#7C8A00] text-white font-semibold text-xs shadow-md flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add New Course</span>
                </button>
              </div>

              {courses && courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((c) => (
                    <CourseCard key={c._id} course={c} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#6B7280]">No courses found.</p>
              )}
            </div>
          )}

          {/* TAB 3: PUBLISH COURSE FORM */}
          {activeTab === "publish" && (
            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#111827] flex items-center gap-2">
                  <PlusCircle className="w-6 h-6 text-[#7C8A00]" />
                  Publish New Course
                </h2>
                <p className="text-xs text-[#6B7280] mt-1">
                  Fill in the course details and upload thumbnail media.
                </p>
              </div>

              <form onSubmit={submitHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-2">Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Master Full-Stack React & Node"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] text-[#111827] text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7C8A00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] text-[#111827] text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7C8A00]"
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-2">Instructor</label>
                    <input
                      type="text"
                      placeholder="Instructor Name"
                      value={createdBy}
                      onChange={(e) => setCreatedBy(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] text-[#111827] text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7C8A00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-2">Duration (Weeks)</label>
                    <input
                      type="number"
                      placeholder="8"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] text-[#111827] text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7C8A00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-2">Price (INR ₹)</label>
                    <input
                      type="number"
                      placeholder="1999"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                      className="w-full bg-[#FAFAFA] text-[#111827] text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7C8A00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#111827] mb-2">Thumbnail Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={imageHandler}
                      required
                      className="w-full bg-[#FAFAFA] text-[#111827] text-xs px-4 py-2.5 rounded-xl border border-gray-200 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#7C8A00] file:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-2">Course Description</label>
                  <textarea
                    rows={4}
                    placeholder="Full course outline..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full bg-[#FAFAFA] text-[#111827] text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7C8A00]"
                  />
                </div>

                <button
                  disabled={btnLoading}
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-sm shadow-md"
                >
                  {btnLoading ? "Publishing..." : "Publish Course Now"}
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: USERS DIRECTORY */}
          {activeTab === "users" && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#7C8A00]" />
                User Directory ({stats.totalUsers})
              </h2>
              <div className="p-6 bg-[#FAFAFA] rounded-2xl text-center text-xs text-[#6B7280]">
                All registered users are authenticated securely via JWT and OTP verification.
              </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#7C8A00]" />
                Platform Analytics & Growth
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-sm text-[#111827] mb-1">Active Course Engagement</h3>
                  <p className="text-xs text-[#6B7280]">Average completion rate: 78.4%</p>
                </div>
                <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-sm text-[#111827] mb-1">Monthly New Registrations</h3>
                  <p className="text-xs text-[#6B7280]">Growth rate: +24% month-over-month</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PAYMENTS */}
          {activeTab === "payments" && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#7C8A00]" />
                Razorpay Payments Log
              </h2>
              <div className="p-6 bg-[#FAFAFA] rounded-2xl text-xs text-[#6B7280]">
                All transactions are verified using HMAC-SHA256 signature validation.
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#7C8A00]" />
                Admin Settings & Configuration
              </h2>
              <div className="p-6 bg-[#FAFAFA] rounded-2xl text-xs text-[#6B7280]">
                System Administrator: <span className="font-bold text-[#111827]">{user?.name} ({user?.email})</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
