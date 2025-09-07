import React from "react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";


export default function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 flex justify-between items-center py-3 px-12 md:px-36 bg-gray-50">
      {/* Logo / Brand */}
      
      <a className="text-xl font-bold " href="/">Report</a>

      {/* Right Side Icons */}
      <div className="flex gap-4">
        <a
          href="https://github.com/TheBaljitSingh/reports"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-gray-300 transition"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/thebaljitsingh"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:text-gray-300 transition"
        >
          <FaLinkedinIn size={24} />
        </a>
      </div>
    </div>
  );
}
