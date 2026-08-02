import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Alex Morgan",
      position: "Full Stack Developer @ TechCorp",
      message:
        "LearnSphere transformed my career. The hands-on project-based approach helped me master React and Node.js in record time!",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      rating: 5,
      verified: true,
    },
    {
      id: 2,
      name: "Sophia Chen",
      position: "UI/UX Designer",
      message:
        "The course structured layout and high-definition video lessons made complex design system concepts so intuitive to grasp.",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
      rating: 5,
      verified: true,
    },
    {
      id: 3,
      name: "David Miller",
      position: "Backend Engineer",
      message:
        "I was able to switch tech stacks with confidence after finishing the Node.js masterclass. Absolutely recommended!",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      rating: 5,
      verified: true,
    },
    {
      id: 4,
      name: "Emily Watson",
      position: "Data Analyst",
      message:
        "Clear explanations, direct mentor support, and lifetime access to code resources. Worth every single penny!",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
      rating: 5,
      verified: true,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAFAFA] to-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#C8D43A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7C8A00]/10 text-[#7C8A00] font-semibold text-xs uppercase tracking-widest mb-4"
          >
            <Star className="w-3.5 h-3.5 fill-[#7C8A00]" />
            Student Reviews
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight"
          >
            What Our Learners <span className="text-[#7C8A00]">Say About Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base text-[#6B7280]"
          >
            Join over 50,000+ satisfied students who unlocked their dream careers through LearnSphere.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-[#7C8A00]/15 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                {/* Message */}
                <p className="text-[#111827]/80 text-base leading-relaxed italic mb-6">
                  "{item.message}"
                </p>
              </div>

              {/* Student info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C8D43A]"
                />
                <div>
                  <h4 className="font-bold text-[#111827] text-sm flex items-center gap-1.5">
                    {item.name}
                    {item.verified && (
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                    )}
                  </h4>
                  <p className="text-xs text-[#6B7280]">{item.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
