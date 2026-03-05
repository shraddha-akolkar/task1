import React, { useRef, useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import calendar from "../assets/calendar.png";

const MeetingModal = ({ onClose, meetingData, refreshMeetings }) => {
  const dateRef = useRef(null);

  const [clientName, setClientName] = useState("");
  const [employee, setEmployee] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [dayType, setDayType] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [date, setDate] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (meetingData) {
        await fetch(`http://localhost:5000/api/meetings/${meetingData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientName,
            employee,
            clientAddress,
            dayType,
            shiftType,
            date,
            service,
          }),
        });
      } else {
        await fetch("http://localhost:5000/api/meetings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clientName,
            employee,
            clientAddress,
            dayType,
            shiftType,
            date,
            service,
          }),
        });
      }

      refreshMeetings();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (meetingData) {
      setClientName(meetingData.clientName || "");
      setEmployee(meetingData.employee || "");
      setClientAddress(meetingData.clientAddress || "");
      setDayType(meetingData.dayType || "");
      setShiftType(meetingData.shiftType || "");
      setDate(meetingData.date || "");
      setService(meetingData.service || "");
    }
  }, [meetingData]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F9FAFB] w-[720px] h-[370px] rounded-2xl shadow-xl px-5 py-4 flex flex-col justify-between"
      >
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
              placeholder="Please Enter Client Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className=" text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-[13px]"
            />
          </div>

          {/* EMPLOYEE */}
          <div>
            <label className="block text-[11px] text-gray-600 mb-1">
              Employee*
            </label>
            <input
              type="text"
              placeholder="Please Enter Employee Name"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-[13px]"
            />
          </div>

          {/* CLIENT ADDRESS */}
          <div className="col-span-2">
            <label className="block text-[11px] text-gray-600 mb-1">
              Client Address*
            </label>
            <input
              type="text"
              placeholder="Please Enter Client Address"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-[13px]"
            />
          </div>

          {/* DAY TYPE + SHIFT TYPE + DATE */}
          <div className="col-span-2 grid grid-cols-3 gap-4">
            {/* DAY TYPE */}
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">
                Day Type*
              </label>
              <select
                value={dayType}
                onChange={(e) => setDayType(e.target.value)}
                className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-[13px]"
              >
                <option value="">Select Day Type</option>
                <option value="Half Day">Half Day</option>
                <option value="Full Day">Full Day</option>
              </select>
            </div>

            {/* SHIFT TYPE */}
            <div>
              <label className="block text-[11px] text-gray-600 mb-1">
                Shift Type*
              </label>
              <select
                value={shiftType}
                onChange={(e) => setShiftType(e.target.value)}
                className=" text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-[13px]"
              >
                <option value="">Select Shift Type</option>
                <option value="First Half">First Half</option>
                <option value="Second Half">Second Half</option>
              </select>
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
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 pr-8 text-[13px]"
                />

                <img
                  src={calendar}
                  alt="calendar"
                  onClick={() => dateRef.current?.showPicker?.()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div className="col-span-2">
            <label className="block text-[11px] text-gray-600 mb-1">
              Services*
            </label>

            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder="Enter service"
              className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-[13px]"
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-1.5 border border-gray-300 rounded-xl text-[13px] bg-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-10 py-1.5 bg-black text-white rounded-xl text-[13px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingModal;
