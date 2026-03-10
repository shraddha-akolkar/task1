import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminPanel from "./components/AdminPortal";
import Attendance from "./components/Attendance";
import EmployeesPage from "./components/EmployeeDashboard";
import Holidays from "./components/Holidays";
import Meeting from "./components/Meeting";
import Leave from "./components/Leave";

import EmployeeHoliday from "./components/EmployeeHoliday";
import EmployeeMeeting from "./components/EmployeeMeeting";
import EmployeeAttendance from "./components/EmployeeAttendance";
import EmployeeLeave from "./components/EmployeeLeave";

import { Toaster } from "react-hot-toast";

/* PROTECTED ROUTE */

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/adminportal"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/holidays"
          element={
            <ProtectedRoute>
              <Holidays />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meeting"
          element={
            <ProtectedRoute>
              <Meeting />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave"
          element={
            <ProtectedRoute>
              <Leave />
            </ProtectedRoute>
          }
        />

        {/* EMPLOYEE ROUTES */}

        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-attendance"
          element={
            <ProtectedRoute>
              <EmployeeAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-leave"
          element={
            <ProtectedRoute>
              <EmployeeLeave />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-holiday"
          element={
            <ProtectedRoute>
              <EmployeeHoliday />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee-meeting"
          element={
            <ProtectedRoute>
              <EmployeeMeeting />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
