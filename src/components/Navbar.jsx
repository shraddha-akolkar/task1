import React, { useState } from "react";
import { Bell, Users, Building2, Menu, X } from "lucide-react";
import logo from "../assets/lamac.png";
import user1 from "../assets/user1.png";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Portal");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = ["Portal", "Project Management", "Sales", "Accounts"];

  return (
    <div className="flex items-stretch mx-1 pt-2 relative">
      {/*  Logo */}
      <div className="pr-2 py-2 flex items-center border-b border-gray-50">
        <img src={logo} alt="Logo" className="h-6 w-auto" />
      </div>
      {/* Left Empty */}
      <div
        className="hidden md:block flex-1
                   border-t border-l border-r border-gray-100
                   shadow-[0_-1px_2px_rgba(0,0,0,0.04)]
                   rounded-t-xl"
      ></div>
      {/* Center Tabs */}
      <div
        className="hidden md:flex px-4 py-3 items-center justify-center
                   border-b border-gray-50"
      >
        <div className="flex items-center gap-4 py-2 bg-white rounded-full px-3 py-1 shadow-sm border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-full text-sm transition-all whitespace-nowrap ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* Right Empty */}
      <div
        className="hidden md:block flex-1
                   border-t border-l border-r border-gray-100
                   shadow-[0_-1px_2px_rgba(0,0,0,0.04)]
                   rounded-t-xl"
      ></div>
      {/* Right Section */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={user1}
            alt="User"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="hidden sm:block text-sm font-medium whitespace-nowrap">
            Amina Al-Farouqi
          </span>
        </div>

        <button
          className="md:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        ></button>
      </div>
    </div>
  );
}
