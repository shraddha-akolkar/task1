import React from "react";
import logo from "../assets/Logo.png"; 

const EmployeePortal = [
  {
    name: "Sarang Sharma",
    id: "EM15",
    designation: "Project Manager",
    type: "Payroll",
    joining: "01 Jan 19",
    visa: "31 Dec 2026",
    status: "active",
    experience: "7 Yrs 10 M",
    leaves: 23,
  },
  {
    name: "Omar Al-Farsi",
    id: "EM01",
    designation: "Interior Designer",
    type: "Contract",
    joining: "20 Mar 2021",
    visa: "Expiring",
    status: "expiring",
    experience: "4 Yrs 7 M",
    leaves: 19,
  },
];

const Employees = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Top Navbar */}
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
    </div>
  );
};

export default Employees;
