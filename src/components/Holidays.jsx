import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LeaveModal from "./LeaveModal";
import filter from "../assets/filter.png";
import file from "../assets/file.png";
import building from "../assets/building.png";
import user from "../assets/user.png";
import window from "../assets/window.png";
import umbrella from "../assets/umbrella.png";
import employee from "../assets/employees 1.png";
import leave from "../assets/leave.png";
import person from "../assets/person.png";
import plus from "../assets/plus.png";
import pencil from "../assets/pencil.png";
import user1 from "../assets/user1.png";
import Navbar from "./Navbar";

import { Plus } from "lucide-react";
const API_BASE_URL = "http://localhost:5000/api";

// MAIN

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

  const data = [
    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },
    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },
    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },
    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },
    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },
    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },
    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },

    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },
    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },
    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },

    {
      id: 1,
      appliedDate: "16 Oct 2025 | 11:11AM",
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      visaStatus: "31 Dec 2026",
      from: "20 Oct 2025",
      to: "24 Nov 2025",
      days: "34",
      remark: "For Diwali",
      status: "Approved",
    },
  ];

  return (
    <div className="border-lg">
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        {/*  NAVBAR */}
        <Navbar />

        {/*  TOP HEADER */}
        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          <div className="mx-6 mt-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Holidays
              </h1>

              {/* RIGHT SIDE ICONS */}
              <div
                className="
        flex items-center gap-2
        overflow-x-auto scrollbar-hide
        pb-2
        lg:pb-0
      "
              >
                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={window}
                    className="w-4 h-4"
                    onClick={() => navigate("/adminportal")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={person}
                    className="w-4 h-4"
                    alt="user"
                    onClick={() => navigate("/attendance")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={employee}
                    className="w-4 h-4"
                    alt="user"
                    onClick={() => navigate("/dashboard")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={user} className="w-4 h-4" />
                </div>

                {/* Active  Button */}

                <div className=" lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={leave} className="w-4 h-4" />
                  <span className="text-sm">Leave Traker</span>
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

          {/*  TABLE  */}
          <div
            className="bg-white rounded-xl shadow overflow-hidden mx-4 pb-2
           "
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between pt-2 pb-2 px-4">
              <div className="flex flex-wrap gap-2 ">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1 rounded-md text-sm cursor-pointer  ${
                      activeTab === tab
                        ? "bg-black text-white"
                        : "text-gray-600 bg-[#FAFAFA]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* RIGHT SIDE ICON  */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-2">
                {/* Search pill */}
                <div className="flex items-center w-full sm:w-full md:w-full lg:w-[260px] border border-gray-200 rounded-full px-4 py-2 bg-[#FAFAFA]">
                  <input
                    type="text"
                    placeholder="Search employee"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 bg-[#FAFAFA]"
                  />
                  <div className="w-4 h-4 border-2 border-gray-500 rounded-full relative">
                    <span className="absolute w-2 h-[2px] bg-gray-500 right-[-5px] bottom-[-3px] rotate-45"></span>
                  </div>
                </div>
                {/* Filter */}
                <div
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                >
                  <img src={filter} className="w-4 h-4" />
                </div>
                {/* File */}
                <div className="w-9 h-9 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                  <img src={file} className="w-4 h-4" />
                </div>
                {/* New button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="  flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-800 cursor-pointer"
                >
                  <img src={plus} className="w-4 h-4" />
                  New
                </button>
              </div>
            </div>
            <div className="p-4 rounded-xl"></div>

            {/*   MODAL */}
            {showModal && <LeaveModal onClose={() => setShowModal(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
}
