import React from "react";
import { userData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Calendar, Shield, LogOut, Key } from "lucide-react";

const ProfileCard = ({ user }) => {
  const { setisAuth, setUser } = userData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setisAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#7C8A00] to-[#C8D43A] text-white flex items-center justify-center font-bold text-2xl shadow-md">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <div className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#7C8A00]/10 text-[#7C8A00] uppercase mb-1">
            <Shield className="w-3 h-3" />
            {user?.role === "admin" ? "Administrator" : "Student Member"}
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
            <Mail className="w-3.5 h-3.5 text-[#7C8A00]" />
            {user?.email}
          </p>
        </div>
      </div>

      {/* Account Info Fields */}
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            disabled
            value={user?.name || ""}
            className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-2.5 rounded-xl border border-slate-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            disabled
            value={user?.email || ""}
            className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-2.5 rounded-xl border border-slate-200"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Joined Date</label>
          <input
            type="text"
            disabled
            value="August 2026"
            className="w-full bg-slate-50 text-slate-900 text-xs px-4 py-2.5 rounded-xl border border-slate-200"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
        <button
          onClick={() => toast.success("Password reset email sent")}
          className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 font-semibold text-xs transition-colors flex items-center gap-1.5"
        >
          <Key className="w-3.5 h-3.5 text-[#7C8A00]" />
          <span>Change Password</span>
        </button>
        <button
          onClick={logoutHandler}
          className="px-4 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-xs shadow-sm hover:bg-rose-700 transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout Account</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
