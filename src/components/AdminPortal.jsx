import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Filter,
  Users,
  UserCheck,
  Briefcase,
  Home,
  Building2,
  Pencil,
  CheckCircle2,
  XCircle,
  ArrowRightFromLine,
  ArrowLeftFromLine,
  LayoutDashboard,
  UserCog,
  UsersRound,
  User,
  CalendarDays,
} from "lucide-react";

import graphImg from "../assets/time.png";

//  profile images 
import emp1   from "../assets/user1.png";
import emp2   from "../assets/user1.png";
import emp3   from "../assets/user1.png";
import emp4   from "../assets/user1.png";
import emp5   from "../assets/user1.png";
import emp6   from "../assets/user1.png";
import leave1 from "../assets/employees 1.png";
import leave2 from "../assets/employees 1.png";
import leave3 from "../assets/employees 1.png";

//  attendance data 
const attendanceRows = [
  {
    img: emp1, name: "Omar Al-Farsi",   id: "EM01",
    date: "24 Sept 2025",
    inTime:   { text: "09:42 AM", late: false, edited: false },
    outTime:  { text: "07:51 PM", edited: false },
    ot:       { text: "2h 30m",  hasActions: true },
    duration: { text: "11h 30m", highlight: false },
    types: ["On Site"],
  },
];

const typeStyle = {
  "On Site":    "bg-green-100 text-green-700",
  "In Factory": "bg-purple-100 text-purple-700",
};

const leaveData = [
  { img: leave1, name: "Khalid Al-Maamari", role: "Technician", period: "05 Jan - 15 Feb, 2025" },
];

// 
const AdminPortal = () => {
  const [activeLeaveTab, setActiveLeaveTab] = useState("On Leave");
  const leaveTabs = ["On Leave", "On Site", "In Factory", "New"];
  const navigate = useNavigate();
  const handleUserClick = () =>{
  navigate("/RegisterEmployeeModal");
  } 

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/*  TOP HEADER BAR  */}
      <div className="flex justify-end items-center gap-3 px-4 pt-4 pb-1">
        <button className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
          <LayoutDashboard size={15} />
          Dashboard
        </button>
        <div className="flex items-center gap-3 text-gray-500">
          <UserCog size={18} className="cursor-pointer hover:text-gray-800 transition-colors" />
          <UsersRound size={18} className="cursor-pointer hover:text-gray-800 transition-colors" 
          onClick={() => handleUserClick()}/>
          <User size={18} className="cursor-pointer hover:text-gray-800 transition-colors" />
          <CalendarDays size={18} className="cursor-pointer hover:text-gray-800 transition-colors" />
        </div>
        <span className="text-sm font-medium text-gray-700">Admin</span>
      </div>

      {/*  DASHBOARD TOP  */}
      <div className="flex gap-3 p-4 overflow-x-auto">

        {/* In-Time / Gauge card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex items-center justify-between min-w-[260px]">
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-gray-400 text-xs">In Time</p>
              <h2 className="text-3xl font-bold mt-1">09:43 AM</h2>
            </div>
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition">
              Scan Out
            </button>
          </div>

          {/* Gauge image with label overlay */}
          <div className="relative flex items-center justify-center w-44 h-28">
            <img src={graphImg} alt="Work Duration" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Stat cards */}
        <DashboardCard icon={<Users size={22} />}     title="Assigned Employee"  value="25" />
        <DashboardCard icon={<UserCheck size={22} />} title="Payroll Employee"   value="18" />
        <DashboardCard icon={<Briefcase size={22} />} title="Contract Employee"  value="7"  />
        <DashboardCard icon={<Home size={22} />}      title="On Site"            value="19" />
        <DashboardCard icon={<Building2 size={22} />} title="In Factory"         value="6"  />
      </div>

      {/*  MAIN SECTION  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 pb-6">

        {/* Attendance table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold">Attendance</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 gap-1">
                <Search size={14} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employee"
                  className="bg-transparent outline-none text-sm w-32"
                />
              </div>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <Filter size={14} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-500 text-[11px]">
                  <th className="p-3 rounded-l-lg w-8">
                    <input type="checkbox" className="rounded" />
                  </th>
                  <th className="p-3">EMPLOYEE NAME</th>
                  <th className="p-3">DATE</th>
                  <th className="p-3">IN-TIME</th>
                  <th className="p-3">OUT-TIME</th>
                  <th className="p-3">OVERTIME</th>
                  <th className="p-3">DURATION</th>
                  <th className="p-3">TYPE</th>
                  <th className="p-3 rounded-r-lg">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRows.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">

                    {/* checkbox */}
                    <td className="p-3">
                      <input type="checkbox" className="rounded" />
                    </td>

                    {/* employee name */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={row.img}
                          alt={row.name}
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{row.name}</p>
                          <p className="text-gray-400 text-[10px]">{row.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* date */}
                    <td className="p-3 text-gray-600 whitespace-nowrap">{row.date}</td>

                    {/* in-time */}
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {row.inTime.edited
                          ? <Pencil size={11} className="text-gray-400" />
                          : <ArrowRightFromLine size={11} className="text-gray-400" />}
                        <span className={row.inTime.late ? "text-orange-500 font-semibold" : "text-gray-800"}>
                          {row.inTime.text}
                        </span>
                      </div>
                    </td>

                    {/* out-time */}
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {row.outTime.edited
                          ? <Pencil size={11} className="text-gray-400" />
                          : <ArrowLeftFromLine size={11} className="text-gray-400" />}
                        <span className="text-gray-800">{row.outTime.text}</span>
                      </div>
                    </td>

                    {/* overtime */}
                    <td className="p-3 whitespace-nowrap">
                      {row.ot.hasActions ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle2 size={14} className="text-green-500" />
                          <XCircle size={14} className="text-red-400" />
                          <span className="text-gray-700 ml-1">{row.ot.text}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">{row.ot.text}</span>
                      )}
                    </td>

                    {/* duration */}
                    <td className={`p-3 font-semibold whitespace-nowrap ${row.duration.highlight ? "text-orange-500" : "text-gray-800"}`}>
                      {row.duration.text}
                    </td>

                    {/* type badges */}
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {row.types.map((t) => (
                          <span key={t} className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${typeStyle[t]}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* action */}
                    <td className="p-3">
                      <Pencil size={14} className="text-gray-400 cursor-pointer hover:text-gray-700" />
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* On Leave panel */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-5 flex-wrap gap-2">
            <h2 className="text-base font-semibold">On Leave</h2>
            <div className="flex gap-1 text-xs flex-wrap">
              {leaveTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveLeaveTab(tab)}
                  className={`px-3 py-1 rounded-full font-medium transition-all ${
                    activeLeaveTab === tab
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {leaveData.map((p, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 whitespace-nowrap text-right">{p.period}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

//  Dashboard Card 
const DashboardCard = ({ icon, title, value }) => (
  <div className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between min-w-[110px]">
    <div className="text-gray-700 mb-5">{icon}</div>
    <div>
      <p className="text-gray-400 text-xs mb-1">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  </div>
);

export default AdminPortal;