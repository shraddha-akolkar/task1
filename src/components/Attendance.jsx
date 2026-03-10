import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceModal from "./AttendanceModal";
import filter from "../assets/filter.png";
import file from "../assets/file.png";
import building from "../assets/building.png";
import windowIcon from "../assets/window.png";
import umbrella from "../assets/umbrella.png";
import employee from "../assets/employees 1.png";
import calender from "../assets/calendar1.png";
import edit from "../assets/edit.png";
import del from "../assets/delete.png";
import cross from "../assets/cross.png";
import mark from "../assets/check.png";
import time from "../assets/in-time.png";
import plus from "../assets/plus.png";
import attendence from "../assets/attendance.png";
import user1 from "../assets/user1.png";
import Navbar from "./Navbar";

import { Plus } from "lucide-react";
const API_BASE_URL = "http://localhost:5000/api";

// MAIN

function fileUrl(filename) {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `${API_BASE_URL.replace("/api", "")}/uploads/${filename}`;
}

function EmployeeAvatar({ emp }) {
  const [imgFailed, setImgFailed] = useState(false);

  const picUrl = fileUrl(emp?.employeePicture);

  if (!picUrl || imgFailed) {
    return (
      <img
        src={user1}
        className="w-8 h-8 rounded-full object-cover border border-gray-200"
      />
    );
  }

  return (
    <img
      src={picUrl}
      alt={emp?.name}
      className="w-8 h-8 rounded-full object-cover border border-gray-200"
      onError={() => setImgFailed(true)}
    />
  );
}

function formatTime(time) {
  if (!time) return "-";

  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Leave() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();
  const tabs = ["All Employee", "Payroll", "Contract", "Staff"];

  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance`);
      const data = await res.json();
      setAttendanceData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDuration = (minutes) => {
    if (!minutes && minutes !== 0) return "-";

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${h}h ${m}m`;
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this attendance?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/attendance/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete attendance");
      }

      fetchAttendance();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="border-lg">
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        <Navbar />

        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          <div className="mx-6 mt-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Employee Attendance
              </h1>

              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={windowIcon}
                    className="w-4 h-4"
                    onClick={() => navigate("/adminportal")}
                  />
                </div>

                <div className="lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={attendence} className="w-4 h-4" />
                  <span className="text-sm">Attendance</span>
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={employee}
                    className="w-4 h-4"
                    alt="user"
                    onClick={() => navigate("/dashboard")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={calender}
                    className="w-4 h-4"
                    onClick={() => navigate("/leave")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={umbrella}
                    className="w-4 h-4"
                    onClick={() => navigate("/holidays")}
                  />
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

          <div className="bg-white rounded-xl shadow overflow-hidden mx-4 pb-2 pt-2">
            <div className="flex items-center justify-between gap-3 pt-2 pb-2 px-4 flex-nowrap">
              <div className="flex flex-wrap gap-2 ">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1 rounded-md text-sm cursor-pointer ${
                      activeTab === tab
                        ? "bg-black text-white"
                        : "text-gray-600 bg-[FFFFFF]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 whitespace-nowrap">
                {/* Bulk Update */}
                <button className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-md text-sm hover:bg-gray-50">
                  <img src={edit} className="w-3.5 h-3.5" />
                  Bulk Update
                </button>

                {/* Search */}
                <div className="flex items-center w-full sm:w-full md:w-full lg:w-[210px] lg:h-[30px] border border-gray-200 rounded-md px-3 py-1.5 bg-[#FAFAFA]">
                  <input
                    type="text"
                    placeholder="Search employee"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                  <div className="w-3.5 h-3.5 border-2 border-gray-500 rounded-full relative">
                    <span className="absolute w-2 h-[2px] bg-gray-500 right-[-5px] bottom-[-3px] rotate-45"></span>
                  </div>
                </div>

                {/* Filter */}
                <div
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                >
                  <img src={filter} className="w-3.5 h-3.5" />
                </div>

                {/* File */}
                <div className="w-8 h-8 rounded-lg bg-[#FAFAFA] border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                  <img src={file} className="w-3.5 h-3.5" />
                </div>

                {/* New */}
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md text-sm hover:bg-gray-800 cursor-pointer"
                >
                  <img src={plus} className="w-3.5 h-3.5" />
                  New
                </button>
              </div>
            </div>

            <div className="pb-4 px-4 rounded-xl">
              <div className="overflow-x-auto bg-white px-[5px]">
                <table className="w-full text-[13px] border-separate border-spacing-y-[5px]">
                  <thead className="bg-[#FAFAFA]">
                    <tr className="text-[12px] leading-[100%] tracking-[0%] uppercase text-[#151515]">
                      <th className="font-medium px-3 py-[10px] text-left rounded-l-lg border border-gray-200">
                        EMPLOYEE NAME
                      </th>

                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        DESIGNATION
                      </th>

                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        DATE
                      </th>

                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        IN-TIME
                      </th>

                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        OUT-TIME
                      </th>

                      <th className="font-medium px-3 py-[10px] text-center border border-gray-200">
                        REDUCTION
                      </th>

                      <th className="font-medium px-3 py-[10px] text-center border border-gray-200">
                        DURATION
                      </th>

                      <th className="font-medium px-3 py-[10px] text-center border border-gray-200">
                        TYPE
                      </th>

                      <th className="font-medium px-3 py-[10px] text-center border border-gray-200">
                        REMARK
                      </th>

                      <th className="font-medium px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {attendanceData.map((item) => (
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

                            <EmployeeAvatar emp={item.Employee} />

                            <div>
                              <div className=" text-gray-800">
                                {item.Employee?.name || "-"}
                              </div>

                              <div className="text-[11px] text-gray-400">
                                {item.Employee?.id
                                  ? `IN${item.Employee.id}`
                                  : "-"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          <div>{item.Employee?.designation || "-"}</div>
                          <div className="text-[11px] text-gray-400">
                            {item.Employee?.type || "-"}
                          </div>
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {formatDate(item.date)}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          <div className="flex items-center gap-2">
                            <img src={time} className="w-4 h-4 opacity-70" />
                            {formatTime(item.inTime)}
                          </div>
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          <div className="flex items-center gap-2">
                            <img src={time} className="w-4 h-4 opacity-70" />

                            {item.outTime && item.outTime !== "00:00:00"
                              ? formatTime(item.outTime)
                              : "-"}
                          </div>
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          <div className="flex items-center gap-2">
                            {formatDuration(item.overtime)}

                            <img
                              src={mark}
                              className="w-4 h-4 cursor-pointer"
                            />
                            <img
                              src={cross}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </div>
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {formatDuration(item.duration)}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          <span
                            className={`px-3 py-1 rounded-md text-xs ${
                              item.Employee?.type === "Payroll"
                                ? "bg-purple-100 text-purple-700"
                                : item.Employee?.type === "Contract"
                                  ? "bg-green-100 text-green-700"
                                  : item.Employee?.type === "Staff"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.Employee?.type}
                          </span>
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.remark ? (
                            <span className="px-3 py-1 bg-gray-100 text-[#151515] rounded-full text-xs">
                              {item.remark}
                            </span>
                          ) : (
                            "Remark"
                          )}
                        </td>

                        <td className="px-3 py-[20px] border border-gray-200 rounded-r-lg">
                          <div className="flex gap-3">
                            <img
                              src={edit}
                              className="w-4 h-4 cursor-pointer"
                              title="Edit"
                              onClick={() => {
                                setEditData(item);
                                setShowModal(true);
                              }}
                            />

                            <img
                              src={del}
                              className="w-4 h-4 cursor-pointer"
                              title="Delete"
                              onClick={() => handleDelete(item.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {showModal && (
              <AttendanceModal
                onClose={() => {
                  setShowModal(false);
                  setEditData(null);
                }}
                editData={editData}
                refreshData={fetchAttendance}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
