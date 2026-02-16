import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ChevronRight, Upload, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterEmployeeModal = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    address: "",
    zipCode: "",
    type: "",
    designation: "",
    visaStatus: "",
    visaExpiringOn: "",
    idProof: "",
    employeePicture: "",
    employeeId: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

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
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // DOB validation
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const age = (Date.now() - new Date(formData.dob).getTime()) / (1000 * 60 * 60 * 24 * 365);
      if (age < 18) {
        newErrors.dob = "Must be at least 18 years old";
      } else if (age > 100) {
        newErrors.dob = "Invalid date of birth";
      }
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Address must be at least 10 characters";
    }

    // Zip code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip code is required";
    } else if (!/^[0-9]{5,6}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Zip code must be 5-6 digits";
    }

    // Type validation
    if (!formData.type) {
      newErrors.type = "Type is required";
    }

    // Designation validation
    if (!formData.designation) {
      newErrors.designation = "Designation is required";
    }

    // Visa Status validation
    if (!formData.visaStatus) {
      newErrors.visaStatus = "Visa status is required";
    }

    // Visa Expiring validation
    if (formData.visaStatus && formData.visaStatus !== "Citizen") {
      if (!formData.visaExpiringOn) {
        newErrors.visaExpiringOn = "Visa expiry date is required";
      } else if (new Date(formData.visaExpiringOn) <= Date.now()) {
        newErrors.visaExpiringOn = "Visa expiry must be in the future";
      }
    }

    // File validations
    if (!formData.idProof) {
      newErrors.idProof = "ID proof is required";
    }

    if (!formData.employeePicture) {
      newErrors.employeePicture = "Employee picture is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For employeeId, convert to uppercase
    const newValue = name === "employeeId" ? value.toUpperCase() : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload to a server/cloud storage
      // For now, we'll store the file name
      setFormData(prev => ({ ...prev, [fieldName]: file.name }));
      
      // Clear error
      if (errors[fieldName]) {
        setErrors(prev => ({ ...prev, [fieldName]: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // First, create employee record
      const employeeResponse = await axios.post("http://localhost:5000/api/users", {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        dob: formData.dob,
        address: formData.address,
        zipCode: formData.zipCode,
        type: formData.type,
        designation: formData.designation,
        visaStatus: formData.visaStatus,
        visaExpiringOn: formData.visaExpiringOn,
        idProof: formData.idProof,
        employeePicture: formData.employeePicture
      });
      
      if (employeeResponse.data.success) {
        // Then, create auth account
        const authResponse = await axios.post("http://localhost:5000/api/auth/register", {
          employeeId: formData.employeeId,
          password: formData.password,
          name: formData.name,
          email: formData.email,
          role: "employee"
        });

        if (authResponse.data.success) {
          toast.success("Employee registered successfully! Redirecting to login...");
          
          // Reset form
          setFormData({
            name: "",
            mobile: "",
            email: "",
            dob: "",
            address: "",
            zipCode: "",
            type: "",
            designation: "",
            visaStatus: "",
            visaExpiringOn: "",
            idProof: "",
            employeePicture: "",
            employeeId: "",
            password: "",
            confirmPassword: ""
          });
          setErrors({});

          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        // Backend validation errors
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
      } else {
        toast.error("Error: " + (error.response?.data?.message || "Something went wrong"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Navigate to login page on cancel
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold text-center mb-4">
          Register New Employee
        </h2>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          
          {/* Personal Information Section */}
          <div className="col-span-2 mt-2 mb-1">
            <h3 className="text-sm font-semibold text-gray-800 border-b pb-1">Personal Information</h3>
          </div>

          <Input 
            label="Name*" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name" 
            error={errors.name}
          />

          <Input 
            label="Mobile*" 
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter number" 
            error={errors.mobile}
          />

          <Input 
            label="Email*" 
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email ID" 
            error={errors.email}
          />

          <DateInput 
            label="DOB*" 
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Enter DOB" 
            error={errors.dob}
          />

          <div className="col-span-2">
            <label className="font-medium text-gray-700">Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              className={`w-full mt-1 bg-gray-100 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-1.5 focus:outline-none`}
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>

          <Input 
            label="Zip code*" 
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter zip code" 
            error={errors.zipCode}
          />

          {/* Employment Information Section */}
          <div className="col-span-2 mt-3 mb-1">
            <h3 className="text-sm font-semibold text-gray-800 border-b pb-1">Employment Information</h3>
          </div>

          <SelectField 
            label="Type*" 
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Select type"
            options={["Full-time", "Part-time", "Contract", "Intern"]}
            error={errors.type}
          />

          <Input 
            label="Designation*" 
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Enter designation" 
            error={errors.designation}
          />

          <SelectField 
            label="Visa Status*" 
            name="visaStatus"
            value={formData.visaStatus}
            onChange={handleChange}
            placeholder="Select status"
            options={["Citizen", "Green Card", "H1B", "L1", "OPT", "Other"]}
            error={errors.visaStatus}
          />

          {formData.visaStatus && formData.visaStatus !== "Citizen" && (
            <DateInput 
              label="Visa Expiring On*" 
              name="visaExpiringOn"
              value={formData.visaExpiringOn}
              onChange={handleChange}
              placeholder="Select date" 
              error={errors.visaExpiringOn}
            />
          )}

          {/* Login Credentials Section */}
          <div className="col-span-2 mt-3 mb-1">
            <h3 className="text-sm font-semibold text-gray-800 border-b pb-1">Login Credentials</h3>
          </div>

          <Input 
            label="Employee ID*" 
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Enter employee ID (4-10 characters)" 
            error={errors.employeeId}
          />

          <PasswordInput 
            label="Password*" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password (min 6 characters)"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={errors.password}
          />

          <PasswordInput 
            label="Confirm Password*" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
            error={errors.confirmPassword}
          />

          {/* Documents Section */}
          <div className="col-span-2 mt-3 mb-1">
            <h3 className="text-sm font-semibold text-gray-800 border-b pb-1">Documents</h3>
          </div>

          <FileUpload 
            label="ID Proof*" 
            name="idProof"
            onChange={(e) => handleFileChange(e, "idProof")}
            error={errors.idProof}
          />

          <FileUpload 
            label="Employee Picture*" 
            name="employeePicture"
            onChange={(e) => handleFileChange(e, "employeePicture")}
            error={errors.employeePicture}
          />

          <div className="col-span-2 flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-8 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterEmployeeModal;

/* ================= Reusable Components ================= */

const Input = ({ label, name, type = "text", value, onChange, placeholder, error }) => (
  <div>
    <label className="font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full mt-1 bg-gray-100 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-1.5 focus:outline-none`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const PasswordInput = ({ label, name, value, onChange, placeholder, showPassword, setShowPassword, error }) => (
  <div>
    <label className="font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-gray-100 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-1.5 pr-10 focus:outline-none`}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const DateInput = ({ label, name, value, onChange, placeholder, error }) => (
  <div>
    <label className="font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-gray-100 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-1.5 focus:outline-none`}
      />
      <Calendar
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, placeholder, options = [], error }) => (
  <div>
    <label className="font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <select 
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-100 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-1.5 appearance-none focus:outline-none`}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <ChevronRight
        size={16}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90 pointer-events-none"
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const FileUpload = ({ label, name, onChange, error }) => (
  <div>
    <label className="font-medium text-gray-700">{label}</label>
    <div className="relative mt-1">
      <input
        type="file"
        name={name}
        onChange={onChange}
        accept="image/*,.pdf"
        className={`w-full bg-gray-100 border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg px-3 py-1.5 text-gray-500 focus:outline-none file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300`}
      />
      <Upload
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);