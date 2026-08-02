import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../../context/UserContext";
import { GraduationCap, KeyRound, ArrowRight, ShieldCheck } from "lucide-react";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { btnLoading, verifyOtp } = userData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await verifyOtp(Number(otp), navigate);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#7C8A00]/10 text-[#7C8A00] flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-[#111827] tracking-tight mb-2">
          Verify Email OTP
        </h2>
        <p className="text-xs text-[#6B7280] mb-8 leading-relaxed">
          Please enter the 6-digit verification code sent to your registered email address.
        </p>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="otp" className="block text-xs font-semibold text-[#111827] text-left mb-2">
              Enter 6-Digit OTP
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="otp"
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                required
                className="w-full bg-[#FAFAFA] text-[#111827] placeholder-gray-400 tracking-widest font-mono text-center text-lg pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#7C8A00] transition-colors"
              />
            </div>
          </div>

          <button
            disabled={btnLoading}
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-sm shadow-md shadow-[#7C8A00]/25 transition-all flex items-center justify-center gap-2 group"
          >
            <span>{btnLoading ? "Verifying code..." : "Verify Account"}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-xs text-[#6B7280]">
          Didn't receive a code or need to sign in?{" "}
          <Link to="/login" className="font-semibold text-[#7C8A00] hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
