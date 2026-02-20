import React from "react";
import Navbar from "./Navbar";
import { Search, Filter, Pencil } from "lucide-react";

const AdminPortal = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* ================= HEADER CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        <div className="bg-white rounded-xl p-4 shadow">
          <p className="text-sm text-gray-500">In Time</p>
          <h2 className="text-xl font-semibold mt-1">09:43 AM</h2>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold">Admin Portal</h2>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold">Admin Portal</h2>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold">Admin Portal</h2>
        </div>
      </div>

      {/* ================= MAIN SECTION ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">

        {/* ================= LEFT - ATTENDANCE TABLE ================= */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">

          {/* Table Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Attendance</h2>

            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg px-2 py-1 bg-gray-50">
                <Search size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search employee"
                  className="bg-transparent outline-none px-2 text-sm"
                />
              </div>

              <button className="p-2 bg-gray-100 rounded-lg">
                <Filter size={16} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3">Employee Name</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">In-Time</th>
                  <th className="p-3">Out-Time</th>
                  <th className="p-3">Overtime</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              {/* EMPTY TABLE BODY */}
              <tbody>
                {/* Data will come dynamically from backend */}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= RIGHT - ON LEAVE (DUMMY DATA) ================= */}
        <div className="bg-white rounded-xl shadow p-4">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">On Leave</h2>

            <div className="flex gap-2 text-xs">
              <span className="bg-black text-white px-3 py-1 rounded-full">
                On Leave
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                On Site
              </span>
              <span className="bg-gray-200 px-3 py-1 rounded-full">
                In Factory
              </span>
            </div>
          </div>

          {/* Dummy Leave List */}
          <div className="space-y-4">

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Khalid Al-Maamari</p>
                <p className="text-sm text-gray-500">Technician</p>
              </div>
              <p className="text-sm text-gray-500">
                05 Jan - 15 Feb, 2025
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Amina Al-Qasim</p>
                <p className="text-sm text-gray-500">Helper</p>
              </div>
              <p className="text-sm text-gray-500">
                First Half
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Amina Al-Farsi</p>
                <p className="text-sm text-gray-500">Engineer</p>
              </div>
              <p className="text-sm text-gray-500">
                10 Mar - 20 Apr, 2026
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;