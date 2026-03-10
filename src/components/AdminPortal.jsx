import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceModal from "./AttendanceModal";
import building from "../assets/building.png";
import dashboard from "../assets/dashboard.png";
import umbrella from "../assets/umbrella.png";
import employee from "../assets/employees 1.png";
import person from "../assets/person.png";
import calender from "../assets/calendar1.png";
import user1 from "../assets/user1.png";
import Navbar from "./Navbar";
import admin1 from "../assets/admin1.png";
import admin2 from "../assets/admin2.png";
import admin3 from "../assets/admin3.png";
import edit from "../assets/edit.png";
import del from "../assets/delete.png";
const API_BASE_URL = "http://localhost:5000/api";

export default function Dashboard() {
  const [employeeStats, setEmployeeStats] = useState({
    total: 0,
    payroll: 0,
    contract: 0,
    staff: 0,
  });

  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [inTime, setInTime] = useState(null);
  const [isScannedIn, setIsScannedIn] = useState(false);
  const [duration, setDuration] = useState("0h 0m");
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);
  const navigate = useNavigate();

  const adminId = 2;

  useEffect(() => {
    fetchEmployeeStats();
    fetchAttendance();
    fetchLeave();
    fetchAdminAttendance();
  }, []);

  useEffect(() => {
    if (!inTime) return;

    const updateDuration = () => {
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
    };

    updateDuration(); // calculate immediately

    const interval = setInterval(updateDuration, 60000);

    return () => clearInterval(interval);
  }, [inTime]);

  function formatDuration(minutes) {
    if (!minutes) return "-";

    const h = Math.floor(minutes / 60);
    const m = minutes % 60;

    return `${h}h ${m}m`;
  }

  const fetchAdminAttendance = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin-attendance/${adminId}`);
      const data = await res.json();

      const today = new Date().toISOString().split("T")[0];

      const todayRecord = data.find((a) => a.date === today);

      if (todayRecord) {
        setInTime(todayRecord.inTime);

        if (!todayRecord.outTime) {
          setIsScannedIn(true);
        } else {
          setIsScannedIn(false);
          setDuration(formatDuration(todayRecord.duration));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const tabs = ["Self", "All Employee", "Staff", "Payroll", "Contract"];

  const leaveTabs = ["Staff", "payroll", "Contract"];

  const [selectedRow, setSelectedRow] = useState(null);

  /*SCAN FUNCTION*/

  const handleScan = async () => {
    try {
      const url = isScannedIn
        ? `${API_BASE_URL}/admin-attendance/scan-out`
        : `${API_BASE_URL}/admin-attendance/scan-in`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ adminId }),
      });

      const data = await res.json();

      alert(data.message);

      await fetchAdminAttendance();
    } catch (error) {
      console.error(error);
    }
  };
  // logged in admin

  // const data = [
  //   {
  //     id: 1,
  //     name: "Omar Al-Farsi",
  //     empId: "IN01",
  //     designation: "Interior Designer",
  //     category: "Payroll",
  //     date: "16 Oct 2025",
  //     inTime: "09:42 AM",
  //     outTime: "07:51 PM",
  //     overtime: "2h 30m",
  //     reduction: "2h",
  //     duration: "11h 30m",
  //     type: "In Factory",
  //     remark: "Remark",
  //   },
  //   {
  //     id: 2,
  //     name: "Liam Carter",
  //     empId: "IN02",
  //     designation: "Home Consultant",
  //     category: "Payroll",
  //     date: "16 Oct 2025",
  //     inTime: "09:44 AM",
  //     outTime: "02:43 PM",
  //     overtime: "NA",
  //     reduction: "2h",
  //     duration: "05h 2m",
  //     type: "Staff",
  //     remark: "Half Day",
  //   },
  // ];

  // const leaveData = [
  //   {
  //     img: user1,
  //     name: "Khalid Al-Maamari",
  //     role: "Technician",
  //     period: "05 Jan - 15 Feb, 2025",
  //   },
  //   {
  //     img: user1,
  //     name: "Amina Al-Qasim",
  //     role: "Helper",
  //     period: "First Half",
  //   },
  //   {
  //     img: user1,
  //     name: "Amina Al-Farsi",
  //     role: "Engineer",
  //     period: "10 Mar - 20 Apr, 2026",
  //   },
  // ];

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

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance`);
      const data = await res.json();

      const today = new Date().toISOString().split("T")[0];

      const todayRecords = data.filter((item) => item.date === today);

      const finalData =
        todayRecords.length > 0 ? todayRecords : data.slice(0, 10);

      setAttendanceData(finalData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLeave = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/leave`);
      const data = await res.json();

      const today = new Date();
      const twoWeeks = new Date();
      twoWeeks.setDate(today.getDate() + 14);

      const upcomingLeaves = data.filter((leave) => {
        const fromDate = new Date(leave.fromDate);
        return fromDate >= today && fromDate <= twoWeeks;
      });

      setLeaveData(upcomingLeaves);
    } catch (err) {
      console.error(err);
    }
  };

  function formatTime(time) {
    if (!time) return "-";

    const [h, m] = time.split(":");

    const date = new Date();
    date.setHours(h);
    date.setMinutes(m);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  // const handleScan  = async ()= {
  //   const res = await fetch
  // }

  return (
    <div>
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        <Navbar />

        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          <div className="mx-6 mt-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Admin
              </h1>

              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
                <div className="lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={dashboard} className="w-4 h-4" />
                  <span className="text-sm">Dashboard</span>
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={person}
                    className="w-4 h-4"
                    onClick={() => navigate("/attendance")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[FFFFFF] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={employee}
                    className="w-4 h-4"
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

          {/* DASHBOARD CARD */}

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 px-4 py-4">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">In Time</p>

                <h2 className="text-3xl font-bold mt-1">
                  {inTime ? formatTime(inTime) : "--:--"}
                </h2>
                {/* SCAN BUTTON */}

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleScan}
                    className="mt-6 bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
                  >
                    {isScannedIn ? "Scan Out" : "Scan In"}
                  </button>
                </div>
              </div>

              <div className="w-[150px] flex flex-col items-center">
                <p className="text-sm font-semibold mt-1">{duration}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin1} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">Assigned Employee</p>
                <h3 className="text-2xl font-semibold">
                  {employeeStats.total}
                </h3>{" "}
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

            {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-5 py-4 flex flex-col justify-between">
              <img src={admin4} className="w-7 h-7" />
              <div>
                <p className="text-gray-500 text-sm mt-2">In Factory</p>
                <h3 className="text-2xl font-semibold">6</h3>
              </div>
            </div> */}
          </div>

          {/* MAIN SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-[67%_33%] gap-4 px-4 pb-6">
            {/* TABLE */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-[13px] border-separate"
                  style={{ borderSpacing: "0 8px" }}
                >
                  <thead style={{ background: "FFFFFF" }}>
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

                      <th className="px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {attendanceData?.map((item) => (
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

                            <img
                              src={
                                item.Employee?.employeePicture
                                  ? `http://localhost:5000/uploads/${item.Employee.employeePicture}`
                                  : user1
                              }
                              className="w-8 h-8 rounded-full object-cover"
                            />

                            <div>
                              <div className="font-medium text-gray-800">
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
                          {item.date}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {formatTime(item.inTime)}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {formatTime(item.outTime)}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.overtime ? `${item.overtime}m` : "-"}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.duration
                            ? `${Math.floor(item.duration / 60)}h ${item.duration % 60}m`
                            : "-"}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-xs">
                            {item.Employee?.type || "-"}
                          </span>
                        </td>

                        <td className="px-3 py-[32px] border border-gray-200 rounded-r-lg flex gap-3">
                          <img
                            src={edit}
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => navigate("/attendance")}
                          />
                          <img
                            src={del}
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => navigate("/attendance")}
                          />
                        </td>
                      </tr>
                    ))}

                    {attendanceData?.length === 0 && (
                      <tr>
                        <td
                          colSpan="8"
                          className="text-center py-6 text-gray-400"
                        >
                          No attendance records found
                        </td>
                      </tr>
                    )}
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
                {Array.isArray(leaveData) &&
                  leaveData.map((p, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            p.Employee?.employeePicture
                              ? `http://localhost:5000/uploads/${p.Employee.employeePicture}`
                              : user1
                          }
                          className="w-10 h-10 rounded-full object-cover"
                        />

                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {p.Employee?.name || "-"}
                          </p>

                          <p className="text-xs text-gray-400"></p>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 whitespace-nowrap">
                        {p.fromDate} - {p.toDate}
                      </p>
                    </div>
                  ))}

                {leaveData?.length === 0 && (
                  <p className="text-center text-gray-400 text-sm">
                    No upcoming leaves
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
