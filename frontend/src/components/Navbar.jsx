import React, { useState, useRef } from "react";
import { FaLinkedinIn, FaGithub, FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    // Delay hiding dropdown by 2 seconds
    timeoutRef.current = setTimeout(() => {
      setShowLogout(false);
    }, 500);
  };

  return (
    <div className="w-full fixed top-0 left-0 flex justify-between items-center py-3 px-12 md:px-36 bg-gray-50">
      {/* Logo / Brand */}
      <a className="text-xl font-bold" href="/">
        Report
      </a>

      {/* Right Side Icons */}
      <div className="flex gap-4">
        <a
          href="https://github.com/TheBaljitSingh/reports"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-500 transition py-2"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/thebaljitsingh"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-500 transition py-2"
        >
          <FaLinkedinIn size={24} />
        </a>

        {/* Dashboard + Logout */}
        <div
          className="relative inline-block"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full ring-1 ring-gray-300 hover:ring-gray-500 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaUser size={20} />
            <span className="text-sm font-medium">
              {user ? user.name : "Dashboard"}
            </span>
          </a>

          {/* Logout dropdown */}
          {showLogout && user && (
            <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded-md shadow-lg text-sm z-10 transition-all duration-300">
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
