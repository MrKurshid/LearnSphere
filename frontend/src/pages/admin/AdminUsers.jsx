import React, { useState, useEffect } from "react";
import UserTable from "../../components/UserTable";
import { Users } from "lucide-react";
import axios from "axios";
import { server } from "../../main";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    console.log("[API Call] GET /api/stats (Admin Users)");
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(`[API Response] GET /api/stats returned ${data.stats?.users?.length} users`);
      if (data.stats && data.stats.users) {
        setUsers(data.stats.users);
      }
      setLoading(false);
    } catch (error) {
      console.error("[API Error] GET /api/stats (Users) failed:", error.response?.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#7C8A00] uppercase tracking-wider block mb-1">
            Directory
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Registered Users ({users.length})
          </h1>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Users className="w-4 h-4 text-[#7C8A00]" />
          User List from Database
        </h2>
        {loading ? (
          <p className="text-xs text-slate-500">Loading users from database...</p>
        ) : (
          <UserTable users={users} />
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
