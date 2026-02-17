import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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
   
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ================= VALIDATION =================
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.mobile) newErrors.mobile = "Mobile is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.dob) newErrors.dob = "DOB is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.designation) newErrors.designation = "Designation is required";
    if (!formData.visaStatus) newErrors.visaStatus = "Visa status is required";
    if (!formData.idProof) newErrors.idProof = "ID proof is required";
    if (!formData.employeePicture) newErrors.employeePicture = "Employee picture is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= INPUT HANDLER =================
  const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));

  if (errors[name]) {
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
  }
};


  // ================= FILE HANDLER =================
const handleFileChange = (e, fieldName) => {
  const file = e.target.files[0];

  if (file) {
    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: "Only JPG and PNG files are allowed"
      }));
      return;
    }

    // ✅ STORE FILE OBJECT NOT FILE NAME
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));

    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: "" }));
    }
  }
};

  // ================= SUBMIT =================
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setLoading(true);

  try {
    const data = new FormData();

    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );

    if (response.data.success) {
      toast.success("Employee registered successfully!");
      navigate("/login");
    }

  } catch (error) {
    if (error.response?.data?.errors) {
      const backendErrors = {};
      error.response.data.errors.forEach(err => {
        backendErrors[err.field] = err.message;
      });
      setErrors(backendErrors);
    } else {
      toast.error("Something went wrong");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Register New Employee
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <Input label="Name*" name="name" value={formData.name} onChange={handleChange} error={errors.name}/>
          <Input label="Mobile*" name="mobile" value={formData.mobile} onChange={handleChange} error={errors.mobile}/>
          <Input label="Email*" name="email" value={formData.email} onChange={handleChange} error={errors.email}/>
          <DateInput label="DOB*" name="dob" value={formData.dob} onChange={handleChange} error={errors.dob}/>
          <Input label="Address*" name="address" value={formData.address} onChange={handleChange} error={errors.address}/>
          <Input label="Zip Code*" name="zipCode" value={formData.zipCode} onChange={handleChange} error={errors.zipCode}/>

          <SelectField
            label="Type*"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={["Payroll", "staff", "Contract"]}
            error={errors.type}
          />

          <Input label="Designation*" name="designation" value={formData.designation} onChange={handleChange} error={errors.designation}/>

          <SelectField
            label="Visa Status*"
            name="visaStatus"
            value={formData.visaStatus}
            onChange={handleChange}
            options={["Citizen", "Green Card", "H1B", "L1", "OPT", "Other"]}
            error={errors.visaStatus}
          />

          <DateInput label="Visa Expiry" name="visaExpiringOn" value={formData.visaExpiringOn} onChange={handleChange} error={errors.visaExpiringOn}/>


          <PasswordInput label="Password*" name="password" value={formData.password} onChange={handleChange}
            showPassword={showPassword} setShowPassword={setShowPassword} error={errors.password}/>

          <PasswordInput label="Confirm Password*" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
            showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} error={errors.confirmPassword}/>

          <FileUpload label="ID Proof*" onChange={(e)=>handleFileChange(e,"idProof")} error={errors.idProof}/>
          <FileUpload label="Employee Picture*" onChange={(e)=>handleFileChange(e,"employeePicture")} error={errors.employeePicture}/>

          <div className="col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2 bg-black text-white rounded-lg"
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


// ================= REUSABLE COMPONENTS =================

const Input = ({ label, name, value, onChange, error }) => (
  <div>
    <label>{label}</label>
    <input name={name} value={value} onChange={onChange}
      className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}
      className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`}>
      <option value="">Select option</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const DateInput = ({ label, name, value, onChange, error }) => (
  <div>
    <label>{label}</label>
    <input type="date" name={name} value={value} onChange={onChange}
      className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const PasswordInput = ({ label, name, value, onChange, showPassword, setShowPassword, error }) => (
  <div>
    <label>{label}</label>
    <div className="relative">
      <input type={showPassword ? "text" : "password"} name={name} value={value} onChange={onChange}
        className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`}
      />
      <button type="button" onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-2">
        {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
      </button>
    </div>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const FileUpload = ({ label, onChange, error }) => (
  <div>
    <label>{label}</label>
    <input
      type="file"
      accept=".jpg,.jpeg,.png"
      onChange={onChange}
      className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);
