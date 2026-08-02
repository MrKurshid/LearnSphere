import React from "react";
import UserTable from "../../components/UserTable";
import { Users } from "lucide-react";

const AdminUsers = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#7C8A00] uppercase tracking-wider block mb-1">
            Directory
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Registered Students
          </h1>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Users className="w-4 h-4 text-[#7C8A00]" />
          Student List
        </h2>
        <UserTable />
      </div>
    </div>
  );
};

export default AdminUsers;
