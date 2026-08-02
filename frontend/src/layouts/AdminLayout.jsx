import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { userData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Menu, LogOut } from "lucide-react";

const AdminLayout = ({ children, user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Dedicated Admin Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Admin Area */}
      <div
        className={`flex-1 transition-all duration-300 w-full ${
          collapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors md:hidden"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5 text-[#7C8A00]" />
            </button>

            {/* Desktop Collapse Button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors hidden md:block"
              aria-label="Collapse sidebar"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4 text-[#7C8A00]" />}
            </button>

            <h1 className="font-bold text-slate-900 text-xs sm:text-sm truncate">
              LearnSphere Admin Portal
            </h1>
          </div>

          {/* Static Admin Info Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-[#7C8A00] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-xs font-bold text-slate-900 leading-none">
                  {user?.name || "Admin"}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Administrator</span>
              </div>
            </div>

            <button
              onClick={logoutHandler}
              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Admin Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
