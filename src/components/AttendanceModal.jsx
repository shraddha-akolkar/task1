import React from "react";
import user from "../assets/user1.png";
import { ChevronRight } from "lucide-react";

const AttendanceModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-[#F9FAFB] w-[550px] h-[460px] rounded-2xl shadow-xl px-5 py-4 flex flex-col justify-between">
        {/* TOP SECTION */}
        <div>
          {/* HEADER */}
          <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2 bg-white mb-3">
            <div className="flex items-center gap-2">
              <img
                src={user}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium text-gray-800">
                  Omar Al-Farsi
                </div>
                <div className="text-[10px] text-gray-400">EM01</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-800">Interior Designer</div>
              <div className="text-[10px] text-gray-400">Payroll</div>
            </div>
          </div>

          {/* DATE */}
          <div className="mb-3">
            <label className="block text-[11px] text-gray-500 mb-1">Date</label>
            <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800">
              Thu, 16 Oct 2025
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-3">
            <Field label="In Time" value="09:32 AM" />
            <Field label="Out Time" value="08:53 AM" />

            <Field label="Overtime" value="02h 28mins" />
            <Field label="Total Duration" value="11h 16mins" />

            {/* TYPE WITH TAGS + ARROW */}
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                Type
              </label>
              <div className="bg-[#F1F3F5] rounded-lg px-3 py-2 text-sm flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-white px-2 py-1 rounded-md text-xs border">
                    On Site ✕
                  </span>
                  <span className="bg-white px-2 py-1 rounded-md text-xs border">
                    In Factory ✕
                  </span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </div>

            {/* HALF DAY WITH ARROW */}
            <div>
              <label className="block text-[11px] text-gray-500 mb-1">
                Half Day
              </label>
              <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm flex justify-between items-center text-gray-400">
                NA
                <ChevronRight size={16} />
              </div>
            </div>
          </div>

          {/* REDUCTION */}
          <div className="mb-3">
            <label className="block text-[11px] text-gray-500 mb-1">
              Reduction In Total Hours
            </label>
            <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800">
              01h 15mins
            </div>
          </div>

          {/* REMARK (LARGER) */}
          <div>
            <label className="block text-[11px] text-gray-500 mb-1">
              Remark
            </label>
            <div className="bg-[#F1F3F5] rounded-xl px-4 py-4 text-sm text-gray-400 h-[70px]">
              Enter remark
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={onClose}
            className="px-10 py-2 border border-gray-300 rounded-xl text-sm bg-white hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button className="px-12 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }) => (
  <div>
    <label className="block text-[11px] text-gray-500 mb-1">{label}</label>
    <div className="bg-[#F1F3F5] rounded-lg px-4 py-2 text-sm text-gray-800">
      {value}
    </div>
  </div>
);

export default AttendanceModal;
