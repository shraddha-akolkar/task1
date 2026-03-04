import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceModal from "./AttendanceModal";
import filter from "../assets/filter.png";
import file from "../assets/file.png";
import building from "../assets/building.png";
import user from "../assets/user.png";
import dashboard from "../assets/dashboard.png";
import umbrella from "../assets/umbrella.png";
import employee from "../assets/employees 1.png";
import leave from "../assets/leave.png";
import person from "../assets/person.png";
import calender from "../assets/calendar1.png";
import graphImg from "../assets/time.png";
import attendence from "../assets/attendance.png";
import plus from "../assets/plus.png";
import pencil from "../assets/pencil.png";
import user1 from "../assets/user1.png";
import Navbar from "./Navbar";
import admin1 from "../assets/admin1.png";
import admin2 from "../assets/admin2.png";
import admin3 from "../assets/admin3.png";
import admin4 from "../assets/admin4.png";

const API_BASE_URL = "http://localhost:5000/api";

export default function Leave() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    "Self",
    "All Employee",
    "InFactory",
    "On Site",
    "Payroll",
    "Contract",
  ];

  return (
    <div>
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        {/* NAVBAR */}
        <Navbar />

        {/* TOP HEADER */}
        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          <div className="mx-6 mt-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Employee
              </h1>

              {/* RIGHT ICONS */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                <div className="lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={dashboard} className="w-4 h-4" />
                  <span className="text-sm">Dashboard</span>
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={person} className="w-4 h-4" />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={employee} className="w-4 h-4" />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={calender} className="w-4 h-4" />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={umbrella} className="w-4 h-4" />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={building} className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
