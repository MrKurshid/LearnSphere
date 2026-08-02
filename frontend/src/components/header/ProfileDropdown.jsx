import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Shield,
  BookOpen,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const ProfileDropdown = () => {
  const { user, setisAuth, setUser } = userData();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setisAuth(false);
    toast.success("Logged Out Successfully");
    navigate("/login");
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: "Welcome to LearnSphere!", time: "Just now", read: false },
    { id: 2, title: "New Web Dev course released", time: "2 hours ago", read: false },
    { id: 3, title: "Keep up your 7-day learning streak!", time: "1 day ago", read: true },
  ];

  return (
    <div className="flex items-center gap-3">
      {/* NOTIFICATIONS BELL DROPDOWN */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={() => {
            setNotificationsOpen(!notificationsOpen);
            setDropdownOpen(false);
          }}
          className="relative p-2.5 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 text-[#111827] transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7C8A00] animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7C8A00]" />
        </button>

        <AnimatePresence>
          {notificationsOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-3 w-80 bg-white rounded-2xl border border-gray-100 shadow-xl py-3 z-50"
            >
              <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-sm text-[#111827]">Notifications</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#7C8A00]/10 text-[#7C8A00]">
                  3 New
                </span>
              </div>

              <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-gray-50/80 transition-colors">
                    <p className="text-xs font-semibold text-[#111827]">{n.title}</p>
                    <span className="text-[10px] text-gray-400">{n.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* USER PROFILE AVATAR DROPDOWN */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            setNotificationsOpen(false);
          }}
          className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-all border border-gray-200/50"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7C8A00] to-[#C8D43A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="text-xs font-semibold text-[#111827] hidden sm:inline max-w-[100px] truncate">
            {user?.name || "Account"}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-3 w-64 bg-white rounded-2xl border border-gray-100 shadow-xl p-2 z-50"
            >
              {/* Header Info */}
              <div className="p-3 bg-gray-50 rounded-xl mb-1">
                <p className="font-bold text-xs text-[#111827] truncate">{user?.name}</p>
                <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#7C8A00]/10 text-[#7C8A00]">
                  <Shield className="w-3 h-3" />
                  {user?.role === "admin" ? "Administrator" : "Student"}
                </div>
              </div>

              {/* Menu Links */}
              <div className="space-y-0.5">
                <Link
                  to={user?.role === "admin" ? "/dashboard" : "/account"}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#111827] hover:bg-gray-100 transition-colors"
                >
                  {user?.role === "admin" ? (
                    <Shield className="w-4 h-4 text-[#7C8A00]" />
                  ) : (
                    <User className="w-4 h-4 text-[#7C8A00]" />
                  )}
                  <span>{user?.role === "admin" ? "Admin Profile" : "My Profile"}</span>
                </Link>

                {user?.role === "admin" && (
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#111827] hover:bg-gray-100 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#7C8A00]" />
                    <span>SaaS Dashboard</span>
                  </Link>
                )}

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    toast.success("Settings panel");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#111827] hover:bg-gray-100 transition-colors text-left"
                >
                  <Settings className="w-4 h-4 text-[#7C8A00]" />
                  <span>Settings</span>
                </button>

                <div className="pt-1 mt-1 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logoutHandler();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfileDropdown;
