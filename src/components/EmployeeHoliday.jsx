import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import HolidaysModal from "./HolidaysModal";
import filter from "../assets/filter.png";
import file from "../assets/file.png";
import building from "../assets/building.png";
import windowIcon from "../assets/window.png";
import employee from "../assets/employees 1.png";
import calender from "../assets/calendar1.png";
import person from "../assets/person.png";
import holiday from "../assets/holiday.png";
import festiv from "../assets/holiday-assest.png";
import Navbar from "./Navbar";
import { Plus } from "lucide-react";
const API_BASE_URL = "http://localhost:5000/api";

// MAIN

export default function Holiday() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [holidays, setHolidays] = useState([]);
  const tabs = [
    "Self",
    "All Employee",
    "InFactory",
    "On Site",
    "Payroll",
    "Contract",
  ];

  const fetchHolidays = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/holidays`);
      const data = await res.json();
      setHolidays(data.holidays);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

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
              <div className=" flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={windowIcon}
                    className="w-4 h-4"
                    onClick={() => navigate("/employee-dashboard")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={person}
                    className="w-4 h-4"
                    alt="user"
                    onClick={() => navigate("/employee-attendance")}
                  />
                </div>

                {/* <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={user} className="w-4 h-4" />
                </div> */}

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={calender}
                    className="w-4 h-4"
                    onClick={() => navigate("/employee-leave")}
                  />
                </div>

                {/* Active  Button */}
                <div className=" lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={holiday} className="w-4 h-4" />
                  <span className="text-sm">Holidays</span>
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={building}
                    className="w-4 h-4"
                    onClick={() => navigate("/employee-meeting")}
                  />
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
              </div>
            </div>
            <div className="p-4 rounded-xl">
              {/* Month Tabs */}
              <div className="flex gap-2 mb-4  overflow-x-auto">
                {[
                  "All",
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ].map((m) => (
                  <button
                    key={m}
                    className="px-3 py-1 text-xs rounded-md bg-[#FAFAFA] hover:bg-black hover:text-white"
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* Holiday Cards */}

              <div className=" rounded-2xl">
                {/* Cards Grid */}
                <div className="grid grid-cols-4 gap-6">
                  {holidays.map((h) => (
                    <div
                      key={h.id}
                      className="bg-[#FAFAFA] rounded-2xl overflow-hidden relative"
                    >
                      <div className="w-full h-[180px] pointer-events-none">
                        <img
                          src={
                            h.image
                              ? `http://localhost:5000/uploads/${h.image}`
                              : festiv
                          }
                          alt="holiday"
                          className="w-full h-full p-1.5 object-cover rounded-2xl"
                        />
                      </div>

                      <div className="px-4 py-3">
                        <div className="text-[16px] font-semibold text-gray-900">
                          {h.title}
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <div className="text-[13px] text-gray-500">
                            {new Date(h.date).toDateString()}
                            <span className="mx-1">•</span>
                            {h.day}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
