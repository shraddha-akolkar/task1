import React, { useState, useRef, useEffect } from "react";

const HolidaysModal = ({ onClose, refreshHolidays, holidayData }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const dateRef = useRef(null);

  /* PREFILL DATA WHEN EDITING */
  useEffect(() => {
    if (holidayData) {
      setTitle(holidayData.title);
      setDate(holidayData.date);
      setDay(holidayData.day);

      if (holidayData.image) {
        setImage(`http://localhost:5000/uploads/${holidayData.image}`);
      }
    }
  }, [holidayData]);

  /* IMAGE  */
  const handleImage = (e) => {
    const selected = e.target.files[0];

    if (selected) {
      setFile(selected);
      setImage(URL.createObjectURL(selected));
    }
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("date", date);
    formData.append("day", day);

    if (file) {
      formData.append("image", file);
    }

    try {
      if (holidayData) {
        /* UPDATE */
        await fetch(`http://localhost:5000/api/holidays/${holidayData.id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        /* CREATE */
        await fetch("http://localhost:5000/api/holidays", {
          method: "POST",
          body: formData,
        });
      }

      refreshHolidays();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F9FAFB] w-[480px] rounded-2xl shadow-xl px-4 py-3 flex flex-col"
      >
        {/* HEADER */}
        <div className="text-sm font-medium text-gray-800 mb-2">
          {holidayData ? "Edit Holiday" : "Add Holiday"}
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
            placeholder="Please Enter Holiday title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
          />
        </div>

        {/* DATE + DAY */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label className="block text-[11px] text-gray-500 mb-1">Date</label>

            <input
              ref={dateRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              onClick={() => dateRef.current?.showPicker?.()}
              className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-gray-500 mb-1">Day</label>

            <input
              type="text"
              placeholder="Please Enter Holiday Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="text-gray-600 w-full bg-[#F1F3F5] rounded-lg px-3 py-1.5 text-sm outline-none"
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
            {holidayData ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HolidaysModal;
