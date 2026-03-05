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

  const leaveTabs = ["On Leave", "On Site", "In Factory", "New"];

  const [selectedRow, setSelectedRow] = useState(null);

  /* ---------------- SCAN FUNCTION ---------------- */

  const handleScan = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: 14,
        }),
      });

      const data = await res.json();

      alert(data.message);
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Scan failed");
    }
  };

  const data = [
    {
      id: 1,
      name: "Omar Al-Farsi",
      empId: "EM01",
      designation: "Interior Designer",
      category: "Payroll",
      date: "16 Oct 2025",
      inTime: "09:42 AM",
      outTime: "07:51 PM",
      overtime: "2h 30m",
      reduction: "2h",
      duration: "11h 30m",
      type: "In Factory",
      remark: "Remark",
    },
    {
      id: 2,
      name: "Liam Carter",
      empId: "EM02",
      designation: "Home Consultant",
      category: "Payroll",
      date: "16 Oct 2025",
      inTime: "09:44 AM",
      outTime: "02:43 PM",
      overtime: "NA",
      reduction: "2h",
      duration: "05h 2m",
      type: "Staff",
      remark: "Half Day",
    },
  ];

  const leaveData = [
    {
      img: user1,
      name: "Khalid Al-Maamari",
      role: "Technician",
      period: "05 Jan - 15 Feb, 2025",
    },
    {
      img: user1,
      name: "Amina Al-Qasim",
      role: "Helper",
      period: "First Half",
    },
    {
      img: user1,
      name: "Amina Al-Farsi",
      role: "Engineer",
      period: "10 Mar - 20 Apr, 2026",
    },
  ];

  return (
    <div>
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        <Navbar />

        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          <div className="mx-6 mt-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Admin
              </h1>

              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                <div className="lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={dashboard} className="w-4 h-4" />
                  <span className="text-sm">Dashboard</span>
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={person}
                    className="w-4 h-4"
                    onClick={() => navigate("/attendance")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={employee}
                    className="w-4 h-4"
                    onClick={() => navigate("/dashboard")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={calender}
                    className="w-4 h-4"
                    onClick={() => navigate("/leave")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={umbrella}
                    className="w-4 h-4"
                    onClick={() => navigate("/holidays")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={building}
                    className="w-4 h-4"
                    onClick={() => navigate("/meeting")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* DASHBOARD CARD */}

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 px-4 py-4">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">In Time</p>

                <h2 className="text-3xl font-bold mt-1">09:43 AM</h2>

                {/* SCAN BUTTON */}

                <button
                  onClick={handleScan}
                  className="mt-6 bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                >
                  Scan Out
                </button>
              </div>

              <div className="w-[150px]">
                <img src={graphImg} className="w-full object-contain" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin1} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Assigned Employee</p>
                <h3 className="text-2xl font-semibold">25</h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin1} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Payroll Employee</p>
                <h3 className="text-2xl font-semibold">18</h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin2} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Contract Employee</p>
                <h3 className="text-2xl font-semibold">7</h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin3} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">On Site</p>
                <h3 className="text-2xl font-semibold">19</h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin4} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">In Factory</p>
                <h3 className="text-2xl font-semibold">6</h3>
              </div>
            </div>
          </div>

          {/* MAIN SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-[67%_33%] gap-4 px-4 pb-6">
            {/* TABLE */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-[13px] border-separate"
                  style={{ borderSpacing: "0 8px" }}
                >
                  <thead style={{ background: "#FAFAFA" }}>
                    <tr className="text-[12px] uppercase text-[#151515]">
                      <th className="px-3 py-[10px] text-left rounded-l-lg border border-gray-200">
                        EMPLOYEE NAME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        DATE
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        IN-TIME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        OUT-TIME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        OVERTIME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        DURATION
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        TYPE
                      </th>

                      <th className="px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id} className="bg-white">
                        <td className="px-3 py-[10px] border border-gray-200 rounded-l-lg">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={selectedRow === item.id}
                              onChange={() =>
                                setSelectedRow(
                                  selectedRow === item.id ? null : item.id,
                                )
                              }
                              className="w-4 h-4 accent-black cursor-pointer"
                            />

                            <img src={user1} className="w-8 h-8 rounded-full" />

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

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.date}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.inTime}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.outTime}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.overtime}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.duration}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-xs">
                            {item.type}
                          </span>
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200 rounded-r-lg">
                          <img
                            src={pencil}
                            className="w-4 h-4 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ON LEAVE */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">On Leave</h2>

                <div className="flex gap-2 text-xs">
                  {leaveTabs.map((tab) => (
                    <button
                      key={tab}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {leaveData.map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.img}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {p.name}
                        </p>

                        <p className="text-xs text-gray-400">{p.role}</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 whitespace-nowrap">
                      {p.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
