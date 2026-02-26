import React from "react";
import { Pencil } from "lucide-react";

const data = [
  {
    id: 1,
    appliedDate: "16 Oct 2025 | 11:11AM",
    name: "Omar Al-Farsi",
    empId: "EM01",
    designation: "Interior Designer",
    visaStatus: "31 Dec 2026",
    from: "20 Oct 2025",
    to: "24 Nov 2025",
    days: "34",
    remark: "For Diwali",
    status: "Approved",
  },
  {
    id: 2,
    appliedDate: "03 Nov 2025 | 10:30AM",
    name: "Aisha Khan",
    empId: "EM02",
    designation: "Interior Designer",
    visaStatus: "Expiring 15 Days",
    from: "22 Nov 2025",
    to: "29 Nov 2025",
    days: "12",
    remark: "Marriage",
    status: "Rejected",
  },
];

export default function LeaveRequestsTable() {
  return (
    <div className=" p-4 rounded-xl">
      <div className="overflow-x-auto">
        <table
          className="w-full text-[13px] border-separate"
          style={{ borderSpacing: "0 8px" }}
        >
          {/* HEADER */}
          <thead style={{ background: "#FAFAFA" }}>
            <tr className="text-[12px] leading-[100%] tracking-[0%] uppercase text-[#151515]">
              <th className="font-medium px-3 py-[10px] text-left rounded-l-lg border border-gray-200">
                APPLIED DATE
              </th>
              <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                EMPLOYEE NAME
              </th>
              <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                DESIGNATION
              </th>
              <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                VISA STATUS
              </th>
              <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                FROM DATE
              </th>
              <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                TO DATE
              </th>
              <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                TOTAL DAYS
              </th>
              <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                REMARK
              </th>
              <th className="font-medium px-3 py-[10px] text-left border border-gray-200">
                STATUS
              </th>
              <th className="font-medium px-3 py-[10px] text-left rounded-r-lg border border-gray-200">
                ACTION
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="bg-white">
                <td className="px-3 py-[6px] border border-gray-200 rounded-l-lg">
                  {item.appliedDate}
                </td>

                <td className="px-3 py-[6px] border border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {item.empId}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-[6px] border border-gray-200">
                  <div>{item.designation}</div>
                  <div className="text-[11px] text-gray-400">Payroll</div>
                </td>

                <td className="px-3 py-[6px] border border-gray-200">
                  {item.visaStatus}
                </td>

                <td className="px-3 py-[6px] border border-gray-200">
                  {item.fromDate}
                </td>

                <td className="px-3 py-[6px] border border-gray-200">
                  {item.toDate}
                </td>

                <td className="px-3 py-[6px] border border-gray-200">
                  {item.totalDays}
                </td>

                <td className="px-3 py-[6px] border border-gray-200">
                  {item.remark}
                </td>

                <td className="px-3 py-[6px] border border-gray-200">
                  {item.status === "Approved" && (
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-md">
                      Approved
                    </span>
                  )}
                  {item.status === "Rejected" && (
                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-md">
                      Rejected
                    </span>
                  )}
                </td>

                <td className="px-3 py-[6px] border border-gray-200 rounded-r-lg">
                  ✏️
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
