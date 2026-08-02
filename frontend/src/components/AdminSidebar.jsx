import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userData } from "../context/UserContext";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  CreditCard,
  User,
  LogOut,
  GraduationCap,
} from "lucide-react";

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setisAuth, setUser } = userData();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setisAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Add Course", path: "/admin/add-course", icon: PlusCircle },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Orders", path: "/admin/orders", icon: CreditCard },
    { name: "Profile", path: "/admin/profile", icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-40 bg-slate-900 text-white transition-all duration-300 border-r border-slate-800 flex flex-col justify-between ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-[#7C8A00] flex items-center justify-center text-white font-bold shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          {!collapsed && (
            <span className="font-bold text-base tracking-tight text-white">
              LearnSphere <span className="text-[#C8D43A] text-xs font-normal">Admin</span>
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#7C8A00] text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
                title={item.name}
              >
                <Icon className="w-4 h-4 shrink-0 text-[#C8D43A]" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={logoutHandler}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
