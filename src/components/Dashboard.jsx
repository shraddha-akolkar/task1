import React from "react";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  Bell,
  Search,
  Filter,
  Pencil,
  CheckCircle,
  XCircle
} from "lucide-react";


import logo from "../assets/logo.png";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user1.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">

      {/* ================= NAVBAR ================= */}
      <div className="flex items-center justify-between mb-6">

        {/* Logo */}
        <img src={logo} alt="logo" className="h-8" />

        {/* Center Tabs */}
        <div className="flex gap-6 bg-white rounded-full px-6 py-2 shadow-sm">
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm">
            Portal
          </button>
          <button className="text-gray-500 text-sm">Project Management</button>
          <button className="text-gray-500 text-sm">Sales</button>
          <button className="text-gray-500 text-sm">Accounts</button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Bell size={18} className="text-gray-600 cursor-pointer" />
          <Users size={18} className="text-gray-600 cursor-pointer" />
          <Building2 size={18} className="text-gray-600 cursor-pointer" />

          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm">
            <img src={user1} className="w-8 h-8 rounded-full" />
            <span className="text-sm font-medium">Amina Al-Farouqi</span>
          </div>
        </div>
      </div>

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-5 gap-4 mb-6">

        {/* In Time Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm col-span-2">

          <p className="text-gray-500 text-sm">In Time</p>
          <h2 className="text-3xl font-bold mb-4">09:43 AM</h2>

          <button className="bg-black text-white px-6 py-2 rounded-lg mb-6">
            Scan Out
          </button>

          {/* Semi Circle */}
          <div className="flex justify-center">
            <div className="w-56 h-28 bg-green-500 rounded-t-full relative">
              <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                10h 13m
              </div>
            </div>
          </div>
        </div>

        {/* Small Stat Cards */}
        {[
          { icon: Users, title: "Assigned Employee", value: 25 },
          { icon: Briefcase, title: "Payroll Employee", value: 18 },
          { icon: Users, title: "Contract Employee", value: 7 },
          { icon: Building2, title: "On Site", value: 19 },
          { icon: Building2, title: "In Factory", value: 6 },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
              <Icon size={20} className="text-gray-600 mb-2" />
              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
          );
        })}
      </div>

      {/* ================= MAIN SECTION ================= */}
      <div className="grid grid-cols-3 gap-6">

        {/* ================= ATTENDANCE ================= */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-6">

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Attendance</h3>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search employee"
                  className="pl-9 pr-4 py-2 border rounded-full text-sm bg-gray-50"
                />
              </div>
              <Filter size={18} className="text-gray-600 cursor-pointer" />
            </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-8 text-xs font-semibold text-gray-500 border-b pb-3">
            <div>EMPLOYEE NAME</div>
            <div>DATE</div>
            <div>IN-TIME</div>
            <div>OUT-TIME</div>
            <div>OVERTIME</div>
            <div>DURATION</div>
            <div>TYPE</div>
            <div>ACTION</div>
          </div>

          {/* Table Row */}
          <div className="grid grid-cols-8 items-center text-sm py-4 border-b">
            <div className="flex items-center gap-2">
              <img src={user2} className="w-8 h-8 rounded-full" />
              <div>
                <p>Omar Al-Farsi</p>
                <span className="text-xs text-gray-400">EM01</span>
              </div>
            </div>

            <div>24 Sept 2025</div>
            <div>09:42 AM</div>
            <div>07:51 PM</div>
            <div>2h 30m</div>
            <div className="font-semibold">11h 30m</div>

            <div>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                On Site
              </span>
            </div>

            <div>
              <Pencil size={18} className="text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* ================= ON LEAVE PANEL ================= */}
        <div className="bg-white rounded-xl shadow-sm p-6">

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">On Leave</h3>
            <button className="bg-black text-white px-3 py-1 rounded-full text-xs">
              On Leave
            </button>
          </div>

          {[user1, user2, user3].map((img, i) => (
            <div key={i} className="flex items-center gap-3 mb-4">
              <img src={img} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-medium">Employee Name</p>
                <p className="text-xs text-gray-400">Technician</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
