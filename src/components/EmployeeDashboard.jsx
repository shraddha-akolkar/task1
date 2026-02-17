import React, { useState, useEffect, useCallback } from "react";
import logo from "../assets/Logo.png";

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

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    await fetch(`${API_BASE_URL}/employees/${id}`, {
      method: "DELETE",
    });

    loadEmployees();
  };

  /* ---------------- EDIT ---------------- */

  const handleEdit = (emp) => {
    setEditEmployee(emp);
    setFormData({
      name: emp.name,
      designation: emp.designation,
      type: emp.type,
      visaExpiringOn: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        <img src={logo} alt="logo" className="h-8" />

        <div className="flex gap-6 bg-white rounded-full px-6 py-2 shadow">
          <button className="bg-black text-white px-4 py-1 rounded-full text-sm">
            Portal
          </button>
          <button className="text-gray-600 text-sm">Project Management</button>
          <button className="text-gray-600 text-sm">Sales</button>
          <button className="text-gray-600 text-sm">Accounts</button>
        </div>
      </div>

      {/* 🔹 TABLE CONTAINER */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="flex gap-2 p-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1 rounded-md text-sm ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-500">
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
                  <td colSpan={7} className="p-8 text-center">Loading...</td>
                </tr>
              ) : employees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center">No employees found</td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id} className="border-t">
                    <td className="p-4">
                      <strong>{emp.name}</strong>
                      <div className="text-xs text-gray-400">{emp.id}</div>
                    </td>

                    <td className="p-4">
                      {emp.designation}
                      <div className="text-xs text-gray-400">{emp.type}</div>
                    </td>

                    <td className="p-4">{emp.joiningDate}</td>

                    <td className="p-4">
                      {emp.visaType === "expired" && (
                        <span className="text-red-500">Expired</span>
                      )}
                      {emp.visaType === "expiring" && (
                        <span className="text-orange-500">
                          Expiring in {emp.visaDays} days
                        </span>
                      )}
                      {emp.visaType === "valid" && (
                        <span className="text-green-600">
                          Valid till {emp.visaStatus}
                        </span>
                      )}
                    </td>

                    <td className="p-4">{emp.totalExperience}</td>

                    <td className="p-4 text-center">
                      {emp.idProof ? (
                        <button onClick={() => setPreviewImage(emp.idProof)}>
                          <EyeIcon />
                        </button>
                      ) : (
                        <span className="text-red-500">Missing</span>
                      )}
                    </td>

                    <td className="p-4 flex gap-3">
                      <button onClick={() => handleEdit(emp)}>
                        <EditIcon />
                      </button>

                      <button onClick={() => handleDelete(emp.id)}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* IMAGE PREVIEW */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center"
        >
          <img
            src={previewImage}
            alt="ID Proof"
            className="max-h-[80%] max-w-[80%] rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
