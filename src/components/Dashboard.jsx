import React, { useState, useEffect, useCallback } from "react";
import { Bell, Users, Building2 } from "lucide-react";
import logo from "../assets/Logo.png";
import user1 from "../assets/user1.png";

const API_BASE_URL = "http://localhost:5000/api";

/* ---------------- ICONS ---------------- */

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1976D2" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6m5 0V4h4v2" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/* ---------------- HELPERS ---------------- */

/**
 * Calculate total experience from createdAt (registration date) to today.
 * Returns a human-readable string like "1 yr 3 mos" or "4 mos 12 days".
 */
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
  if (years === 0 && months === 0) parts.push(`${days} day${days !== 1 ? "s" : ""}`);

  return parts.join(" ") || "< 1 day";
}

/**
 * Format a date string to DD/MM/YYYY.
 */
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-GB");
}

/**
 * Determine visa display info based on visaExpiringOn date.
 */
function getVisaInfo(emp) {
  const { visaStatus, visaExpiringOn } = emp;

  if (!visaExpiringOn) {
    return { label: visaStatus || "—", colorClass: "text-gray-500" };
  }

  const expiry = new Date(visaExpiringOn);
  const now = new Date();
  const diffMs = expiry - now;
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: "Expired", colorClass: "text-red-500" };
  }
  if (diffDays <= 30) {
    return {
      label: `Expiring in ${diffDays} day${diffDays !== 1 ? "s" : ""}`,
      colorClass: "text-orange-500",
    };
  }
  return {
    label: `Valid till ${formatDate(visaExpiringOn)}`,
    colorClass: "text-green-600",
  };
}

/**
 * Build the URL for a file stored on the server (picture or id proof).
 */
function fileUrl(filename) {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `${API_BASE_URL.replace("/api", "")}/uploads/${filename}`;
}

/**
 * Fallback avatar with initials when no picture is available.
 */
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

/* ============================================================
   AVATAR — shows picture; falls back to initials on error
   ============================================================ */
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
      className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-gray-200"
      onError={() => setImgFailed(true)}
    />
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState("All Employee");
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);
  const [formData, setFormData] = useState({});

  const tabs = ["All Employee", "Payroll", "Staff", "Contract"];

  /* ---------------- FETCH ---------------- */

  const loadEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL(`${API_BASE_URL}/employees`);
      if (activeTab !== "All Employee") {
        url.searchParams.set("type", activeTab);
      }

      const res = await fetch(url);
      const data = await res.json();
      setEmployees(data.employees || []);
    } catch (err) {
      console.error("Error loading employees:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  /* ---------------- CLIENT-SIDE SEARCH ---------------- */

  const filtered = employees.filter((emp) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      emp.name?.toLowerCase().includes(q) ||
      emp.designation?.toLowerCase().includes(q) ||
      String(emp.id).includes(q)
    );
  });

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    await fetch(`${API_BASE_URL}/employees/${id}`, { method: "DELETE" });
    loadEmployees();
  };

  /* ---------------- EDIT ---------------- */

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

  const handleUpdate = async () => {
    await fetch(`${API_BASE_URL}/employees/${editEmployee.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setEditEmployee(null);
    loadEmployees();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔹 NAVBAR */}
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
            <img src={user1} className="w-8 h-8 rounded-full" alt="user" />
            <span className="text-sm font-medium">Amina Al-Farouqi</span>
          </div>
        </div>
      </div>

      {/* 🔹 TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {/* Tabs + Search */}
        <div className="flex items-center justify-between gap-2 p-4 border-b flex-wrap">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1 rounded-md text-sm ${
                  activeTab === tab ? "bg-black text-white" : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by name, designation or ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black/10 w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-500 bg-gray-50">
              <tr>
                <th className="p-4 text-left">EMPLOYEE</th>
                <th className="p-4 text-left">DESIGNATION</th>
                <th className="p-4 text-left">JOINING DATE</th>
                <th className="p-4 text-left">VISA STATUS</th>
                <th className="p-4 text-left">TOTAL EXPERIENCE</th>
                <th className="p-4 text-center">ID PROOF</th>
                <th className="p-4 text-left">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    No employees found
                  </td>
                </tr>
              ) : (
                filtered.map((emp) => {
                  const visaInfo = getVisaInfo(emp);
                  const idProofUrl = fileUrl(emp.idProof);

                  return (
                    <tr key={emp.id} className="border-t hover:bg-gray-50 transition-colors">

                      {/* ── EMPLOYEE: avatar + name + id ── */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <EmployeeAvatar emp={emp} />
                          <div>
                            <div className="font-semibold text-gray-800">{emp.name}</div>
                            <div className="text-xs text-gray-400">#{emp.id}</div>
                          </div>
                        </div>
                      </td>

                      {/* ── DESIGNATION + TYPE ── */}
                      <td className="p-4">
                        <div className="text-gray-800">{emp.designation}</div>
                        <div className="text-xs text-gray-400">{emp.type}</div>
                      </td>

                      {/* ── JOINING DATE ── */}
                      <td className="p-4 text-gray-700">
                        {formatDate(emp.createdAt)}
                      </td>

                      {/* ── VISA STATUS ── */}
                      <td className="p-4">
                        <span className={`font-medium ${visaInfo.colorClass}`}>
                          {visaInfo.label}
                        </span>
                        {/* Show visa type (H1B, L1, Green Card…) as subtitle if present */}
                        {emp.visaStatus && !/^\d{4}-/.test(emp.visaStatus) && (
                          <div className="text-xs text-gray-400">{emp.visaStatus}</div>
                        )}
                      </td>

                      {/* ── TOTAL EXPERIENCE (calculated from createdAt) ── */}
                      <td className="p-4 text-gray-700">
                        {calcExperience(emp.createdAt)}
                      </td>

                      {/* ── ID PROOF ── */}
                      <td className="p-4 text-center">
                        {idProofUrl ? (
                          <button
                            onClick={() => setPreviewImage(idProofUrl)}
                            className="inline-flex items-center gap-1 text-gray-500 hover:text-black transition-colors"
                            title="View ID Proof"
                          >
                            <EyeIcon />
                          </button>
                        ) : (
                          <span className="text-red-500 text-xs font-medium">Missing</span>
                        )}
                      </td>

                      {/* ── ACTION ── */}
                      <td className="p-4">
                        <div className="flex gap-3 items-center">
                          <button
                            onClick={() => handleEdit(emp)}
                            title="Edit employee"
                            className="hover:opacity-70 transition-opacity"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            title="Delete employee"
                            className="hover:opacity-70 transition-opacity"
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

      {/* ── IMAGE PREVIEW MODAL ── */}
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

      {/* ── EDIT MODAL ── */}
      {editEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Edit Employee</h2>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Name</label>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Designation</label>
                <input
                  name="designation"
                  value={formData.designation || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Type</label>
                <select
                  name="type"
                  value={formData.type || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                >
                  <option value="Payroll">Payroll</option>
                  <option value="Staff">Staff</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Visa Expiring On</label>
                <input
                  type="date"
                  name="visaExpiringOn"
                  value={formData.visaExpiringOn || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditEmployee(null)}
                className="px-5 py-2 rounded-lg text-sm text-gray-600 border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2 rounded-lg text-sm bg-black text-white hover:bg-gray-800"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}