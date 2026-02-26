import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RegisterEmployeeModal from "./RegisterEmployeeModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import logo from "../assets/Logo.png";
import user1 from "../assets/user1.png";
import filter from "../assets/filter.png";
import file from "../assets/file.png";
import building from "../assets/building.png";
import user from "../assets/user.png";
import window from "../assets/window.png";
import umbrella from "../assets/umbrella.png";
import person from "../assets/person.png";
import calender from "../assets/calendar1.png";
import group from "../assets/group.png";
import plus from "../assets/plus.png";

import {
  Funnel,
  Album,
  LayoutGrid,
  UserCheck,
  Users,
  Bell,
  CalendarDays,
  Umbrella,
  Building2,
  Plus,
  UserCog,
} from "lucide-react";
import Navbar from "./Navbar";

const API_BASE_URL = "http://localhost:5000/api";

/*  ICONS  */

const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1976D2"
    strokeWidth="2"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#D32F2F"
    strokeWidth="2"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6m5 0V4h4v2" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#555"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/** CALCULATION */

function calcExperience(createdAt) {
  if (!createdAt) return "—";

  const start = new Date(createdAt);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  if (years === 0 && months === 0)
    parts.push(`${days} day${days !== 1 ? "s" : ""}`);

  return parts.join(" ") || "< 1 day";
}

/**date DD/MM/YYYY */

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-GB");
}

/** visa display info based on visaExpiringOn date.*/

function getVisaInfo(emp) {
  const { visaExpiringOn } = emp;

  if (!visaExpiringOn) {
    return { label: "—", colorClass: "text-gray-500" };
  }

  const expiry = new Date(visaExpiringOn);
  const now = new Date();

  const diffMs = expiry - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Format date
  const formattedDate = formatDate(visaExpiringOn);

  if (diffDays <= 30 && diffDays >= 0) {
    return {
      label: formattedDate,
      subLabel: "Expiring Soon",
      colorClass: "text-orange-500",
    };
  }

  return {
    label: formattedDate,
    subLabel: null,
    colorClass: "text-gray-700",
  };
}

//  URL for a file stored

function fileUrl(filename) {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `${API_BASE_URL.replace("/api", "")}/uploads/${filename}`;
}

// avatar

function InitialsAvatar({ name, hidden }) {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("")
    : "?";

  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: hidden ? "none" : "flex",
      }}
    >
      {initials}
    </div>
  );
}

/* AVATAR — shows picture; falls back to initials on error */

function EmployeeAvatar({ emp }) {
  const [imgFailed, setImgFailed] = useState(false);
  const picUrl = fileUrl(emp.employeePicture);

  if (!picUrl || imgFailed) {
    return <InitialsAvatar name={emp.name} />;
  }

  return (
    <img
      src={picUrl}
      alt={emp.name}
      className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-[1.5px] border-gray-200"
      onError={() => setImgFailed(true)}
    />
  );
}

// MAIN

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");
  //   const [employees, setEmployees] = useState([]);
  //   const [isLoading
  // , setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);
  const [formData, setFormData] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [joiningDate, setJoiningDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const tabs = ["All Employee", "Payroll", "Staff", "Contract"];

  const { data, isLoading } = useQuery({
    queryKey: ["employees", activeTab, search, joiningDate, expiryDate],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (search.trim()) params.append("search", search.trim());
      if (activeTab !== "All Employee") params.append("type", activeTab);
      if (joiningDate) params.append("joiningDate", joiningDate);
      if (expiryDate) params.append("expiryDate", expiryDate);

      const res = await fetch(`${API_BASE_URL}/employees?${params.toString()}`);
      const result = await res.json();
      return result.employees || [];
    },
  });

  /*  FETCH  */

  //  added search here

  //   useEffect(() => {
  //     loadEmployees();
  //   }, [loadEmployees]);

  /*  DELETE  */

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await fetch(`${API_BASE_URL}/employees/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  /*  EDIT  */

  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setFormData({
      name: emp.name,
      designation: emp.designation,
      type: emp.type,
      visaExpiringOn: emp.visaExpiringOn || "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${API_BASE_URL}/employees/${editEmployee.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setEditEmployee(null);
    },
  });

  /*  UI  */

  return (
    <div className="border-lg">
      <div className="min-h-screen bg-white rounded-[20px] mx-2 relative">
        {/*  NAVBAR */}
        <Navbar />

        {/*  TOP HEADER */}
        <div className="bg-white border-l border-r border-b border-gray-100 rounded-b-xl pb-3 mb-2 -mt-[0.1rem] relative z-10">
          <div className="mx-6 mt-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {/* Title */}
              <h1 className="text-[20px] font-[500] text-gray-800 pb-2 lg:pb-1">
                Employees
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
                    onClick={() => navigate("/adminportal")}
                  />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={person}
                    className="w-4 h-4"
                    onClick={() => navigate("/attendance")}
                  />
                </div>

                {/* Active Employees Button */}
                <div className="inline-flex items-center gap-2 bg-black text-white px-4 h-9 rounded-full cursor-pointer whitespace-nowrap">
                  <img src={group} className="w-4 h-4" alt="user" />
                  <span className="text-sm">Employees</span>
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={user} className="w-4 h-4" />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={calender} className="w-4 h-4" />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={umbrella} className="w-4 h-4" />
                </div>

                <div className="lg:mb-2 h-8 w-8 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                  <img src={building} className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/*  TABLE  */}
          <div
            className="bg-white rounded-xl shadow overflow-hidden mx-4 pb-2
           "
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between pt-2 pb-2 px-4">
              <div className="flex flex-wrap gap-2 ">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1 rounded-md text-sm cursor-pointer  ${
                      activeTab === tab
                        ? "bg-black text-white"
                        : "text-gray-600 bg-[#FAFAFA]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* RIGHT SIDE ICON  */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pt-2">
                {/* Search pill */}
                <div className="flex items-center w-full sm:w-full md:w-full lg:w-[260px] border border-gray-200 rounded-full px-4 py-2 bg-[#FAFAFA]">
                  <input
                    type="text"
                    placeholder="Search employee"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 bg-[#FAFAFA]"
                  />
                  <div className="w-4 h-4 border-2 border-gray-500 rounded-full relative">
                    <span className="absolute w-2 h-[2px] bg-gray-500 right-[-5px] bottom-[-3px] rotate-45"></span>
                  </div>
                </div>
                {/* Filter */}
                <div
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-9 h-9 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
                >
                  <img src={filter} className="w-4 h-4" />
                </div>
                {/* File */}
                <div className="w-9 h-9 rounded-xl border border-gray-200 bg-[#FAFAFA] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
                  <img src={file} className="w-4 h-4" />
                </div>
                {/* New button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-800"
                >
                  <img src={plus} className="w-4 h-4" />
                  New
                </button>
              </div>
            </div>
            {/* FILTER  */}
            {showFilters && (
              <div className="p-4 border-b bg-gray-50 flex flex-col lg:flex-row gap-4 transition-all duration-300">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    value={joiningDate}
                    onChange={(e) => setJoiningDate(e.target.value)}
                    className="border border-[1.5px] border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="border border-[1.5px] border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                  />
                </div>
              </div>
            )}
            {/*  TABLE */}
            <div className="overflow-x-auto bg-white px-[20px]">
              <table
                className="w-full text-[13px] border-separate"
                style={{ borderSpacing: "0 5px" }}
              >
                <thead style={{ background: "#FAFAFA" }}>
                  <tr className=" text-[12px] leading-[100%] tracking-[0%] uppercase text-[#151515]">
                    <th className="font-medium px-3 py-[10px] text-left rounded-l-lg border border-gray-200">
                      EMPLOYEE NAME
                    </th>
                    <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                      DESIGNATION
                    </th>
                    <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                      JOINING DATE
                    </th>
                    <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                      VISA STATUS
                    </th>
                    <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                      TOTAL EXPERIENCE
                    </th>
                    <th className="font-medium px-3 py-[10px] text-center border border-gray-200">
                      ID PROOF
                    </th>
                    <th className="font-medium px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                      ACTION
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-5 text-center text-gray-400"
                      >
                        Loading…
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-5 text-center text-gray-400"
                      >
                        No employees found
                      </td>
                    </tr>
                  ) : (
                    data?.map((emp) => {
                      const visaInfo = getVisaInfo(emp);
                      const idProofUrl = fileUrl(emp.idProof);

                      return (
                        <tr key={emp.id} className="bg-white">
                          <td className="px-3 py-[4px] border border-[1px] border-gray-200 rounded-l-lg">
                            <div className="flex items-center gap-1.5">
                              <EmployeeAvatar emp={emp} />
                              <div>
                                <div className="font-medium text-gray-800 leading-tight">
                                  {emp.name}
                                </div>
                                <div className="text-[11px] text-gray-400 leading-tight">
                                  IN{emp.id}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-[4px] border border-[1px] border-gray-200 leading-tight">
                            <div>{emp.designation}</div>
                            <div className="text-[11px] text-gray-400">
                              {emp.type}
                            </div>
                          </td>

                          <td className="px-3 py-[4px] border border-[1px] border-gray-200">
                            {formatDate(emp.createdAt)}
                          </td>

                          <td className="px-3 py-[4px] border border-[1px] border-gray-200">
                            <div
                              className={`${visaInfo.colorClass} leading-tight`}
                            >
                              {visaInfo.label}
                            </div>
                            {visaInfo.subLabel && (
                              <div className="text-[11px] text-orange-500 leading-tight">
                                {visaInfo.subLabel}
                              </div>
                            )}
                          </td>

                          <td className="px-3 py-[4px] border border-[1px] border-gray-200">
                            {calcExperience(emp.createdAt)}
                          </td>

                          <td className="px-3 py-[4px] text-center border border-[1px] border-gray-200">
                            {idProofUrl ? (
                              <button
                                onClick={() => setPreviewImage(idProofUrl)}
                              >
                                <EyeIcon />
                              </button>
                            ) : (
                              <span className="text-red-500 text-[11px]">
                                Missing
                              </span>
                            )}
                          </td>

                          <td className="px-3 py-[4px] border border-[1px] border-gray-200 rounded-r-lg">
                            <div className="flex gap-2">
                              <button onClick={() => handleEdit(emp)}>
                                <EditIcon />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm("Delete this employee?")) {
                                    deleteMutation.mutate(emp.id);
                                  }
                                }}
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/*  IMAGE  */}
          {previewImage && (
            <div
              onClick={() => setPreviewImage(null)}
              className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            >
              <img
                src={previewImage}
                alt="ID Proof"
                className="max-h-[80%] max-w-[80%] rounded-lg shadow-2xl"
              />
            </div>
          )}
          {/*  EDIT  */}
          {editEmployee && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div
                className="bg-white rounded-xl shadow overflow-hidden mx-1 p-4 
            border-l-2 border-r-2 border-b-2 border-red-500 min-h-[calc(100vh-90px)]"
              >
                <h2 className="text-lg font-bold mb-4 text-gray-800">
                  Edit Employee
                </h2>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Name
                    </label>
                    <input
                      name="name"
                      value={formData.name || ""}
                      onChange={handleChange}
                      className="w-full border border-[1.5px] border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Designation
                    </label>
                    <input
                      name="designation"
                      value={formData.designation || ""}
                      onChange={handleChange}
                      className="w-full border border-[1.5px] border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Type
                    </label>
                    <select
                      name="type"
                      value={formData.type || ""}
                      onChange={handleChange}
                      className="w-full border border-[1.5px] border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                    >
                      <option value="Payroll">Payroll</option>
                      <option value="Staff">Staff</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">
                      Visa Expiring On
                    </label>
                    <input
                      type="date"
                      name="visaExpiringOn"
                      value={formData.visaExpiringOn || ""}
                      onChange={handleChange}
                      className="w-full border border-[1.5px] border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setEditEmployee(null)}
                    className="px-5 py-2 rounded-lg text-sm text-gray-600 border border-[1.5px] border-gray-200 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => updateMutation.mutate()}
                    className="px-5 py-2 rounded-lg text-sm bg-black text-white hover:bg-gray-800"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* REGISTER MODAL */}
          {/* */}
          {showModal && (
            <RegisterEmployeeModal
              onClose={() => setShowModal(false)}
              refresh={() =>
                queryClient.invalidateQueries({
                  queryKey: [
                    "employees",
                    activeTab,
                    search,
                    joiningDate,
                    expiryDate,
                  ],
                })
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
