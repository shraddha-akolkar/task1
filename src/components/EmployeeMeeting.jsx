import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MeetingModal from "./MeetingModal";
import filter from "../assets/filter.png";
import file from "../assets/file.png";
import meeting from "../assets/meeting.png";
import window from "../assets/window.png";
import umbrella from "../assets/umbrella.png";
import calender from "../assets/calendar1.png";
import person from "../assets/person.png";
import edit from "../assets/edit.png";
import del from "../assets/delete.png";
import Navbar from "./Navbar";

const API_BASE_URL = "http://localhost:5000/api";

export default function Meeting() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const navigate = useNavigate();

  const fetchMeetings = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/meetings`);
      const data = await res.json();
      setMeetings(data.meetings);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

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

              {/* ICONS */}
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/employee-dashboard")}
                >
                  <img src={window} className="w-4 h-4" />
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/employee-attendance")}
                >
                  <img src={person} className="w-4 h-4" />
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/employee-leave")}
                >
                  <img src={calender} className="w-4 h-4" />
                </div>

                <div
                  className="h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer"
                  onClick={() => navigate("/employee-holiday")}
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
            {/* SEARCH */}
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
                      <th className="px-3 py-[10px] text-left rounded-l-lg border border-gray-200 font-medium">
                        CLIENT NAME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200 font-medium">
                        EMPLOYEE NAME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200 font-medium">
                        DATE
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200 font-medium">
                        SERVICE
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200 font-medium">
                        DAY TYPE
                      </th>

                      <th className="px-3 py-[10px] text-left rounded-r-lg border border-gray-200 font-medium">
                        ADDRESS
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {meetings.map((item) => (
                      <tr key={item.id} className="bg-white">
                        <td className="px-3 py-[6px] border border-gray-200 rounded-l-lg">
                          {item.clientName}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.employee}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.date}
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          <span className="bg-[#F3F4F6] text-gray-700 text-[11px] px-2 py-1 rounded-md">
                            {item.service}
                          </span>
                        </td>

                        <td className="px-3 py-[6px] border border-gray-200">
                          {item.dayType} / {item.shiftType}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200 rounded-r-lg">
                          {item.clientAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
