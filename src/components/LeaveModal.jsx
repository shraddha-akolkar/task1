import React from "react";
import user from "../assets/user1.png";

const LeaveModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <div className="bg-[#F9FAFB] w-[550px] h-[460px] rounded-2xl shadow-xl px-5 py-4 flex flex-col justify-between">
        {/* TOP CONTENT */}
        <div>
          {/* HEADER */}
          <div className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-2 bg-white mb-[6px]">
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
          <div className="mb-[6px]">
            <label className="block text-[10px] text-gray-500 mb-[2px]">
              Date
            </label>
            <div className="bg-[#F1F3F5] rounded-lg px-3 py-[6px] text-sm text-gray-800">
              Thu, 16 Oct 2025
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-[6px]">
            <Field label="In Time" value="09:32 AM" />
            <Field label="Out Time" value="08:53 AM" />

            <Field label="Overtime" value="02h 28mins" />
            <Field label="Total Duration" value="11h 16mins" />

            <div>
              <label className="block text-[10px] text-gray-500 mb-[2px]">
                Type
              </label>
              <div className="bg-[#F1F3F5] rounded-lg px-3 py-[6px] text-sm flex justify-between text-gray-800">
                <span>On Site</span>
                <span className="text-gray-400 text-[10px]">In Factory ✕</span>
              </div>
            </div>

            <Field label="Half Day" value="NA" muted />

            {/* <Field label="Reduction In Total Hours" value="01h 15mins" /> */}
          </div>
          <div className="mt-[6px]">
            <label className="block text-[10px] text-gray-500 mb-[2px]">
              Reduction In Total Hours
            </label>
            <div className="mb-2 bg-[#F1F3F5] rounded-lg px-3 py-[6px] text-sm ">
              01h 15mins{" "}
            </div>
          </div>
          {/* REMARK */}
          <div className="mt-[6px]">
            <label className="block text-[10px] text-gray-500 mb-[2px]">
              Remark
            </label>
            <div className="mb-2 bg-[#F1F3F5] rounded-lg px-3 py-[6px] text-sm text-gray-400">
              Enter remark
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="">
          <div className="mb-4  flex justify-center gap-3 pt-[6px]">
            <button
              onClick={onClose}
              className=" px-7 py-1.5 border border-gray-300 rounded-xl text-sm text-gray-700 bg-white hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button className="px-9 py-1.5 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, muted }) => (
  <div>
    <label className="block text-[10px] text-gray-500 mb-[2px]">{label}</label>
    <div
      className={`bg-[#F1F3F5] rounded-lg px-3 py-[6px] text-sm ${
        muted ? "text-gray-400" : "text-gray-800"
      }`}
    >
      {value}
    </div>
  </div>
);

export default LeaveModal;
