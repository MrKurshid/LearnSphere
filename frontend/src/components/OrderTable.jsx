import React from "react";
import { CheckCircle2, CreditCard } from "lucide-react";

const OrderTable = ({ orders = [] }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-100">
        <CreditCard className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-medium">No payment orders recorded in database yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-100">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
            <th className="py-3.5 px-4">Order ID</th>
            <th className="py-3.5 px-4">Payment ID</th>
            <th className="py-3.5 px-4">Date</th>
            <th className="py-3.5 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-700">
          {orders.map((order) => (
            <tr key={order._id || order.razorpay_order_id} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3.5 px-4 font-mono font-medium text-slate-900">
                {order.razorpay_order_id || order._id}
              </td>
              <td className="py-3.5 px-4 font-mono text-slate-600">
                {order.razorpay_payment_id || "Completed"}
              </td>
              <td className="py-3.5 px-4 text-slate-500">
                {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Recent"}
              </td>
              <td className="py-3.5 px-4">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
