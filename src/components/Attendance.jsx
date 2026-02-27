import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceModal from "./AttendanceModal";
import filter from "../assets/filter.png";
import file from "../assets/file.png";
import building from "../assets/building.png";
import user from "../assets/user.png";
import window from "../assets/window.png";
import umbrella from "../assets/umbrella.png";
import employee from "../assets/employees 1.png";
import calender from "../assets/calendar1.png";
import attandence from "../assets/attendance.png";
import plus from "../assets/plus.png";
import pencil from "../assets/pencil.png";
import user1 from "../assets/user1.png";
import Navbar from "./Navbar";

import { Plus } from "lucide-react";
const API_BASE_URL = "http://localhost:5000/api";

// MAIN

export default function EmployeesPage() {
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
                Employee Attendance
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

                {/* Active  Button */}
                <div className=" lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={attandence} className="w-4 h-4" alt="user" />
                  <span className="text-sm">Attendance</span>
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

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={calender}
                    className="w-4 h-4"
                    onClick={() => navigate("/leave")}
                  />
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
          {/*  TABLE  */}
          <div className="bg-white rounded-xl shadow overflow-hidden mx-4 pb-4">
            {/* FILTER + SEARCH ROW */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between pt-2 pb-2 px-4">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1 rounded-md text-sm cursor-pointer ${
                      activeTab === tab
                        ? "bg-black text-white"
                        : "text-gray-600 bg-[#FAFAFA]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-2">
                <div className="flex items-center w-full lg:w-[260px] border border-gray-200 rounded-full px-4 py-2 bg-[#FAFAFA]">
                  <input
                    type="text"
                    placeholder="Search employee"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>

                <div className="w-9 h-9 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer">
                  <img src={filter} className="w-4 h-4" />
                </div>

                <div className="w-9 h-9 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer">
                  <img src={file} className="w-4 h-4" />
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  <img src={plus} className="w-4 h-4" />
                  New
                </button>
              </div>
            </div>

            {/* ATTENDANCE TABLE */}
            <div className="px-4 pb-2">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-[13px] border-separate"
                  style={{ borderSpacing: "0 10px" }}
                >
                  <thead>
                    <tr className="text-[11px] uppercase text-gray-600">
                      <th></th>
                      <th className="text-left px-3 py-2">Employee Name</th>
                      <th className="text-left px-3 py-2">Designation</th>
                      <th className="text-left px-3 py-2">Date</th>
                      <th className="text-left px-3 py-2">In-Time</th>
                      <th className="text-left px-3 py-2">Out-Time</th>
                      <th className="text-left px-3 py-2">Overtime</th>
                      <th className="text-left px-3 py-2">Reduction</th>
                      <th className="text-left px-3 py-2">Duration</th>
                      <th className="text-left px-3 py-2">Type</th>
                      <th className="text-left px-3 py-2">Remark</th>
                      <th className="text-left px-3 py-2">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className="bg-[#F4F4F4]">
                        {/* Checkbox */}
                        <td className="px-3 py-3 rounded-l-xl">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-black"
                          />
                        </td>

                        {/* Employee */}
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={user1}
                              alt="user"
                              className="w-9 h-9 rounded-full object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-800">
                                {item.name}
                              </div>
                              <div className="text-[11px] text-gray-400">
                                {item.empId}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Designation */}
                        <td className="px-3 py-3">
                          <div>{item.designation}</div>
                          <div className="text-[11px] text-gray-400">
                            Payroll
                          </div>
                        </td>

                        <td className="px-3 py-3">16 Oct 2025</td>
                        <td className="px-3 py-3">09:42 AM</td>
                        <td className="px-3 py-3">07:51 PM</td>

                        {/* Overtime */}
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2">
                            <span>2h 30m</span>
                            <span className="w-4 h-4 flex items-center justify-center bg-green-100 text-green-600 text-[10px] rounded-full">
                              ✓
                            </span>
                            <span className="w-4 h-4 flex items-center justify-center bg-red-100 text-red-600 text-[10px] rounded-full">
                              ✕
                            </span>
                          </div>
                        </td>

                        <td className="px-3 py-3">2h</td>
                        <td className="px-3 py-3">11h 30m</td>

                        {/* Type Badge */}
                        <td className="px-3 py-3">
                          <span className="px-3 py-1 text-[11px] rounded-full bg-purple-100 text-purple-600">
                            In Factory
                          </span>
                        </td>

                        <td className="px-3 py-3 text-gray-500">Remark</td>

                        {/* Action */}
                        <td className="px-3 py-3 rounded-r-xl">
                          <img
                            src={pencil}
                            alt="edit"
                            className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MODAL */}
            {showModal && (
              <AttendanceModal onClose={() => setShowModal(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
