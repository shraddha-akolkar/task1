import React, { useRef } from "react";
import { ChevronRight } from "lucide-react";
import calendar from "../assets/calendar.png";

const MeetingModal = ({ onClose }) => {
  const dateRef = useRef(null);
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      {/* FORM */}
      <form className="bg-[#F9FAFB] w-[720px] h-[370px] rounded-2xl shadow-xl px-5 py-4 flex flex-col justify-between">
        {/* TITLE */}
        <h2 className="text-[18px] font-semibold text-center text-gray-800">
          Apply For Meeting
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-2 mt-2">
          {/* CLIENT NAME */}
          <div>
            <label className="block text-[11px] text-gray-600 mb-1">
              Client Name*
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-[13px] outline-none"
            />
          </div>

          {/* EMPLOYEE */}
          <div>
            <label className="block text-[11px] text-gray-600 mb-1">
              Employee*
            </label>

            <div className="bg-[#F1F3F5] rounded-lg px-3 py-1.5 flex items-center justify-between text-[13px] text-gray-500">
              Select Employee
              <ChevronRight size={14} />
            </div>
          </div>

          {/* CLIENT ADDRESS */}
          <div className="col-span-2">
            <label className="block text-[11px] text-gray-600 mb-1">
              Client Address*
            </label>

            <div className="bg-[#F1F3F5] rounded-lg px-3 py-1.5 flex items-center justify-between text-[13px] text-gray-500">
              Enter address
              <ChevronRight size={14} />
            </div>
          </div>

          {/* DAY TYPE */}
          {/* DAY TYPE + SHIFT TYPE + DATE IN ONE ROW */}
          <div className="col-span-2 grid grid-cols-3 gap-4">
            {/* DAY TYPE */}
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">
                Day Type*
              </label>

              <div className="bg-[#F1F3F5] rounded-lg px-3 py-1.5 flex items-center justify-between text-[13px] text-gray-700">
                Half Day
                <ChevronRight size={14} />
              </div>
            </div>

            {/* SHIFT TYPE */}
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">
                Shift Type*
              </label>

              <div className="bg-[#F1F3F5] rounded-lg px-3 py-1.5 flex items-center justify-between text-[13px] text-gray-700">
                Second Half
                <ChevronRight size={14} />
              </div>
            </div>

            {/* DATE */}
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">
                Date
              </label>

              <div className="relative">
                <input
                  ref={dateRef}
                  type="date"
                  className="w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 pr-8 text-[13px] outline-none"
                />

                <img
                  src={calendar}
                  alt="calendar"
                  onClick={() => dateRef.current?.showPicker?.()}
                  className="text-gray-700 absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div className="col-span-2">
            <label className="block text-[11px] text-gray-600 mb-1">
              Services*
            </label>

            <div className="bg-[#F1F3F5] rounded-lg px-3 py-1.5 flex items-center justify-between text-[13px] text-gray-500">
              Select service
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-1.5 border border-gray-300 rounded-xl text-[13px] bg-white hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-10 py-1.5 bg-black text-white rounded-xl text-[13px] hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingModal;
