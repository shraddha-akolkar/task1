import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/bg.png";
import logo from "../assets/Logo.png";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.id) {
      newErrors.id = "Employee ID is required";
    } else if (!/^[A-Za-z0-9]+$/.test(formData.id)) {
      newErrors.id = "Employee ID must be alphanumeric";
    } else if (
      !formData.id.toUpperCase().startsWith("ADM") &&
      !formData.id.toUpperCase().startsWith("IN")
    ) {
      newErrors.id = "ID must start with ADM or IN";
    }

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

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (response.data.success) {
        localStorage.setItem("displayId", response.data.data.displayId);
        localStorage.setItem("role", response.data.role);

        toast.success("Login successful!");

        if (response.data.role === "admin") {
          navigate("/adminportal");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed";
      setApiError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-[420px] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-10">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-10 mb-2" />
          <h2 className="text-xl font-semibold text-gray-800">
            Welcome to OPM
          </h2>
        </div>

        {apiError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-gray-700 font-medium">
              Employee ID*
            </label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Enter ID (ADM1 / IN1)"
              className={`w-full mt-1 bg-gray-100 border ${
                errors.id ? "border-red-500" : "border-gray-200"
              } rounded-lg px-4 py-2 focus:outline-none focus:border-black uppercase`}
              disabled={loading}
            />
            {errors.id && (
              <p className="text-red-500 text-xs mt-1">{errors.id}</p>
            )}
          </div>

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

          <button
            type="submit"
            className="w-full mt-4 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;