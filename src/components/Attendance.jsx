import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import RegisterEmployeeModal from "./RegisterEmployeeModal";

import {
  LayoutDashboard,
  UserCog,
  UsersRound,
  User,
  CalendarDays,
} from "lucide-react";

const Attendance = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* TOP HEADER BAR */}
      <div className="flex justify-end items-center gap-3 px-4 pt-4 pb-1">

        <button
          className="cursor-pointer hover:text-gray-800 transition-colors"
          onClick={() => navigate("/adminportal")}
        >
          <LayoutDashboard size={15} />
        </button>

        <div className="flex items-center gap-3 text-gray-500">

          <div className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
            <UserCog size={18} />
            Attendance
          </div>

          <UsersRound
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
            onClick={() => setShowModal(true)}
          />

          <User size={18} className="cursor-pointer hover:text-gray-800 transition-colors" />
          <CalendarDays size={18} className="cursor-pointer hover:text-gray-800 transition-colors" />
        </div>

        <span className="text-sm font-medium text-gray-700">Admin</span>
      </div>

    
      {showModal && (
        <RegisterEmployeeModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Attendance;