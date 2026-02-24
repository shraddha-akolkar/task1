import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import RegisterEmployeeModal from "./RegisterEmployeeModal";

import {
  LayoutDashboard,
  UserCog,
  UsersRound,
  User,
  CalendarDays,
  Pencil,
  Search,
  SlidersHorizontal,
  Download,
  Plus,
  Funnel,
  Album,
} from "lucide-react";

const Attendance = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const tabs = ["Portal", "Project Management", "Sales", "Accounts"];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* TOP HEADER BAR */}
      <div className="flex justify-end items-center gap-3 px-4 pt-4 pb-1">
        <button
          className="cursor-pointer hover:text-gray-800 transition-colors"
          onClick={() => navigate("/adminportal")}
        >
          <LayoutDashboard size={15} />
        </button>

        <div className="flex items-center gap-3 text-gray-500">
          <div className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
            <UserCog size={18} />
            Attendance
          </div>

          <UsersRound
            size={18}
            className="cursor-pointer hover:text-gray-800"
            onClick={() => navigate("/dashboard")}
          />
          <User size={18} className="cursor-pointer hover:text-gray-800" />
          <CalendarDays
            size={18}
            className="cursor-pointer hover:text-gray-800"
          />
        </div>

        <span className="text-sm font-medium text-gray-700">Admin</span>
      </div>

      {/* FILTER + TAB SECTION */}
      <div className="px-6 mt-4">
        <div className="bg-white rounded-xl shadow p-3 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[900px]">
            <div className="flex items-center gap-2 text-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* RIGHT ACTIONS */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-50">
                Bulk Update
              </button>

              <div className="flex items-center border rounded-lg px-2 py-1.5 bg-gray-50">
                <Search size={14} className="text-gray-400 mr-1" />
                <input
                  type="text"
                  placeholder="Search employee"
                  className="bg-transparent outline-none text-xs w-32"
                />
              </div>

              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Funnel size={15} />
              </button>

              <button className="p-2 border rounded-lg hover:bg-gray-50">
                <Album size={15} />
              </button>

              <button className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-800">
                <Plus size={14} />
                New
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="px-6 mt-4">
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[1000px]">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr className="text-[11px]">
                <th className="px-4 py-3">Employee Name</th>
                <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">In-Time</th>
                <th className="px-4 py-3">Out-Time</th>
                <th className="px-4 py-3">Overtime</th>
                <th className="px-4 py-3">Reduction</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Remark</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-800">
                  <input type="checkbox" className="mr-2" />
                  Shraddha Akolkar
                </td>
                <td className="px-4 py-3 text-gray-600">Software Developer</td>
                <td className="px-4 py-3 text-gray-600">23 Feb 2026</td>
                <td className="px-4 py-3 text-gray-600">09:30 AM</td>
                <td className="px-4 py-3 text-gray-600">06:30 PM</td>
                <td className="px-4 py-3 text-green-600 font-medium">1h 00m</td>
                <td className="px-4 py-3 text-red-500">0h</td>
                <td className="px-4 py-3 text-gray-700 font-medium">9h 00m</td>
                <td className="px-4 py-3">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-medium">
                    In Factory
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">Present</td>
                <td className="px-4 py-3 text-center">
                  <Pencil
                    size={16}
                    className="cursor-pointer text-gray-500 hover:text-black"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <RegisterEmployeeModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Attendance;
