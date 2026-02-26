import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RegisterEmployeeModal from "./RegisterEmployeeModal";
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
import Navbar from "./Navbar";

import { Plus } from "lucide-react";
const API_BASE_URL = "http://localhost:5000/api";

// MAIN

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");

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
              {/* Title */}
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Leave Tracker
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
                  className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-800"
                >
                  <img src={plus} className="w-4 h-4" />
                  New
                </button>
              </div>
            </div>
            <div className="p-4 rounded-xl">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-[13px] border-separate"
                  style={{ borderSpacing: "0 8px" }}
                >
                  <thead style={{ background: "#FAFAFA" }}>
                    <tr className="text-[12px] leading-[100%] tracking-[0%] uppercase text-[#151515]">
                      <th className="font-medium px-3 py-[10px] text-left rounded-l-lg border border-gray-200">
                        APPLIED DATE
                      </th>
                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        EMPLOYEE NAME
                      </th>
                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        DESIGNATION
                      </th>
                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        VISA STATUS
                      </th>
                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        FROM DATE
                      </th>
                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        TO DATE
                      </th>
                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        TOTAL DAYS
                      </th>
                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        REMARK
                      </th>
                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        STATUS
                      </th>
                      <th className="font-medium px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id} className="bg-white">
                        <td className="px-3 py-[6px] border border-gray-200 rounded-l-lg">
                          {item.appliedDate}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
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

                        <td className="px-3 py-[6px] border border-gray-200">
                          <div>{item.designation}</div>
                          <div className="text-[11px] text-gray-400">
                            Payroll
                          </div>
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.visaStatus}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.from}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.to}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.days}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.remark}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.status === "Approved" && (
                            <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">
                              Approved
                            </span>
                          )}
                          {item.status === "Rejected" && (
                            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-md">
                              Rejected
                            </span>
                          )}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200 rounded-r-lg"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* MAIN TABLE */}
        </div>
      </div>
    </div>
  );
}
