import React, { useState } from "react";
import { Bell, Users, Building2, Menu, X } from "lucide-react";
import logo from "../assets/Logo.png";
import user1 from "../assets/user1.png";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Portal");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = ["Portal", "Project Management", "Sales", "Accounts"];

  return (
    <div>
      <nav className="w-full bg-gray-100 border-b border-gray-100 px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>

          {/* Center Tabs — hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Icons — hidden on small mobile */}
            {/* <div className="hidden sm:flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" />
              <Users className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" />
              <Building2 className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors" />
            </div> */}

            {/* User — always visible */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={user1}
                alt="User"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-800 whitespace-nowrap">
                Amina Al-Farouqi
              </span>
            </div>

            {/* Hamburger — only on mobile */}
            <button
              className="md:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-2 border-t border-gray-100 pt-3 flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}

            {/* Icons row on mobile */}
            <div className="sm:hidden flex items-center gap-4 px-4 pt-3 border-t border-gray-100 mt-2">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
              <Users className="w-5 h-5 text-gray-600 cursor-pointer" />
              <Building2 className="w-5 h-5 text-gray-600 cursor-pointer" />
              <span className="text-sm font-medium text-gray-800 ml-1">Amina Al-Farouqi</span>
            </div>
          </div>
        )}
      </nav>

    </div>
  );
}