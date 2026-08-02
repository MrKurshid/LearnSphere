import React from "react";

const StatsCard = ({ title, value, icon: Icon, color = "bg-[#7C8A00]" }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${color}/10 text-[#7C8A00] flex items-center justify-center`}>
        {Icon && <Icon className="w-6 h-6 text-[#7C8A00]" />}
      </div>
      <div>
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        <p className="text-xs text-slate-500 font-medium">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;
