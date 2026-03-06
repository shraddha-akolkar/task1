import React from "react";
import user from "../assets/user1.png";
import { ChevronRight } from "lucide-react";

const AttendanceModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <form className="bg-[#F9FAFB] w-[540px] rounded-2xl shadow-xl px-4 py-3 flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-1.5 bg-white mb-2">
          <div className="flex items-center gap-2">
            <img src={user} className="w-7 h-7 rounded-full object-cover" />
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
        <div className="mb-2">
          <label className="block text-[11px] text-gray-500 mb-0.5">Date</label>
          <input
            type="text"
            defaultValue="Thu, 16 Oct 2025"
            className=" text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
          />
        </div>

        {/* GRID */}
        <div className=" text-gray-600 grid grid-cols-2 gap-x-4 gap-y-2 mb-2">
          <Field label="In Time" value="09:32 AM" className=" text-gray-600 " />
          <Field label="Out Time" value="08:53 AM" />
          <Field label="Overtime" value="02h 28mins" />
          <Field label="Total Duration" value="11h 16mins" />

          {/* TYPE */}

          {/* HALF DAY */}
        </div>
        <div className="mb-2">
          <label className="block text-[11px] text-gray-500 mb-0.5">Type</label>
          <input
            type="text"
            defaultValue="Payroll"
            className=" text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
          />
        </div>
        {/* REDUCTION */}
        <div className="mb-2">
          <label className="block text-[11px] text-gray-500 mb-0.5">
            Reduction In Total Hours
          </label>
          <input
            type="text"
            defaultValue="01h 15mins"
            className=" text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
          />
        </div>

        {/* REMARK */}
        <div className="mb-2">
          <label className="block text-[11px] text-gray-500 mb-0.5">
            Remark
          </label>
          <textarea
            placeholder="Enter remark"
            className=" text-gray-600 w-full bg-[#F1F3F5] rounded-xl px-3 py-2 text-sm outline-none h-[55px]"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-1.5 border border-gray-300 rounded-xl text-sm bg-white hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-10 py-1.5 bg-black text-white rounded-xl text-sm hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const Field = ({ label, value }) => (
  <div>
    <label className="block text-[11px] text-gray-500 mb-0.5">{label}</label>
    <div className="bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm text-gray-800">
      {value}
    </div>
  </div>
);

export default AttendanceModal;
