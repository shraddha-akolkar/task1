import React, { useState } from "react";
import Navbar from "./Navbar";
import RegisterEmployeeModal from "./RegisterEmployeeModal";
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

// profile images
import emp1 from "../assets/user1.png";
import leave1 from "../assets/employees 1.png";

// attendance data
const attendanceRows = [
  {
    img: emp1,
    name: "Omar Al-Farsi",
    id: "EM01",
    date: "24 Sept 2025",
    inTime: { text: "09:42 AM", late: false, edited: false },
    outTime: { text: "07:51 PM", edited: false },
    ot: { text: "2h 30m", hasActions: true },
    duration: { text: "11h 30m", highlight: false },
    types: ["On Site"],
  },
];

const typeStyle = {
  "On Site": "bg-green-100 text-green-700",
  "In Factory": "bg-purple-100 text-purple-700",
};

const leaveData = [
  {
    img: leave1,
    name: "Khalid Al-Maamari",
    role: "Technician",
    period: "05 Jan - 15 Feb, 2025",
  },
];

const AdminPortal = () => {
  const [activeLeaveTab, setActiveLeaveTab] = useState("On Leave");
  const [showModal, setShowModal] = useState(false);

  const leaveTabs = ["On Leave", "On Site", "In Factory", "New"];
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* TOP HEADER BAR */}
      <div className="flex justify-end items-center gap-3 px-4 pt-4 pb-1">
        <button className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
          <LayoutDashboard size={15} />
          Dashboard
        </button>

        <div className="flex items-center gap-3 text-gray-500">
          <UserCog
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
            onClick={() => navigate("/attendance")}
          />

          <UsersRound
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
             onClick={() => navigate("/dashboard")}
          />

          <User
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
          />
          <CalendarDays
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
          />
        </div>

        <span className="text-sm font-medium text-gray-700">Admin</span>
      </div>

      {/* DASHBOARD TOP */}
      <div className="flex gap-3 p-4 overflow-x-auto">
        {/* In-Time Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex items-center justify-between min-w-[260px]">
          <div>
            <p className="text-gray-400 text-xs">In Time</p>
            <h2 className="text-3xl font-bold mt-1">09:43 AM</h2>
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition">
              Scan Out
            </button>
          </div>

          <div className="w-44 h-28">
            <img
              src={graphImg}
              alt="Work Duration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Stat Cards */}
        <DashboardCard
          icon={<Users size={22} />}
          title="Assigned Employee"
          value="25"
        />
        <DashboardCard
          icon={<UserCheck size={22} />}
          title="Payroll Employee"
          value="18"
        />
        <DashboardCard
          icon={<Briefcase size={22} />}
          title="Contract Employee"
          value="7"
        />
        <DashboardCard icon={<Home size={22} />} title="On Site" value="19" />
        <DashboardCard
          icon={<Building2 size={22} />}
          title="In Factory"
          value="6"
        />
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 pb-6">
        {/* Attendance Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-base font-semibold mb-4">Attendance</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-500 text-[11px]">
                  <th className="p-3">EMPLOYEE NAME</th>
                  <th className="p-3">DATE</th>
                  <th className="p-3">IN-TIME</th>
                  <th className="p-3">OUT-TIME</th>
                  <th className="p-3">OVERTIME</th>
                  <th className="p-3">DURATION</th>
                  <th className="p-3">TYPE</th>
                  <th className="p-3">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRows.map((row, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={row.img}
                          alt={row.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{row.name}</p>
                          <p className="text-gray-400 text-[10px]">{row.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{row.date}</td>
                    <td className="p-3">{row.inTime.text}</td>
                    <td className="p-3">{row.outTime.text}</td>
                    <td className="p-3">{row.ot.text}</td>
                    <td className="p-3">{row.duration.text}</td>
                    <td className="p-3">
                      {row.types.map((t) => (
                        <span
                          key={t}
                          className={`px-2 py-0.5 rounded-full text-[10px] ${typeStyle[t]}`}
                        >
                          {t}
                        </span>
                      ))}
                    </td>
                    <td className="p-3">
                      <Pencil size={14} className="cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leave Panel */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-base font-semibold mb-4">On Leave</h2>

          {leaveData.map((p, i) => (
            <div key={i} className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-9 h-9 rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.role}</p>
                </div>
              </div>
              <p className="text-xs text-gray-400">{p.period}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 MODAL RENDER */}
      {showModal && (
        <RegisterEmployeeModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

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
