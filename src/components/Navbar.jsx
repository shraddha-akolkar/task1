import React, { useState } from "react";
import { Bell, Users, Building2, Menu, X } from "lucide-react";
import logo from "../assets/lamac.png";
import user1 from "../assets/user1.png";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Portal");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = ["Portal", "Project Management", "Sales", "Accounts"];

  return (
    <div>
      <nav className="w-full bg-gray-100 px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 flex-shrink-0 
                          border-b border-gray-200 
                          shadow-[0_4px_6px_rgba(0,0,0,0.06)] pb-2"
          >
            <img src={logo} alt="Logo" className="h-6 w-auto" />
          </div>

          {/* Left Empty Div - takes remaining space */}
          <div
            className="hidden md:block flex-1 h-10 mx-2
                          bg-white 
                          border border-gray-200 
                          border-b-0 
                          rounded-t-2xl 
                          shadow-[0_-4px_10px_rgba(0,0,0,0.05)]"
          ></div>

          {/* Center Tabs */}
          <div
            className="hidden md:flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1
                          border-b border-gray-200 
                          shadow-[0_4px_6px_rgba(0,0,0,0.06)] pb-2"
          >
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

          {/* Right Empty Div - takes remaining space */}
          <div
            className="hidden md:block flex-1 h-10 mx-2
                          bg-white 
                          border border-gray-200 
                          border-b-0 
                          rounded-t-2xl 
                          shadow-[0_-4px_10px_rgba(0,0,0,0.05)]"
          ></div>

          {/* Right Section */}
          <div
            className="flex items-center gap-3
                          border-b border-gray-200 
                          shadow-[0_4px_6px_rgba(0,0,0,0.06)] pb-2"
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src={user1}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-800 whitespace-nowrap">
                Amina Al-Farouqi
              </span>
            </div>

            <button
              className="md:hidden p-1 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Dropdown */}
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

            <div className="sm:hidden flex items-center gap-4 px-4 pt-3 border-t border-gray-100 mt-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <Users className="w-5 h-5 text-gray-600" />
              <Building2 className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-800 ml-1">
                Amina Al-Farouqi
              </span>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

{
  /* 
  ek laypout page banav - nav takun deyuche ani har page as children pass hoyin 
  page jikd deshin -parent div la border
  
  
  
  */
}
