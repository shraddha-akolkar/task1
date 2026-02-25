import React, { useState, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import calender from "../assets/calendar.png";
import inbox from "../assets/inbox.png";

const RegisterEmployeeModal = ({ onClose, refresh }) => {
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
    confirmPassword: "",
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

    if (formData.dob) {
      const age =
        new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 18) newErrors.dob = "Employee must be at least 18 years old";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Minimum 8 characters, 1 Uppercase & 1 Special Character";
    }

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

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Only JPG, PNG, WEBP allowed",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [fieldName]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios
      .post("http://localhost:5000/api/auth/register", data)
      .then((response) => {
        if (response.data.success) {
          toast.success("Employee registered successfully!");
          onClose();
          refresh();
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center z-50">
      <div className="bg-white w-[660px] rounded-2xl shadow-lg px-5 py-3 flex flex-col">
        {/* TITLE */}
        <h2 className="text-[17px] font-medium text-center mb-4">
          Register New Employee
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* FORM AREA */}
          <div className="space-y-1.5 text-[11px]">
            {/* ROW 1 */}
            <div className="grid grid-cols-4 gap-2">
              <Input
                label="Name*"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Input
                label="Mobile*"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                error={errors.mobile}
              />
              <Input
                label="Email*"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <DateInput
                label="DOB*"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                error={errors.dob}
              />
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-3">
                <Input
                  label="Address*"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                />
              </div>
              <Input
                label="Zip code*"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                error={errors.zipCode}
              />
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-2 gap-2">
              <SelectField
                label="Type*"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={["Payroll", "Staff", "Contract"]}
                error={errors.type}
              />
              <Input
                label="Designation*"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                error={errors.designation}
              />
            </div>

            {/* ROW 4 */}
            <div className="grid grid-cols-2 gap-2">
              <SelectField
                label="Visa Status*"
                name="visaStatus"
                value={formData.visaStatus}
                onChange={handleChange}
                options={["Citizen", "Green Card", "H1B", "L1", "OPT"]}
                error={errors.visaStatus}
              />
              <DateInput
                label="Visa Expiring On*"
                name="visaExpiringOn"
                value={formData.visaExpiringOn}
                onChange={handleChange}
              />
            </div>

            {/* PASSWORD */}
            <div className="grid grid-cols-2 gap-2">
              <PasswordInput
                label="Password*"
                name="password"
                value={formData.password}
                onChange={handleChange}
                show={showPassword}
                setShow={setShowPassword}
                error={errors.password}
              />
              <PasswordInput
                label="Confirm Password*"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                show={showConfirmPassword}
                setShow={setShowConfirmPassword}
                error={errors.confirmPassword}
              />
            </div>

            {/* FILES */}
            <div className="grid grid-cols-2 gap-2">
              <FileUpload
                label="ID Proof*"
                onChange={(e) => handleFileChange(e, "idProof")}
                error={errors.idProof}
              />
              <FileUpload
                label="Employee Picture*"
                onChange={(e) => handleFileChange(e, "employeePicture")}
                error={errors.employeePicture}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-3 pt-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-1 border border-gray-400 rounded-lg text-[12px] hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-7 py-1 bg-black text-white rounded-lg text-[12px] hover:bg-gray-800 transition"
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

/* REUSABLE COMPONENTS */

const Input = ({ label, name, value, onChange, error }) => (
  <div>
    <label className="block mb-0.5 text-[11px] font-normal text-gray-700">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded-md px-2 py-1 text-[11px] outline-none ${
        error ? "border-red-500" : "border-gray-300 bg-[#FAFAFA]"
      }`}
    />
    {error && <p className="text-red-500 text-[10px] mt-0.5">{error}</p>}
  </div>
);

const SelectField = ({ label, name, value, onChange, options, error }) => (
  <div>
    <label className="block mb-0.5 text-[11px] font-normal text-gray-700">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full border rounded-md px-2 py-1 text-[11px] outline-none ${
        error ? "border-red-500" : "border-gray-300 bg-[#FAFAFA]"
      }`}
    >
      <option value="">Select option</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-[10px] mt-0.5">{error}</p>}
  </div>
);

const DateInput = ({ label, name, value, onChange, error }) => {
  const dateRef = useRef(null);

  return (
    <div>
      <label className="block mb-0.5 text-[11px] font-normal text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          ref={dateRef}
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full border rounded-md px-2 py-1 pr-7 text-[11px] ${
            error ? "border-red-500" : "border-gray-300 bg-[#FAFAFA]"
          }`}
        />
        <img
          src={calender}
          alt="calendar"
          onClick={() => dateRef.current?.showPicker?.()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 cursor-pointer"
        />
      </div>
      {error && <p className="text-red-500 text-[10px] mt-0.5">{error}</p>}
    </div>
  );
};

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  show,
  setShow,
  error,
}) => (
  <div>
    <label className="block mb-0.5 text-[11px] font-normal text-gray-700">
      {label}
    </label>
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded-md px-2 py-1 text-[11px] ${
          error ? "border-red-500" : "border-gray-300 bg-[#FAFAFA]"
        }`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        {show ? <EyeOff size={13} /> : <Eye size={13} />}
      </button>
    </div>
    {error && <p className="text-red-500 text-[10px] mt-0.5">{error}</p>}
  </div>
);

const FileUpload = ({ label, onChange, error }) => {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    onChange(e);
  };

  return (
    <div>
      <label className="block mb-0.5 text-[11px] font-normal text-gray-700">
        {label}
      </label>
      <div
        onClick={() => fileRef.current.click()}
        className={`flex items-center border rounded-md px-2 py-1 cursor-pointer text-[11px] ${
          error ? "border-red-500" : "border-gray-300 bg-[#FAFAFA]"
        }`}
      >
        <img src={inbox} alt="upload" className="w-3.5 h-3.5 mr-1.5" />
        <span className="text-gray-500 truncate">
          {fileName || "(jpg, webp, jpeg, png)"}
        </span>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          ref={fileRef}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500 text-[10px] mt-0.5">{error}</p>}
    </div>
  );
};
