import React, { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import user from "../assets/user1.png";
import calender from "../assets/calendar.png";

const LeaveApplicationModal = ({ onClose }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [remark, setRemark] = useState("");

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const calculateDays = () => {
    if (!fromDate || !toDate) return 0;

    const start = new Date(fromDate);
    const end = new Date(toDate);

    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24) + 1;

    return diffDays > 0 ? diffDays : 0;
  };

  const totalDays = calculateDays();

  /* SUBMIT FUNCTION */
  const handleSubmit = async () => {
    if (!fromDate || !toDate || !remark) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/leave/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: localStorage.getItem("id"),
          fromDate,
          toDate,
          remark,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Leave applied successfully");
        onClose();
      } else {
        alert(data.message || "Error submitting leave");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-[#F9FAFB] w-[770px] rounded-2xl shadow-xl px-6 py-5 flex flex-col justify-between">
        {/* TOP SECTION */}
        <div>
          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 border border-gray-200 bg-white rounded-xl px-4 py-2 w-[260px]">
              <img
                src={user}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  Omar Al-Farsi
                </div>
                <div className="text-xs text-gray-400">EM01</div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            <div>
              <div className="text-sm text-gray-800">Interior Designer</div>
              <div className="text-xs text-gray-400">Payroll</div>
            </div>

            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">39</div>
              <div className="text-xs text-gray-400">
                Leaves taken this Year
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-green-600">
                31 Oct 2026
              </div>
              <div className="text-xs text-gray-400">Visa Expiring On</div>
            </div>
          </div>

          {/* DATE ROW */}
          <div className="grid grid-cols-3 gap-6 mb-5">
            {/* FROM DATE */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                From Date
              </label>

              <div className="relative">
                <input
                  ref={fromRef}
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800 outline-none appearance-none"
                />

                <img
                  src={calender}
                  alt="calendar"
                  className="w-4 h-4 absolute right-3 top-3 cursor-pointer"
                  onClick={() => fromRef.current.showPicker()}
                />
              </div>
            </div>

            {/* TO DATE */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                To Date
              </label>

              <div className="relative">
                <input
                  ref={toRef}
                  type="date"
                  value={toDate}
                  min={fromDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800 outline-none appearance-none"
                />

                <img
                  src={calender}
                  alt="calendar"
                  className="w-4 h-4 absolute right-3 top-3 cursor-pointer"
                  onClick={() => toRef.current.showPicker()}
                />
              </div>
            </div>

            {/* TOTAL DAYS */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Total Days
              </label>

              <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800">
                {totalDays} Days
              </div>
            </div>
          </div>

          {/* REASON */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Reason*</label>

            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter reason"
              className="w-full bg-[#F1F3F5] rounded-xl px-4 py-4 text-sm text-gray-700 h-[85px] resize-none outline-none"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 pt-4">
          <button
            onClick={onClose}
            className="px-10 py-2 border border-gray-300 rounded-xl text-sm bg-white hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-14 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationModal;
