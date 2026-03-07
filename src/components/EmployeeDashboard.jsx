import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceModal from "./AttendanceModal";
import building from "../assets/building.png";
import dashboard from "../assets/dashboard.png";
import umbrella from "../assets/umbrella.png";
import person from "../assets/person.png";
import calender from "../assets/calendar1.png";
import user1 from "../assets/user1.png";
import Navbar from "./Navbar";
import admin1 from "../assets/admin1.png";
import admin2 from "../assets/admin2.png";
import admin3 from "../assets/admin3.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const API_BASE_URL = "http://localhost:5000/api";

function formatTime(time) {
  if (!time) return "--:--";

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

export default function Dashboard() {
  const [inTime, setInTime] = useState(null);
  const [isScannedIn, setIsScannedIn] = useState(false);
  const [duration, setDuration] = useState("0h 0m");
  const [attendanceData, setAttendanceData] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // const tabs = [
  //   "Self",
  //   "All Employee",
  //   "InFactory",
  //   "On Site",
  //   "Payroll",
  //   "Contract",
  // ];

  const [employeeStats, setEmployeeStats] = useState({
    total: 0,
    payroll: 0,
    contract: 0,
    staff: 0,
  });

  useEffect(() => {
    if (!inTime) return;

    const interval = setInterval(() => {
      const now = new Date();

      const [h, m, s] = inTime.split(":");

      const start = new Date();
      start.setHours(h);
      start.setMinutes(m);
      start.setSeconds(s);

      const diff = now - start;

      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);

      setDuration(`${hrs}h ${mins}m`);
    }, 60000);

    return () => clearInterval(interval);
  }, [inTime]);

  useEffect(() => {
    if (!user?.id) return;
    fetchAttendance();
    fetchEmployeeStats();
  }, [user]);

  const leaveTabs = ["Payroll", "Staff", "Contract"];

  const [selectedRow, setSelectedRow] = useState(null);

  /*SCAN*/
  const handleScan = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: user.id,
        }),
      });

      const data = await res.json();

      alert(data.message);

      await fetchAttendance(); // refresh table
    } catch (error) {
      console.error(error);
    }
  };

  const leaveData = [
    {
      img: user1,
      name: "Khalid Al-Maamari",
      role: "Technician",
      period: "05 Jan - 15 Feb, 2025",
    },
    {
      img: user1,
      name: "Amina Al-Qasim",
      role: "Helper",
      period: "First Half",
    },
    {
      img: user1,
      name: "Amina Al-Farsi",
      role: "Engineer",
      period: "10 Mar - 20 Apr, 2026",
    },
  ];

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/${user.id}`);
      const data = await res.json();

      setAttendanceData(data);

      const today = new Date().toISOString().split("T")[0];
      const todayRecord = data.find((a) => a.date === today);

      if (todayRecord) {
        setInTime(todayRecord.inTime || null);

        if (!todayRecord.outTime || todayRecord.outTime === "00:00:00") {
          setIsScannedIn(true);

          const now = new Date();

          const [h, m, s] = todayRecord.inTime.split(":");

          const start = new Date();
          start.setHours(h);
          start.setMinutes(m);
          start.setSeconds(s);

          const diff = now - start;

          const hrs = Math.floor(diff / 3600000);
          const mins = Math.floor((diff % 3600000) / 60000);

          setDuration(`${hrs}h ${mins}m`);
        } else {
          setIsScannedIn(false);
          setDuration(formatDuration(todayRecord.duration));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEmployeeStats = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/employees`);
      const data = await res.json();

      const employees = data.employees || [];

      const payroll = employees.filter(
        (e) => e.type?.toLowerCase() === "payroll",
      ).length;

      const contract = employees.filter(
        (e) => e.type?.toLowerCase() === "contract",
      ).length;

      const staff = employees.filter(
        (e) => e.type?.toLowerCase() === "staff",
      ).length;

      setEmployeeStats({
        total: employees.length,
        payroll,
        contract,
        staff,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formatDuration = (minutes) => {
    if (minutes === null || minutes === undefined) return "-";

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${h}h ${m}m`;
  };
  return (
    <div>
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        <Navbar />

        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          <div className="mx-6 mt-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                {user?.name || "Employee"}
              </h1>

              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                <div className="lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={dashboard} className="w-4 h-4" />
                  <span className="text-sm">Dashboard</span>
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={person}
                    className="w-4 h-4"
                    onClick={() => navigate("/employee-attendance")}
                  />
                </div>

                {/* <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={employee} className="w-4 h-4" />
                </div> */}

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={calender}
                    className="w-4 h-4"
                    onClick={() => navigate("/employee-leave")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={umbrella}
                    className="w-4 h-4"
                    onClick={() => navigate("/employee-holiday")}
                  />
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

          {/* DASHBOARD CARD */}

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 px-4 py-4">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">In Time</p>

                <h2 className="text-3xl font-bold mt-1">
                  {inTime ? formatTime(inTime) : "--:--"}
                </h2>
                {/* SCAN BUTTON */}

                <button
                  onClick={handleScan}
                  className="mt-6 bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                >
                  {isScannedIn ? "Scan Out" : "Scan In"}
                </button>
              </div>

              <div className="w-[150px] flex flex-col items-center">
                <p className="text-sm font-semibold mt-1">{duration}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin1} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Total Employee</p>
                <h3 className="text-2xl font-semibold">
                  {employeeStats.total}
                </h3>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin1} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Payroll Employee</p>
                <h3 className="text-2xl font-semibold">
                  {employeeStats.payroll}
                </h3>{" "}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin2} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Contract Employee</p>
                <h3 className="text-2xl font-semibold">
                  {employeeStats.contract}
                </h3>{" "}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin3} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Staff</p>
                <h3 className="text-2xl font-semibold">
                  {employeeStats.staff}
                </h3>{" "}
              </div>
            </div>
          </div>

          {/* MAIN SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 px-4 pb-6">
            {/* TABLE */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-[13px] border-separate"
                  style={{ borderSpacing: "0 8px" }}
                >
                  <thead style={{ background: "#FAFAFA" }}>
                    <tr className="text-[12px] uppercase text-[#151515]">
                      <th className="px-3 py-[10px] text-left rounded-l-lg border border-gray-200">
                        EMPLOYEE NAME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        DATE
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        IN-TIME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        OUT-TIME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        OVERTIME
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        DURATION
                      </th>

                      <th className="px-3 py-[10px] text-left border border-gray-200">
                        TYPE
                      </th>

                      {/* <th className="px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                        Remark
                      </th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {attendanceData.map((item) => (
                      <tr key={item.id} className="bg-white">
                        <td className="px-3 py-[10px] border border-gray-200 rounded-l-lg">
                          <div className="flex items-center gap-3">
                            {/* <input
                              type="checkbox"
                              checked={selectedRow === item.id}
                              onChange={() =>
                                setSelectedRow(
                                  selectedRow === item.id ? null : item.id,
                                )
                              }
                              className="w-3 h-4 accent-black cursor-pointer"
                            /> */}

                            <img src={user1} className="w-8 h-8 rounded-full" />

                            <div>
                              <div className="font-medium text-gray-800">
                                {item.Employee?.name || "-"}
                              </div>

                              <div className="text-[11px] text-gray-400">
                                {item.Employee?.id
                                  ? `IN${item.Employee.id}`
                                  : "-"}{" "}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.date}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {formatTime(item.inTime)}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.outTime && item.outTime !== "00:00:00"
                            ? formatTime(item.outTime)
                            : "-"}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {formatDuration(item.overtime)}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {formatDuration(item.duration)}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-xs">
                            {item.Employee?.type || "-"}
                          </span>
                        </td>

                        {/* <td className="px-3 py-[10px] border border-gray-200">
                          -
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ON LEAVE */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold">On Leave</h2>

                <div className="flex gap-2 text-xs">
                  {leaveTabs.map((tab) => (
                    <button
                      key={tab}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {leaveData.map((p, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.img}
                        className="w-10 h-10 rounded-full object-cover"
                      />

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {p.name}
                        </p>

                        <p className="text-xs text-gray-400">{p.role}</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 whitespace-nowrap">
                      {p.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
