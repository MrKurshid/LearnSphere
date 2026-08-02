import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, ArrowRight, Heart } from "lucide-react";
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C8A00] to-[#C8D43A] flex items-center justify-center text-white shadow-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Learn<span className="text-[#C8D43A]">Sphere</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering learners worldwide with cutting-edge skills, expert instructors, and hands-on projects.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7C8A00] transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookSquare className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7C8A00] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7C8A00] transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#7C8A00] transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#C8D43A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#C8D43A] transition-colors">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C8D43A] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#C8D43A] transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#" className="hover:text-[#C8D43A] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8D43A] transition-colors">
                  Career Handbook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8D43A] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C8D43A] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wide">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get news on new courses and special offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-gray-800 text-white placeholder-gray-500 pl-9 pr-3 py-2.5 rounded-xl text-sm border border-gray-700 focus:outline-none focus:border-[#7C8A00]"
                />
              </div>
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#7C8A00] hover:bg-[#A3B318] text-white transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} LearnSphere. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> by{" "}
            <span className="text-gray-300 font-medium">Kurshid Alam</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
