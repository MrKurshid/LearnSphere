import React, { useState, useEffect } from "react";
import OrderTable from "../../components/OrderTable";
import { CreditCard } from "lucide-react";
import axios from "axios";
import { server } from "../../main";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    console.log("[API Call] GET /api/stats (Admin Orders)");
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(`[API Response] GET /api/stats returned ${data.stats?.payments?.length} payment logs`);
      if (data.stats && data.stats.payments) {
        setOrders(data.stats.payments);
      }
      setLoading(false);
    } catch (error) {
      console.error("[API Error] GET /api/stats (Orders) failed:", error.response?.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#7C8A00] uppercase tracking-wider block mb-1">
            Sales & Purchases
          </span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Database Payment Records ({orders.length})
          </h1>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
        <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#7C8A00]" />
          Verified Order Log
        </h2>
        {loading ? (
          <p className="text-xs text-slate-500">Loading payment records from database...</p>
        ) : (
          <OrderTable orders={orders} />
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
