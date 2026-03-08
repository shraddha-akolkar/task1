import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import filter from "../assets/filter.png";
import file from "../assets/file.png";
import building from "../assets/building.png";
import window from "../assets/window.png";
import umbrella from "../assets/umbrella.png";
import employee from "../assets/employees 1.png";
import leave from "../assets/leave.png";
import person from "../assets/person.png";
import user1 from "../assets/user1.png";
import Navbar from "./Navbar";
import LeaveStatusModal from "./LeaveStatusModal";

const API_BASE_URL = "http://localhost:5000/api";

export default function Leave() {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [leaves, setLeaves] = useState([]);

  const navigate = useNavigate();
  const tabs = ["All Employee", "Payroll", "Contract", "Staff"];

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/leave`);
      const data = await res.json();
      setLeaves(data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  return (
    <div className="border-lg">
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        {/* NAVBAR */}
        <Navbar />

        {/* HEADER */}
        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          <div className="mx-6 mt-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Leave Tracker
              </h1>

              {/* ICONS */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/adminportal")}
                >
                  <img src={window} className="w-4 h-4" />
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/attendance")}
                >
                  <img src={person} className="w-4 h-4" />
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                >
                  <img src={employee} className="w-4 h-4" />
                </div>

                <div className="inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full">
                  <img src={leave} className="w-4 h-4" />
                  <span className="text-sm">Leave Tracker</span>
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/holidays")}
                >
                  <img src={umbrella} className="w-4 h-4" />
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/meeting")}
                >
                  <img src={building} className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow overflow-hidden mx-4 pb-2 pt-2">
            {/* TOP BAR */}
            <div className="flex items-center justify-between gap-3 pt-2 pb-2 px-4 flex-nowrap">
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

              {/* SEARCH */}
              <div className="flex items-center gap-2 whitespace-nowrap">
                <div className="flex items-center lg:w-[260px] border border-gray-200 rounded-full px-4 py-2 bg-[#FAFAFA]">
                  <input
                    type="text"
                    placeholder="Search employee"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm"
                  />
                </div>

                <div
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                >
                  <img src={filter} className="w-4 h-4" />
                </div>

                <div className="w-9 h-9 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer">
                  <img src={file} className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* TABLE DATA */}
            <div className="pb-4 px-4 rounded-xl">
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

                      <th className="font-medium px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                        STATUS
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {leaves.map((item) => (
                      <tr key={item.id} className="bg-white">
                        {/* Applied Date */}
                        <td className="px-3 py-[6px] border border-gray-200 rounded-l-lg">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>

                        {/* Employee */}
                        <td className="px-3 py-[6px] border border-gray-200">
                          <div className="flex items-center gap-2">
                            <img
                              src={user1}
                              className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            />

                            <div>
                              <div className="font-medium text-gray-800">
                                {item.Employee?.name}
                              </div>

                              <div className="text-[11px] text-gray-400">
                                IN{item.employeeId}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Designation */}
                        <td className="px-3 py-[6px] border border-gray-200">
                          <div>{item.Employee?.designation}</div>

                          <div className="text-[11px] text-gray-400">
                            Payroll
                          </div>
                        </td>

                        {/* Visa */}
                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.Employee?.visaExpiringOn}
                        </td>

                        {/* From */}
                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.fromDate}
                        </td>

                        {/* To */}
                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.toDate}
                        </td>

                        {/* Days */}
                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.totalDays}
                        </td>

                        {/* Remark */}
                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.remark}
                        </td>

                        {/* Status */}
                        <td className="px-3 py-[16px] border border-gray-200 rounded-r-lg">
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

                          {item.status === "Pending" && (
                            <span
                              onClick={() => {
                                setSelectedLeave(item);
                                setShowModal(true);
                              }}
                              className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-md cursor-pointer"
                            >
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MODAL */}
            {showModal && selectedLeave && (
              <LeaveStatusModal
                leave={selectedLeave}
                onUpdate={fetchLeaves}
                onClose={() => {
                  setShowModal(false);
                  setSelectedLeave(null);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
