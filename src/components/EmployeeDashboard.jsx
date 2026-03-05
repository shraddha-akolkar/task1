import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import dashboard from "../assets/dashboard.png";
import umbrella from "../assets/umbrella.png";
import employee from "../assets/employees 1.png";
import person from "../assets/person.png";
import calender from "../assets/calendar1.png";
import building from "../assets/building.png";
import graphImg from "../assets/time.png";
import user1 from "../assets/user1.png";

import employee1 from "../assets/employee1.png";
import employee2 from "../assets/employee2.png";
import employee3 from "../assets/employee3.png";

export default function Leave() {
  const navigate = useNavigate();

  const onsiteData = [
    {
      img: user1,
      name: "Layla Al-Farouq",
      role: "Site Name 11 | Helper",
      status: "Full Day",
    },
    {
      img: user1,
      name: "Omar Al-Farsi",
      role: "Site Name 16 | Welder",
      status: "First Half",
    },
    {
      img: user1,
      name: "Samira Al-Hadi",
      role: "Site Name 14 | Assistant",
      status: "Full Day",
    },
    {
      img: user1,
      name: "Youssef El-Mansoori",
      role: "Site Name 10 | Metalworker",
      status: "Second Half",
    },
    {
      img: user1,
      name: "Fatima Al-Jabari",
      role: "Site Name 08 | Carpenter",
      status: "Full Day",
    },
  ];

  return (
    <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
      {/* NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
        <div className="mx-6 mt-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
              Employee
            </h1>

            {/* RIGHT ICONS */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
              <div className="inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                <img src={dashboard} className="w-4 h-4" />
                <span className="text-sm">Dashboard</span>
              </div>

              <div className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer">
                <img src={person} className="w-4 h-4" />
              </div>

              <div className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer">
                <img src={employee} className="w-4 h-4" />
              </div>

              <div className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer">
                <img src={calender} className="w-4 h-4" />
              </div>

              <div className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer">
                <img src={umbrella} className="w-4 h-4" />
              </div>

              <div className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer">
                <img src={building} className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4 px-4 py-4">
        {/* LEFT SIDE */}
        <div>
          {/* CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {/* IN TIME */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-3 py-3 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">In Time</p>
                <h2 className="text-3xl font-bold mt-1">09:43 AM</h2>

                <button className="mt-6 bg-black text-white px-6 py-2 rounded-xl text-sm">
                  Scan Out
                </button>
              </div>
              <div className="w-[150px]">
                <img src={graphImg} className="w-full object-contain" />
              </div>
            </div>

            {/* TOTAL EMPLOYEE */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={employee1} className="w-10 h-10" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Total Employee</p>
                <h3 className="text-2xl font-semibold">25</h3>
              </div>
            </div>

            {/* PAYROLL */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={employee2} className="w-10 h-10" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Payroll Employee</p>
                <h3 className="text-2xl font-semibold">18</h3>
              </div>
            </div>

            {/* CONTRACT */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={employee3} className="w-10 h-10" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Contract Employee</p>
                <h3 className="text-2xl font-semibold">7</h3>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Who’s On Site</h2>

            <div className="flex gap-2 text-xs">
              <button className="px-3 py-1 rounded-full bg-black text-white">
                On Site
              </button>

              <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                In Factory
              </button>

              <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                On Leave
              </button>

              <button className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                New
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {onsiteData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-400">{item.role}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-400">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
