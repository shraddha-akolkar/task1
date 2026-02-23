import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterEmployeeModal = ({ onClose }) => {
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

  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "visaExpiringOn")
        newErrors[key] = "This field is required";
    });

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Only JPG and PNG allowed"
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      if (response.data.success) {
        toast.success("Employee registered successfully!");
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-lg relative max-h-[90vh] flex flex-col">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="p-6 pb-2 border-b">
          <h2 className="text-xl font-semibold text-center">
            Register New Employee
          </h2>
        </div>

        <div className="overflow-y-auto p-6 pt-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            <Input label="Name*" name="name" value={formData.name} onChange={handleChange} error={errors.name}/>
            <Input label="Mobile*" name="mobile" value={formData.mobile} onChange={handleChange} error={errors.mobile}/>
            <Input label="Email*" name="email" value={formData.email} onChange={handleChange} error={errors.email}/>
            <DateInput label="DOB*" name="dob" value={formData.dob} onChange={handleChange} error={errors.dob}/>
            <Input label="Address*" name="address" value={formData.address} onChange={handleChange} error={errors.address}/>
            <Input label="Zip Code*" name="zipCode" value={formData.zipCode} onChange={handleChange} error={errors.zipCode}/>

            <SelectField label="Type*" name="type" value={formData.type} onChange={handleChange}
              options={["Payroll", "Staff", "Contract"]} error={errors.type}/>

            <Input label="Designation*" name="designation" value={formData.designation} onChange={handleChange} error={errors.designation}/>

            <SelectField label="Visa Status*" name="visaStatus" value={formData.visaStatus} onChange={handleChange}
              options={["Citizen", "Green Card", "H1B", "L1", "OPT", "Other"]} error={errors.visaStatus}/>

            <DateInput label="Visa Expiry" name="visaExpiringOn" value={formData.visaExpiringOn} onChange={handleChange}/>

            <PasswordInput label="Password*" name="password" value={formData.password}
              onChange={handleChange} showPassword={showPassword}
              setShowPassword={setShowPassword} error={errors.password}/>

            <PasswordInput label="Confirm Password*" name="confirmPassword"
              value={formData.confirmPassword} onChange={handleChange}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              error={errors.confirmPassword}/>

            <FileUpload label="ID Proof*" onChange={(e)=>handleFileChange(e,"idProof")} error={errors.idProof}/>
            <FileUpload label="Employee Picture*" onChange={(e)=>handleFileChange(e,"employeePicture")} error={errors.employeePicture}/>

            <div className="col-span-2 text-center mt-4">
              <button type="submit" disabled={loading}
                className="px-8 py-2 bg-black text-white rounded-lg">
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEmployeeModal;

/* Reusable Components */

const Input = ({ label, name, value, onChange, error }) => (
  <div>
    <label>{label}</label>
    <input name={name} value={value} onChange={onChange}
      className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`} />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}
      className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`}>
      <option value="">Select option</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const DateInput = ({ label, name, value, onChange, error }) => (
  <div>
    <label>{label}</label>
    <input type="date" name={name} value={value} onChange={onChange}
      className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`} />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const PasswordInput = ({ label, name, value, onChange, showPassword, setShowPassword, error }) => (
  <div>
    <label>{label}</label>
    <div className="relative">
      <input type={showPassword ? "text" : "password"} name={name} value={value}
        onChange={onChange}
        className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`} />
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
    <input type="file" accept=".jpg,.jpeg,.png"
      onChange={onChange}
      className={`w-full border rounded px-3 py-1.5 ${error ? "border-red-500" : ""}`} />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);