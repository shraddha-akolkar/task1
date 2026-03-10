import React, { useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceModal from "./AttendanceModal";
import building from "../assets/building.png";
import window from "../assets/window.png";
import umbrella from "../assets/umbrella.png";
import calender from "../assets/calendar1.png";
import attendence from "../assets/attendance.png";
import user1 from "../assets/user1.png";
import Navbar from "./Navbar";
import { AuthContext } from "../context/AuthContext";
import { Plus } from "lucide-react";
const API_BASE_URL = "http://localhost:5000/api";

// MAIN

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
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user?.id) {
      fetchAttendance();
    }
  }, [user]);

  const fetchAttendance = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/attendance/${user.id}`);
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

  return (
    <div className="border-lg">
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        {/*  NAVBAR */}
        <Navbar />

        {/*  TOP HEADER */}
        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          <div className="mx-6 mt-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Employee Attendance
              </h1>

              {/* RIGHT SIDE ICONS */}
              <div
                className="
        flex items-center gap-2
        overflow-x-auto scrollbar-hide
        pb-2
        lg:pb-0
      "
              >
                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={window}
                    className="w-4 h-4"
                    onClick={() => navigate("/employee-dashboard")}
                  />
                </div>
                <div className=" lg:mb-2 inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={attendence} className="w-4 h-4" />
                  <span className="text-sm">Attendance</span>
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={calender}
                    className="w-4 h-4"
                    onClick={() => navigate("/employee-leave")}
                  />
                </div>

                {/* 
                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={user} className="w-4 h-4" />
                </div> */}

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

          {/*  TABLE  */}
          <div
            className="bg-white rounded-xl shadow overflow-hidden mx-4 pb-2 pt-2
           "
          >
            <div className="pb-4 px-4 rounded-xl">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-[13px] border-separate"
                  style={{ borderSpacing: "0 8px" }}
                >
                  <thead style={{ background: "#FAFAFA" }}>
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
                      <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        OVERTIME
                      </th>
                      {/* <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        REDUCTION
                      </th> */}
                      <th className="font-medium px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                        DURATION
                      </th>
                      {/* <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                        TYPE
                      </th> */}
                      {/* <th className="font-medium px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                        REMARK
                      </th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {attendanceData.map((item) => (
                      <tr key={item.id} className="bg-white">
                        <td className="px-3 py-[10px] border border-gray-200 rounded-l-lg">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                item.Employee?.employeePicture
                                  ? `http://localhost:5000/uploads/${item.Employee.employeePicture}`
                                  : user1
                              }
                              className="w-8 h-8 rounded-full object-cover border border-gray-200"
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
                          <div>{item.Employee?.designation || "-"}</div>
                          <div className="text-[11px] text-gray-400">
                            {item.Employee?.type || "-"}
                          </div>
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.date}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.inTime}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {item.outTime && item.outTime !== "00:00:00"
                            ? item.outTime
                            : "-"}
                        </td>

                        <td className="px-3 py-[10px] border border-gray-200">
                          {formatDuration(item.overtime)}
                        </td>

                        {/* <td className="px-3 py-[10px] border border-gray-200">
                          -
                        </td> */}

                        <td className="px-3 py-[20px] border border-gray-200 rounded-r-lg flex gap-3">
                          {formatDuration(item.duration)}
                        </td>

                        {/* <td className="px-3 py-[20px] border border-gray-200 rounded-r-lg flex gap-3">
                          -
                        </td> */}

                        {/* <td className="px-3 py-[20px] border border-gray-200 rounded-r-lg flex gap-3">
                          <img
                            src={edit}
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => handleEdit(item)}
                          />

                          <img
                            src={del}
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => handleDelete(item.id)}
                          />
                        </td> */}
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
