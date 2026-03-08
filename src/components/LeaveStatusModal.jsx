import React from "react";
import { ChevronRight } from "lucide-react";
import user from "../assets/user1.png";
import calendar from "../assets/calendar.png";

const LeaveStatusModal = ({ leave, onClose, onUpdate }) => {
  const updateStatus = async (status) => {
    await fetch(`http://localhost:5000/api/leave/${leave.id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-[#F9FAFB] w-[770px] rounded-2xl shadow-xl px-6 py-5 flex flex-col justify-between">
        {/* TOP SECTION */}
        <div>
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            {/* EMPLOYEE CARD */}
            <div className="flex items-center gap-3 border border-gray-200 bg-white rounded-xl px-4 py-2 w-[260px]">
              <img src={user} className="w-9 h-9 rounded-full object-cover" />

              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">
                  {leave.Employee?.name}
                </div>

                <div className="text-xs text-gray-400">
                  IN{leave.employeeId}
                </div>
              </div>

              <ChevronRight size={18} className="text-gray-400" />
            </div>

            {/* DESIGNATION */}
            <div>
              <div className="text-sm text-gray-800">
                {leave.Employee?.designation}
              </div>

              <div className="text-xs text-gray-400">Payroll</div>
            </div>

            {/* VISA */}
            <div className="text-right">
              <div className="text-sm font-medium text-green-600">
                {leave.Employee?.visaExpiringOn}
              </div>

              <div className="text-xs text-gray-400">Visa Expiring On</div>

              <div className="mt-2">
                {leave.status === "Pending" && (
                  <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-md">
                    Pending
                  </span>
                )}

                {leave.status === "Approved" && (
                  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">
                    Approved
                  </span>
                )}

                {leave.status === "Rejected" && (
                  <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-md">
                    Rejected
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* DATE SECTION */}
          <div className="grid grid-cols-3 gap-6 mb-5">
            {/* FROM DATE */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                From Date
              </label>

              <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800 flex justify-between items-center">
                {leave.fromDate}
                <img src={calendar} className="w-4 h-4 opacity-60" />
              </div>
            </div>

            {/* TO DATE */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                To Date
              </label>

              <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800 flex justify-between items-center">
                {leave.toDate}
                <img src={calendar} className="w-4 h-4 opacity-60" />
              </div>
            </div>

            {/* TOTAL DAYS */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Total Days
              </label>

              <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800">
                {leave.totalDays} Days
              </div>
            </div>
          </div>

          {/* REMARK */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Reason</label>

            <div className="w-full bg-[#F1F3F5] rounded-xl px-4 py-4 text-sm text-gray-700 h-[85px]">
              {leave.remark}
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 pt-4">
          <button
            onClick={onClose}
            className="px-10 py-2 border border-gray-300 rounded-xl text-sm bg-white"
          >
            Cancel
          </button>

          <button
            onClick={() => updateStatus("Rejected")}
            className="px-10 py-2 bg-red-500 text-white rounded-xl text-sm"
          >
            Reject
          </button>

          <button
            onClick={() => updateStatus("Approved")}
            className="px-10 py-2 bg-green-600 text-white rounded-xl text-sm"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveStatusModal;
