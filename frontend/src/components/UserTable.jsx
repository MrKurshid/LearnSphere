import React from "react";
import { User, Mail, Calendar, Shield } from "lucide-react";

const UserTable = ({ users = [] }) => {
  const sampleUsers = [
    {
      id: 1,
      name: "Kurshid Alam",
      email: "kurshid@example.com",
      role: "Student",
      purchased: 3,
      joined: "2026",
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      email: "sarah@example.com",
      role: "Student",
      purchased: 1,
      joined: "2026",
    },
    {
      id: 3,
      name: "Alex Morgan",
      email: "alex@example.com",
      role: "Student",
      purchased: 2,
      joined: "2025",
    },
  ];

  const dataToRender = users.length > 0 ? users : sampleUsers;

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-100">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
            <th className="py-3.5 px-4">Student</th>
            <th className="py-3.5 px-4">Email</th>
            <th className="py-3.5 px-4">Purchased Courses</th>
            <th className="py-3.5 px-4">Joined Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-700">
          {dataToRender.map((u) => (
            <tr key={u.id || u.email} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#7C8A00]/10 text-[#7C8A00] flex items-center justify-center text-[10px] font-bold">
                  {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span>{u.name}</span>
              </td>
              <td className="py-3.5 px-4 text-slate-500">{u.email}</td>
              <td className="py-3.5 px-4 font-bold text-slate-900">{u.purchased || 1} Courses</td>
              <td className="py-3.5 px-4 text-slate-500">{u.joined || "2026"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
