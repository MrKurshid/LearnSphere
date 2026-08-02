import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  CheckCircle,
  Award,
  Users,
  Globe2,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Zap,
  Heart,
} from "lucide-react";

const About = () => {
  const missionVision = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To make world-class technical education accessible, affordable, and actionable for learners anywhere in the world.",
      color: "bg-[#7C8A00]",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To become the world's most trusted learning ecosystem where technology enthusiasts transform into industry leaders.",
      color: "bg-[#A3B318]",
    },
  ];

  const whyChooseUs = [
    {
      icon: ShieldCheck,
      title: "Industry-Vetted Content",
      desc: "Curated by senior developers and engineering leaders working at top tech firms.",
    },
    {
      icon: Zap,
      title: "Practical & Hands-On",
      desc: "No fluff theory. Build actual production projects from day one.",
    },
    {
      icon: Heart,
      title: "Dedicated Mentorship",
      desc: "Get code reviews and doubt assistance whenever you get stuck.",
    },
  ];

  const timeline = [
    { year: "2023", title: "Platform Founded", desc: "Started with 5 core programming courses." },
    { year: "2024", title: "10,000+ Students", desc: "Expanded course catalog to 50+ technical domains." },
    { year: "2025", title: "Global Expansion", desc: "Reached learners across 120+ countries." },
    { year: "2026", title: "AI-Powered Learning", desc: "Integrated smart learning assistants and career tracks." },
  ];

  const team = [
    {
      name: "Dr. Sarah Jenkins",
      role: "Head of Engineering",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "Marcus Vance",
      role: "Lead Full Stack Instructor",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "Elena Rostova",
      role: "UI/UX & Frontend Architect",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C8A00]/10 text-[#7C8A00] font-semibold text-xs uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-4 h-4" />
            Empowering Future Builders
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-[#111827] tracking-tight mb-6"
          >
            We Are Democratizing <span className="text-[#7C8A00]">Higher Tech Education</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#6B7280] leading-relaxed"
          >
            LearnSphere was built with a simple goal: bridge the gap between academic theory and high-demand industry skills through accessible, project-focused online learning.
          </motion.p>
        </div>

        {/* MISSION & VISION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {missionVision.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.color} text-white flex items-center justify-center mb-6 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-[#111827] mb-3">{item.title}</h2>
                <p className="text-[#6B7280] text-base leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* WHY CHOOSE US */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#111827]">Why Choose LearnSphere</h2>
            <p className="text-[#6B7280] text-sm mt-2">Designed specifically for career advancement and skill mastery.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className="text-center p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-[#7C8A00]/10 text-[#7C8A00] flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-[#111827] mb-2">{w.title}</h3>
                  <p className="text-sm text-[#6B7280]">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* TIMELINE */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#111827]">Our Journey</h2>
            <p className="text-[#6B7280] text-sm mt-2">How we grew into a global learning ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((t, idx) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <span className="text-2xl font-extrabold text-[#7C8A00] block mb-2">{t.year}</span>
                <h4 className="font-bold text-[#111827] text-base mb-1">{t.title}</h4>
                <p className="text-xs text-[#6B7280]">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* INSTRUCTOR TEAM */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-[#111827]">Meet Our Instructors</h2>
            <p className="text-[#6B7280] text-sm mt-2">Passionate educators and senior industry engineers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm text-center p-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-2 border-[#7C8A00]"
                />
                <h3 className="font-bold text-lg text-[#111827]">{member.name}</h3>
                <p className="text-xs text-[#6B7280] mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
