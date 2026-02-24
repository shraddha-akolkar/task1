import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/lamac.png";
import user1 from "../assets/user1.png";
import {
  Users,
  Bell,
  CalendarDays,
  Umbrella,
  Building2,
  LayoutDashboard,
  UserCog,
  UsersRound,
  User,
} from "lucide-react";

export default function EmployeeDashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-white  px-6 py-3 flex items-center justify-between">
        <img src={logo} className="h-7" />

        <button className="bg-black text-white px-6 py-1.5 rounded-full text-sm">
          Portal
        </button>

        <div className="flex items-center gap-3">
          <img src={user1} className="w-9 h-9 rounded-full" />
          <span className="text-sm font-medium">lamac labor</span>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* ICONS */}
      <div className="flex justify-end items-center gap-3 px-4 pt-4 pb-1">
        <button className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
          <LayoutDashboard size={15} />
          Dashboard
        </button>

        <div className="flex items-center gap-3 text-gray-500">
          <UserCog
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
          />

          <CalendarDays
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
          />

          <Umbrella
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
          />

          <Building2
            size={18}
            className="cursor-pointer hover:text-gray-800 transition-colors"
          />
        </div>
      </div>

      <div className="p-6 grid grid-cols-12 gap-6">
        <div className="col-span-9 space-y-6">
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-5 shadow">
              <p className="text-gray-500 text-sm">In Time</p>
              <p className="text-lg font-semibold">-</p>

              <div className="mt-4 text-center text-2xl font-bold">0h 0m</div>

              <button className="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm w-full">
                Scan In
              </button>
            </div>

            <div className="bg-white rounded-xl p-5 shadow flex flex-col justify-center">
              <p className="text-gray-500">Payroll Employee</p>
              <p className="text-3xl font-bold">8</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow flex flex-col justify-center">
              <p className="text-gray-500">Contract Employee</p>
              <p className="text-3xl font-bold">5</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow flex flex-col justify-center">
              <p className="text-gray-500">On Site</p>
              <p className="text-3xl font-bold">0</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="grid grid-cols-9 font-semibold text-sm border-b pb-3 text-gray-600">
              <div>EMPLOYEE NAME</div>
              <div>DESIGNATION</div>
              <div>DATE</div>
              <div>IN-TIME</div>
              <div>OUT-TIME</div>
              <div>OVERTIME</div>
              <div>DURATION</div>
              <div>TYPE</div>
              <div>REMARK</div>
            </div>

            {/* ROW */}
            <div className="grid grid-cols-9 items-center py-4 border-b text-sm">
              <div className="flex items-center gap-3">
                <img src={user1} className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-medium">lamac labor</p>
                  <p className="text-xs text-gray-400">LM4</p>
                </div>
              </div>
              <div>Labour</div>
              <div>23 Feb 2026</div>
              <div>09:56 AM</div>
              <div>-</div>
              <div>NA</div>
              <div>0m</div>
              <div>
                <span className="bg-lime-100  px-3 py-1 rounded-full text-xs">
                  Staff
                </span>
              </div>
              <div className="text-gray-400">Remark</div>
            </div>
          </div>
        </div>

        {/*PROFILE  */}
        <div className="col-span-3 bg-white rounded-xl shadow p-5">
          <h3 className="font-semibold mb-4">Profile</h3>

          <div className="flex flex-col items-center text-center">
            <img src={user1} className="w-24 h-24 rounded-full " />

            <h4 className="mt-3 font-semibold">Mustafa Chechatwala</h4>

            <p className="text-gray-500 text-sm">
              Associate - Frontend Developer in IT
            </p>

            <p className="text-xs text-gray-400 mt-1">1 Yrs 9 Min Hats-Off</p>
          </div>

          <div className="mt-6 space-y-3 text-sm">
            <p className="flex justify-between">
              05 Dec 25 <span className="text-green-600">Approved</span>
            </p>
            <p className="flex justify-between">
              07 Dec 25 <span className="text-red-600">Rejected</span>
            </p>
            <p className="flex justify-between">
              09 Dec 25 <span className="text-green-600">Approved</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
