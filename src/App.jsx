import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Employees from "./components/Employees";
import Dashboard from "./components/Dashboard";
import Holidays from "./components/Holidays";
import RegisterEmployeeModal from "./components/RegisterEmployeeModal";
import EmployeesPage from "./components/EmployeeDashboard";
import AdminPanel from "./components/AdminPortal";
import Attendance from "./components/Attendance";
import AttendanceModal from "./components/AttendanceModal";
import LeaveModal from "./components/LeaveModal";
import HolidaysModal from "./components/HolidaysModal";
import Meeting from "./components/Meeting";
import MeetingModal from "./components/MeetingModal";
import Demo from "./components/Demo";
import Leave from "./components/Leave";
import EmployeeHoliday from "./components/EmployeeHoliday";
import EmployeeMeeting from "./components/EmployeeMeeting";
import EmployeeAttendance from "./components/EmployeeAttendance";
import EmployeeLeave from "./components/EmployeeLeave";
import { Toaster } from "react-hot-toast";

// Protected Route Component
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
        {/* Default route */}
        <Route path="/" element={<Login />} />
        <Route
          path="/RegisterEmployeeModal"
          element={<RegisterEmployeeModal />}
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
          path="/meeting"
          element={
            <ProtectedRoute>
              <Meeting />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/AttendanceModal" element={<AttendanceModal />} />
        <Route path="/LeaveModal" element={<LeaveModal />} />
        <Route path="/HolidayModal" element={<HolidaysModal />} />
        <Route path="/MeetingModal" element={<MeetingModal />} />
        <Route path="/Leave" element={<Leave />} />
        <Route path="/register" element={<RegisterEmployeeModal />} />

        {/*  */}
        <Route path="/employee-holiday" element={<EmployeeHoliday />} />
        <Route path="/employee-meeting" element={<EmployeeMeeting />} />
        <Route path="/employee-leave" element={<EmployeeLeave />} />
        <Route path="/employee-attendance" element={<EmployeeAttendance />} />

        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute>
              <EmployeesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
