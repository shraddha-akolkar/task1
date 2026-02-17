import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Employees from "./components/Employees";
import Dashboard from "./components/Dashboard";
import RegisterEmployeeModal from "./components/RegisterEmployeeModal";
import EmployeesPage from "./components/EmployeeDashboard";
import {Toaster} from "react-hot-toast";
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
      <Toaster position="top-right" reverseOrder={false}/>
    <Routes>
      {/* Default route - opens Register page */}
      <Route path="/" element={<RegisterEmployeeModal />} />
      
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/employees" 
        element={
          <ProtectedRoute>
            <Employees />
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
      
      <Route path="/register" element={<RegisterEmployeeModal />} />
      <Route path="/employee-dashboard" element={<EmployeesPage />} />
      
    </Routes>
    </>
  );
}

export default App;