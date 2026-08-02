import React from "react";
import { Users } from "lucide-react";

const UserTable = ({ users = [] }) => {
  if (!users || users.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-100">
        <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-medium">No registered users in database yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-100">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
            <th className="py-3.5 px-4">User</th>
            <th className="py-3.5 px-4">Email</th>
            <th className="py-3.5 px-4">Role</th>
            <th className="py-3.5 px-4">Purchased Courses</th>
            <th className="py-3.5 px-4">Joined Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-700">
          {users.map((u) => (
            <tr key={u._id || u.email} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#7C8A00]/10 text-[#7C8A00] flex items-center justify-center text-[10px] font-bold">
                  {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                </div>
                <span>{u.name}</span>
              </td>
              <td className="py-3.5 px-4 text-slate-500">{u.email}</td>
              <td className="py-3.5 px-4 font-semibold text-[#7C8A00]">
                {u.role === "admin" ? "Administrator" : "Student"}
              </td>
              <td className="py-3.5 px-4 font-bold text-slate-900">
                {u.subscription ? u.subscription.length : 0} Courses
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "Recent"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
