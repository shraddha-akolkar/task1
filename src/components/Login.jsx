import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/bg.png";
import logo from "../assets/Logo.png";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    employeeId: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    // Employee ID validation
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    } else if (!/^[A-Z0-9]{4,10}$/i.test(formData.employeeId)) {
      newErrors.employeeId = "Employee ID must be 4-10 alphanumeric characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For employeeId, convert to uppercase
    const newValue = name === "employeeId" ? value.toUpperCase() : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Clear errors
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("employeeData", JSON.stringify(response.data.data));
        
        // Redirect to dashboard
        toast.success("Login successful! Redirecting to dashboard...");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed: " + (error.response?.data?.message || "Network error"));
      if (error.response?.data?.errors) {
        
        // Backend validation errors
        const backendErrors = {};
        
        error.response.data.errors.forEach(err => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
      } else if (error.response?.data?.message) {
        // Login error (wrong credentials, inactive account, etc.)
        setApiError(error.response.data.message);
      } else {
        setApiError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Card */}
      <div className="w-[420px] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-10 mb-2" />
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome to OPM
          </h2>
        </div>

        {/* API Error Message */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {apiError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Employee ID */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Employee ID*
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter employee ID"
              className={`w-full mt-1 bg-gray-100 border ${
                errors.employeeId ? "border-red-500" : "border-gray-200"
              } rounded-lg px-4 py-2 focus:outline-none focus:border-black uppercase`}
              disabled={loading}
            />
            {errors.employeeId && (
              <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700 font-medium">
              Password*
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full mt-1 bg-gray-100 border ${
                errors.password ? "border-red-500" : "border-gray-200"
              } rounded-lg px-4 py-2 focus:outline-none focus:border-black`}
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>

        </form>

        {/* Optional: Forgot Password Link */}
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-gray-600 hover:text-black transition">
            Forgot Password?
          </a>
        </div>

      </div>
    </div>
  );
};

export default Login;