import React from "react";
import ProfileCard from "../../components/ProfileCard";
import { userData } from "../../context/UserContext";

const AdminProfile = () => {
  const { user } = userData();

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <span className="text-xs font-semibold text-[#7C8A00] uppercase tracking-wider block mb-1">
          Account
        </span>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Admin Profile Settings
        </h1>
      </div>

      <ProfileCard user={user} />
    </div>
  );
};

export default AdminProfile;
