import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/lamac.png";
import user1 from "../assets/user1.png";

export default function Navbar() {
  return (
    <div className="bg-[#1E1E1E] px-6 pt-4">
      <div className="flex items-end gap-4">
        {/* 1 - Lamac (Bottom Border) */}
        <div className="px-6 py-3 text-white border-b-4 border-blue-500 rounded-b-xl">
          LAMAC
        </div>

        {/* 2 - Portal (Top + Left + Right Border) */}
        <div className="px-6 py-3 text-white border-t-4 border-l-4 border-r-4 border-blue-500 rounded-t-xl">
          Portal
        </div>

        {/* 3 - Project Management (Bottom Border) */}
        <div className="px-6 py-3 text-white border-b-4 border-blue-500 rounded-b-xl">
          Project Management
        </div>

        {/* 4 - Sales (Top + Left + Right Border) */}
        <div className="px-6 py-3 text-white border-t-4 border-l-4 border-r-4 border-blue-500 rounded-t-xl">
          Sales
        </div>

        {/* 5 - Accounts (Bottom Border) */}
        <div className="px-6 py-3 text-white border-b-4 border-blue-500 rounded-b-xl">
          Accounts
        </div>
      </div>
    </div>
  );
}
