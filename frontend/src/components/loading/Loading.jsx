import React from "react";
import { GraduationCap } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C8A00] to-[#C8D43A] flex items-center justify-center text-white shadow-xl shadow-[#7C8A00]/25 animate-bounce">
          <GraduationCap className="w-8 h-8 animate-pulse" />
        </div>
        <div className="w-16 h-4 bg-black/10 rounded-full blur-sm absolute -bottom-4 left-0 animate-pulse" />
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold text-[#111827] mt-2">
        <div className="w-2 h-2 rounded-full bg-[#7C8A00] animate-ping" />
        <span>Loading LearnSphere...</span>
      </div>
    </div>
  );
};

export default Loading;
