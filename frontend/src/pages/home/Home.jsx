import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Testimonials from "../../components/testimonials/Testimonials";
import CourseCard from "../../components/coursecard/CourseCard";
import { CourseData } from "../../context/CoursesContext";
import {
  Sparkles,
  ArrowRight,
  Video,
  Award,
  Code,
  Infinity as InfinityIcon,
  Users,
  MessageSquare,
  BookOpen,
  CheckCircle,
  Star,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const { courses } = CourseData();

  // Take top 3-4 courses for popular section
  const popularCourses = courses ? courses.slice(0, 4) : [];

  const features = [
    {
      icon: Video,
      title: "Live & HD Courses",
      description: "Learn with crystal clear video lectures and interactive live sessions.",
      gradient: "from-[#7C8A00] to-[#A3B318]",
    },
    {
      icon: Award,
      title: "Verified Certificates",
      description: "Earn shareable certificates upon completing courses to boost your resume.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Code,
      title: "Hands-on Projects",
      description: "Build real-world portfolio projects mentored by industry professionals.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: InfinityIcon,
      title: "Lifetime Access",
      description: "Learn at your own pace with unlimited lifetime access to all content.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Expert Mentors",
      description: "Get direct support and guidance from seasoned software engineers.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: MessageSquare,
      title: "Active Community",
      description: "Collaborate, ask questions, and network with thousands of peer learners.",
      gradient: "from-[#7C8A00] to-[#C8D43A]",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "300+", label: "Premium Courses" },
    { value: "120+", label: "Expert Instructors" },
    { value: "4.9★", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Animated Background Blobs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C8D43A]/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#7C8A00]/15 rounded-full blur-3xl -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-200/80 mb-6">
              <Sparkles className="w-4 h-4 text-[#7C8A00]" />
              <span className="text-xs font-semibold text-[#111827] uppercase tracking-wider">
                The Next Gen E-Learning Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold text-[#111827] tracking-tight leading-[1.15] mb-6">
              Learn Anything, <br />
              <span className="bg-gradient-to-r from-[#7C8A00] via-[#A3B318] to-[#646f00] bg-clip-text text-transparent">
                Build Everything.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#6B7280] font-normal leading-relaxed max-w-2xl mb-8">
              Master in-demand skills with expert instructors, real-world portfolio projects, and lifetime community support.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/courses")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C8A00] to-[#A3B318] hover:from-[#646f00] hover:to-[#7C8A00] text-white font-semibold text-base shadow-lg shadow-[#7C8A00]/25 hover:shadow-xl hover:shadow-[#7C8A00]/35 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Courses</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-gray-200 hover:border-[#7C8A00] text-[#111827] hover:text-[#7C8A00] font-semibold text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5 text-[#7C8A00]" />
                <span>Start Learning</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="mt-10 pt-8 border-t border-gray-200/60 flex flex-wrap items-center gap-6 text-xs font-medium text-[#6B7280]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                <span>Self-paced learning</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                <span>Certificates included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                <span>Money-back guarantee</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column Modern Illustration / Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Container */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white relative">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                  alt="Online Learning Students"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-[#7C8A00] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                    Interactive Class
                  </span>
                  <h3 className="font-bold text-lg">Full-Stack Engineering & Web Development</h3>
                </div>
              </div>

              {/* Floating Card 1: Active Learners */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7C8A00]/10 flex items-center justify-center text-[#7C8A00]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] font-medium">Joined this week</p>
                  <p className="text-sm font-bold text-[#111827]">2,450+ Students</p>
                </div>
              </motion.div>

              {/* Floating Card 2: Rating */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] font-medium">Platform Rating</p>
                  <p className="text-sm font-bold text-[#111827]">4.9 / 5.0 (12k reviews)</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATISTICS COUNTER SECTION */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100 hover:border-[#C8D43A] transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-[#7C8A00] tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-[#6B7280]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight mb-4">
            Why Learn With <span className="text-[#7C8A00]">LearnSphere?</span>
          </h2>
          <p className="text-base text-[#6B7280]">
            Everything you need to master new technologies, gain practical experience, and accelerate your career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feature.gradient} flex items-center justify-center text-white shadow-md mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-[#7C8A00] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* POPULAR COURSES PREVIEW SECTION */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-[#7C8A00] font-semibold text-xs uppercase tracking-widest block mb-2">
                Top Rated Courses
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
                Explore Popular Programs
              </h2>
            </div>
            <button
              onClick={() => navigate("/courses")}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#7C8A00] hover:text-[#646f00] transition-colors"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {popularCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCourses.map((c) => (
                <CourseCard key={c._id} course={c} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#FAFAFA] rounded-3xl border border-gray-200/80">
              <BookOpen className="w-12 h-12 text-[#7C8A00] mx-auto mb-3 opacity-60" />
              <h3 className="text-lg font-bold text-[#111827]">Courses Coming Soon</h3>
              <p className="text-sm text-[#6B7280] mt-1">Our instructors are curating amazing content for you.</p>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />
    </div>
  );
};

export default Home;
