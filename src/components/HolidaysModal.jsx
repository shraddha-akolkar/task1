import React, { useState } from "react";

const HolidaysModal = ({ onClose }) => {
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <form className="bg-[#F9FAFB] w-[480px] rounded-2xl shadow-xl px-4 py-3 flex flex-col">
        {/* HEADER */}
        <div className="text-sm font-medium text-gray-800 mb-2">
          Add Holiday
        </div>

        {/* IMAGE */}
        <div className="mb-2">
          <label className="block text-[11px] text-gray-500 mb-1">
            Holiday Image
          </label>

          <div className="bg-[#F1F3F5] rounded-xl p-2 flex justify-center items-center h-[130px]">
            {image ? (
              <img
                src={image}
                alt="holiday"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <label className="text-xs text-gray-400 cursor-pointer">
                Upload Image
                <input type="file" onChange={handleImage} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* TITLE */}
        <div className="mb-2">
          <label className="block text-[11px] text-gray-500 mb-1">Title</label>

          <input
            type="text"
            placeholder="Holiday title"
            className="w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
          />
        </div>

        {/* DATE + DAY */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-[11px] text-gray-500 mb-1">Date</label>

            <input
              type="date"
              className="w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-gray-500 mb-1">Day</label>

            <input
              type="text"
              placeholder="Thursday"
              className="w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
            />
          </div>
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

export default HolidaysModal;
