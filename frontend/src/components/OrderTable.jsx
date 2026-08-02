import React from "react";
import { CheckCircle2, Clock } from "lucide-react";

const OrderTable = ({ orders = [] }) => {
  const sampleOrders = [
    {
      id: "ORD-9021",
      student: "John Doe",
      course: "Full Stack Web Development",
      amount: "₹1,999",
      date: "Aug 02, 2026",
      status: "Completed",
    },
    {
      id: "ORD-9022",
      student: "Jane Smith",
      course: "React & Node Masterclass",
      amount: "₹2,499",
      date: "Aug 01, 2026",
      status: "Completed",
    },
    {
      id: "ORD-9023",
      student: "Alex Miller",
      course: "Python & Data Science",
      amount: "₹1,499",
      date: "Jul 30, 2026",
      status: "Completed",
    },
  ];

  const dataToRender = orders.length > 0 ? orders : sampleOrders;

  return (
    <div className="overflow-x-auto bg-white rounded-2xl border border-slate-100">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
            <th className="py-3.5 px-4">Order ID</th>
            <th className="py-3.5 px-4">Student</th>
            <th className="py-3.5 px-4">Course</th>
            <th className="py-3.5 px-4">Amount</th>
            <th className="py-3.5 px-4">Date</th>
            <th className="py-3.5 px-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-700">
          {dataToRender.map((order, idx) => (
            <tr key={order.id || idx} className="hover:bg-slate-50/50 transition-colors">
              <td className="py-3.5 px-4 font-mono font-medium text-slate-900">{order.id}</td>
              <td className="py-3.5 px-4 font-semibold text-slate-900">{order.student}</td>
              <td className="py-3.5 px-4">{order.course}</td>
              <td className="py-3.5 px-4 font-bold text-slate-900">{order.amount}</td>
              <td className="py-3.5 px-4 text-slate-500">{order.date}</td>
              <td className="py-3.5 px-4">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-3 h-3" />
                  {order.status}
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
