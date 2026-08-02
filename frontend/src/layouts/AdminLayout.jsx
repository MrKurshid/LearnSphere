import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import ProfileDropdown from "../components/header/ProfileDropdown";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const AdminLayout = ({ children, user }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Dedicated Admin Sidebar */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Admin Area */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? "ml-20" : "ml-64"}`}>
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-100 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <h1 className="font-bold text-slate-900 text-sm hidden sm:block">
              LearnSphere Admin Portal
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <ProfileDropdown />
          </div>
        </header>

        {/* Admin Page Content */}
        <main className="p-6 sm:p-8 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
