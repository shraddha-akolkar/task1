import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MeetingModal from "./MeetingModal";
import filter from "../assets/filter.png";
import file from "../assets/file.png";
import meeting from "../assets/meeting.png";
import user from "../assets/user.png";
import window from "../assets/window.png";
import umbrella from "../assets/umbrella.png";
import employee from "../assets/employees 1.png";
import calender from "../assets/calendar1.png";
import person from "../assets/person.png";
import plus from "../assets/plus.png";
import pencil from "../assets/pencil.png";
import user1 from "../assets/user1.png";
import Navbar from "./Navbar";
import { Plus } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

/* DATA */
const data = [
  {
    id: 1,
    client: "Marriot Hotel",
    employee: "Khalid Al-Zahrani, Rajiv Patel",
    date: "01 Jan 2026",
    services: ["Interior Design", "Marble Work"],
    dayType: "Half day / First Half",
    address: "Po Box 349, Ras Al Khaimah, Abu Dhabi",
  },
  {
    id: 2,
    client: "Hilton Resort",
    employee: "Sara Al-Mansoori",
    date: "15 Feb 2026",
    services: ["Landscape Architecture", "Garden Design"],
    dayType: "Full Day",
    address: "Po Box 123, Dubai, UAE",
  },
  {
    id: 3,
    client: "Radisson Blu",
    employee: "Khalid Al-Zahrani",
    date: "10 Mar 2026",
    services: ["Graphic Design", "Branding"],
    dayType: "Half day / First Half",
    address: "Po Box 456, Abu Dhabi, UAE",
  },
];

export default function Meeting() {
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
    <div className="border-lg">
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        <Navbar />

        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          {/* HEADER */}
          <div className="mx-6 mt-2 pb-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Meeting
              </h1>

              {/* RIGHT ICONS */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate("/adminportal")}
                >
                  <img src={window} className="w-4 h-4" />
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate("/attendance")}
                >
                  <img src={person} className="w-4 h-4" />
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate("/dashboard")}
                >
                  <img src={employee} className="w-4 h-4" />
                </div>

                {/* <div className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center">
                  <img src={user} className="w-4 h-4" />
                </div> */}

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100"
                  onClick={() => navigate("/leave")}
                >
                  <img src={calender} className="w-4 h-4" />
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/holidays")}
                >
                  <img src={umbrella} className="w-4 h-4" />
                </div>

                <div className="inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full">
                  <img src={meeting} className="w-4 h-4" />
                  <span className="text-sm">Meeting</span>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE AREA */}
          <div className="bg-white rounded-xl shadow overflow-hidden mx-4 pb-2 pt-2">
            {/* SEARCH + ACTION */}
            <div className="flex items-center justify-between gap-3 px-4 pb-2">
              <div className="flex items-center w-[260px] border border-gray-200 rounded-full px-4 py-2 bg-[#FAFAFA]">
                <input
                  type="text"
                  placeholder="Search employee"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />

                <div className="w-4 h-4 border-2 border-gray-500 rounded-full relative">
                  <span className="absolute w-2 h-[2px] bg-gray-500 right-[-5px] bottom-[-3px] rotate-45"></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                >
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

            {/* TABLE */}
            <div className="pb-4 px-4 rounded-xl">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-[13px] border-separate"
                  style={{ borderSpacing: "0 8px" }}
                >
                  <thead style={{ background: "#FAFAFA" }}>
                    <tr className="text-[12px] uppercase text-[#151515]">
                      <th className="px-3 py-[10px] text-left rounded-l-lg border border-gray-200">
                        CLIENT NAME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        EMPLOYEE NAME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        DATE
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        SERVICE
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        DAY TYPE
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        ADDRESS
                      </th>

                      <th className="px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id} className="bg-white">
                        <td className="px-3 py-[6px] border border-gray-200 rounded-l-lg">
                          {item.client}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.employee}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.date}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          <div className="flex flex-wrap gap-2">
                            {item.services.map((s, i) => (
                              <span
                                key={i}
                                className="bg-[#F3F4F6] text-gray-700 text-[11px] px-2 py-1 rounded-md"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.dayType}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.address}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200 rounded-r-lg">
                          <img
                            src={pencil}
                            alt="Edit"
                            className="w-4 h-4 cursor-pointer"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* MODAL */}
          {showModal && <MeetingModal onClose={() => setShowModal(false)} />}
        </div>
      </div>
    </div>
  );
}
