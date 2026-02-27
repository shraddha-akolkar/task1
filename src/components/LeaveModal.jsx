import React from "react";
import user from "../assets/user1.png";
import { ChevronRight, Calendar } from "lucide-react";

const LeaveModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-[#F9FAFB] w-[770px] h-[365px] rounded-2xl shadow-xl px-6 py-5 flex flex-col justify-between">
        {/* TOP SECTION */}
        <div>
          {/* HEADER ROW */}
          <div className="flex items-center justify-between mb-6">
            {/* EMPLOYEE CARD */}
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

            {/* DESIGNATION */}
            <div>
              <div className="text-sm text-gray-800">Interior Designer</div>
              <div className="text-xs text-gray-400">Payroll</div>
            </div>

            {/* LEAVES TAKEN */}
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">39</div>
              <div className="text-xs text-gray-400">
                Leaves taken this Year
              </div>
            </div>

            {/* VISA */}
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
              <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 flex items-center justify-between text-sm text-gray-800">
                20 Oct 2025
                <Calendar size={16} className="text-gray-400" />
              </div>
            </div>

            {/* TO DATE */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                To Date
              </label>
              <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 flex items-center justify-between text-sm text-gray-800">
                24 Nov 2025
                <Calendar size={16} className="text-gray-400" />
              </div>
            </div>

            {/* TOTAL DAYS */}
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Total Days
              </label>
              <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800">
                34 Days
              </div>
            </div>
          </div>

          {/* REMARK */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Remark*</label>
            <div className="bg-[#F1F3F5] rounded-xl px-4 py-4 text-sm text-gray-400 h-[85px]">
              Enter reason
            </div>
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

          <button className="px-14 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveModal;
