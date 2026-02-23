import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Employees from "./components/Employees";
import Dashboard from "./components/Dashboard";
import RegisterEmployeeModal from "./components/RegisterEmployeeModal";
import EmployeesPage from "./components/EmployeeDashboard";
import AdminPanel from "./components/AdminPortal";
import Attendance from "./components/Attendance";
import { Toaster } from "react-hot-toast";
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
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

        <Route path="/RegisterEmployeeModal" element={<RegisterEmployeeModal />} />

        {/* <Route 
        path="/employees" 
        element={
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        } 
      /> */}

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

        <Route path="/register" element={<RegisterEmployeeModal />} />
<Route
  path="/employee-dashboard"
  element={
    <ProtectedRoute>
      <EmployeesPage />
    </ProtectedRoute>
  }
/>      </Routes>
    </>
  );
}

export default App;
