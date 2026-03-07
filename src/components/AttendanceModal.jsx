import React, { useState, useEffect } from "react";
import axios from "axios";
import user from "../assets/user1.png";

const API_BASE_URL = "http://localhost:5000/api";

/* FILE URL HELPER */

function fileUrl(filename) {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `${API_BASE_URL.replace("/api", "")}/uploads/${filename}`;
}

/* EMPLOYEE AVATAR */

function EmployeeAvatar({ emp }) {
  const [imgFailed, setImgFailed] = useState(false);

  const picUrl = fileUrl(emp?.employeePicture);

  if (!picUrl || imgFailed) {
    return <img src={user} className="w-7 h-7 rounded-full object-cover" />;
  }

  return (
    <img
      src={picUrl}
      alt={emp?.name}
      className="w-7 h-7 rounded-full object-cover"
      onError={() => setImgFailed(true)}
    />
  );
}

function formatTime(time) {
  if (!time) return "-";

  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

const AttendanceModal = ({ onClose, editData, refreshData }) => {
  const [inTime, setInTime] = useState("");
  const [outTime, setOutTime] = useState("");
  const [duration, setDuration] = useState("--:--");
  const [overtime, setOvertime] = useState("--:--");

  useEffect(() => {
    if (editData) {
      const start = editData.inTime?.slice(0, 5) || "";
      const end =
        editData.outTime && editData.outTime !== "00:00:00"
          ? editData.outTime.slice(0, 5)
          : "";

      setInTime(start);
      setOutTime(end);

      if (start && end) {
        calculateTime(start, end);
      }
    }
  }, [editData]);

  const calculateTime = (start, end) => {
    if (!start || !end) return;

    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    const diffMinutes = Math.floor((endTime - startTime) / 60000);

    if (diffMinutes < 0) return;

    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    setDuration(`${hours}h ${minutes}mins`);

    if (diffMinutes > 480) {
      const ot = diffMinutes - 480;
      const otH = Math.floor(ot / 60);
      const otM = ot % 60;

      setOvertime(`${otH}h ${otM}mins`);
    } else {
      setOvertime("0h 0mins");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inTime || !outTime) {
      alert("Please select In Time and Out Time");
      return;
    }

    try {
      if (editData) {
        await axios.put(`http://localhost:5000/api/attendance/${editData.id}`, {
          inTime,
          outTime,
        });

        alert("Attendance Updated Successfully");
      } else {
        await axios.post("http://localhost:5000/api/attendance/scan", {
          employeeId: editData.employeeId,
          inTime,
          outTime,
        });

        alert("Attendance Added Successfully");
      }

      refreshData();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error saving attendance");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F9FAFB] w-[540px] rounded-2xl shadow-xl px-4 py-3 flex flex-col"
      >
        {/* HEADER */}

        <div className="flex items-center justify-between border border-gray-200 rounded-xl px-3 py-1.5 bg-white mb-2">
          <div className="flex items-center gap-2">
            <EmployeeAvatar emp={editData?.Employee} />

            <div>
              <div className="text-sm font-medium text-gray-800">
                {editData?.Employee?.name || "-"}
              </div>

              <div className="text-[10px] text-gray-400">
                {editData?.Employee?.id ? `EM${editData.Employee.id}` : "-"}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-800">
              {editData?.Employee?.designation || "-"}
            </div>

            <div className="text-[10px] text-gray-400">
              {editData?.Employee?.type || "-"}
            </div>
          </div>
        </div>

        {/* DATE */}

        <div className="mb-2">
          <label className="block text-[11px] text-gray-500 mb-0.5">Date</label>
          <input
            type="text"
            value={editData?.date || ""}
            readOnly
            className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
          />
        </div>

        {/* GRID */}

        <div className="text-gray-600 grid grid-cols-2 gap-x-4 gap-y-2 mb-2">
          <div>
            <label className="block text-[11px] text-gray-500 mb-0.5">
              In Time
            </label>

            <input
              type="time"
              value={inTime}
              onChange={(e) => {
                setInTime(e.target.value);
                calculateTime(e.target.value, outTime);
              }}
              className="bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm w-full outline-none"
            />

            <div className="text-[11px] text-gray-400 mt-1">
              {formatTime(inTime)}
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-gray-500 mb-0.5">
              Out Time
            </label>

            <input
              type="time"
              value={outTime}
              onChange={(e) => {
                setOutTime(e.target.value);
                calculateTime(inTime, e.target.value);
              }}
              className="bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm w-full outline-none"
            />

            <div className="text-[11px] text-gray-400 mt-1">
              {formatTime(outTime)}
            </div>
          </div>

          <Field label="Overtime" value={overtime} />
          <Field label="Total Duration" value={duration} />
        </div>

        {/* TYPE */}

        <div className="mb-2">
          <label className="block text-[11px] text-gray-500 mb-0.5">Type</label>

          <input
            type="text"
            value={editData?.Employee?.type || ""}
            readOnly
            className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
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
