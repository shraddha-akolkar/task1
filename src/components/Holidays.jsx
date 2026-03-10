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
import plus from "../assets/plus.png";
import holiday from "../assets/holiday.png";
import festiv from "../assets/holiday-assest.png";
import Navbar from "./Navbar";
import edit from "../assets/edit.png";
import del from "../assets/delete.png";
import { Plus } from "lucide-react";
const API_BASE_URL = "http://localhost:5000/api";

// MAIN

export default function Holiday() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const [holidays, setHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const tabs = ["Self", "All Employee", "Payroll", "Contract", "Staff"];
  const [month, setMonth] = useState("All");

  const fetchHolidays = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/holidays?month=${month}&search=${search}`,
      );

      const data = await res.json();
      setHolidays(data.holidays);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  }, [month, search]);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const handleEdit = (holiday) => {
    setSelectedHoliday(holiday);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    console.log("Delete clicked:", id);

    if (!window.confirm("Delete this holiday?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/holidays/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(data);

      fetchHolidays();
    } catch (err) {
      console.log(err);
    }
  };
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
                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={windowIcon}
                    className="w-4 h-4"
                    onClick={() => navigate("/adminportal")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={person}
                    className="w-4 h-4"
                    alt="user"
                    onClick={() => navigate("/attendance")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={employee}
                    className="w-4 h-4"
                    alt="user"
                    onClick={() => navigate("/dashboard")}
                  />
                </div>

                {/* <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={user} className="w-4 h-4" />
                </div> */}

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={calender}
                    className="w-4 h-4"
                    onClick={() => navigate("/leave")}
                  />
                </div>

                {/* Active  Button */}
                <div className=" lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={holiday} className="w-4 h-4" />
                  <span className="text-sm">Holidays</span>
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={building}
                    className="w-4 h-4"
                    onClick={() => navigate("/meeting")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/*  TABLE  */}
          <div
            className="bg-white rounded-xl shadow overflow-hidden mx-4 pb-2 pt-2
           "
          >
            <div className="flex flex-wrap items-center justify-end gap-2 pt-2 pb-2 px-4">
              {/* Search */}
              <div className="flex items-center bg-[#FAFAFA] w-[210px] lg:w-[260px] border border-gray-200 rounded-md px-3 py-1.5">
                <input
                  type="text"
                  placeholder="Search employee"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                />
                <div className="w-4 h-4 border-2 border-gray-500 rounded-full relative">
                  <span className="absolute w-2 h-[2px] bg-gray-500 right-[-5px] bottom-[-3px] rotate-45"></span>
                </div>
              </div>

              {/* Filter */}
              {/* <div
                onClick={() => setShowFilters(!showFilters)}
                className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg bg-[#FAFAFA] cursor-pointer hover:bg-gray-50 transition"
              >
                <img src={filter} className="w-4 h-4" />
              </div> */}

              {/* File */}
              {/* <div className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg bg-[#FAFAFA] cursor-pointer hover:bg-gray-50 transition">
                <img src={file} className="w-4 h-4" />
              </div> */}

              {/* New */}
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-md text-sm hover:bg-gray-800 cursor-pointer"
              >
                <img src={plus} className="w-3 h-3" />
                New
              </button>
            </div>
            <div className="p-4 rounded-xl">
              {/* Month Tabs */}
              <div className="flex gap-2 mb-4 overflow-x-auto ">
                {[
                  { label: "All", value: "All" },
                  { label: "Jan", value: "01" },
                  { label: "Feb", value: "02" },
                  { label: "Mar", value: "03" },
                  { label: "Apr", value: "04" },
                  { label: "May", value: "05" },
                  { label: "Jun", value: "06" },
                  { label: "Jul", value: "07" },
                  { label: "Aug", value: "08" },
                  { label: "Sep", value: "09" },
                  { label: "Oct", value: "10" },
                  { label: "Nov", value: "11" },
                  { label: "Dec", value: "12" },
                ].map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMonth(m.value)}
                    className={`px-3 py-1 text-xs rounded-md transition ${
                      month === m.value
                        ? "bg-black text-white"
                        : "bg-[#FAFAFA] hover:bg-black hover:text-white"
                    }`}
                  >
                    {m.label}
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

                      <div className="px-4 pb-2">
                        <div className="text-[16px] font-semibold text-gray-900">
                          {h.title}
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <div className="text-[13px] text-gray-500">
                            {new Date(h.date).toDateString()}
                            <span className="mx-1">•</span>
                            {h.day}
                          </div>

                          <div className="flex items-center gap-2 relative z-20">
                            <img
                              src={edit}
                              alt="edit"
                              className="w-4 h-4 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(h);
                              }}
                            />

                            <img
                              src={del}
                              alt="delete"
                              className="w-4 h-4 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(h.id);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl"></div>
            {showModal && (
              <HolidaysModal
                onClose={() => {
                  setShowModal(false);
                  setSelectedHoliday(null);
                }}
                refreshHolidays={fetchHolidays}
                holidayData={selectedHoliday}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
