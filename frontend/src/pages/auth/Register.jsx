import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../../context/UserContext";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = userData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerUser(name, email, password, navigate);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Brand Showcase Illustration */}
        <div className="bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#7C8A00] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C8D43A]/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <Link to="/" className="flex items-center gap-2 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C8A00] to-[#C8D43A] flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Learn<span className="text-[#C8D43A]">Sphere</span>
              </span>
            </Link>

            <span className="bg-[#7C8A00] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              Start Free Trial
            </span>

            <h2 className="text-3xl font-bold tracking-tight leading-tight mb-4">
              Join 50,000+ <br />
              <span className="text-[#C8D43A]">Future Engineers.</span>
            </h2>

            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Create an account to gain instant access to interactive courses and project source code.
            </p>
          </div>

          <div className="space-y-3 pt-6 border-t border-gray-700/60 text-xs text-gray-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Instant email OTP verification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              <span>Verified certificates on completion</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#111827] tracking-tight">Create Account</h2>
            <p className="text-xs text-[#6B7280] mt-1">
              Fill in your details below to get started.
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-[#111827] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-[#FAFAFA] text-[#111827] placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-[#7C8A00] transition-colors"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-[#111827] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-[#FAFAFA] text-[#111827] placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-[#7C8A00] transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-[#111827] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#FAFAFA] text-[#111827] placeholder-gray-400 pl-10 pr-10 py-3 rounded-xl text-sm border border-gray-200 focus:outline-none focus:border-[#7C8A00] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={btnLoading}
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#7C8A00] hover:bg-[#646f00] text-white font-semibold text-sm shadow-md shadow-[#7C8A00]/25 transition-all flex items-center justify-center gap-2 group mt-2"
            >
              <span>{btnLoading ? "Sending OTP..." : "Register Account"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center text-xs text-[#6B7280]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#7C8A00] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
