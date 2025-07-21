import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchBar() {
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSearch = () => {
    console.log("Activity:", activity);
    console.log("Location:", location);
    console.log("Date:", selectedDate);

    // Reset input fields
    setActivity("");
    setLocation("");
    setSelectedDate(null);
  };

  return (
    <div className="bg-teal-700 p-3 rounded-md w-full max-w-5xl mx-auto">
      <div className="bg-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-md">
        
        <div className="flex-1">
          <label className="block font-semibold text-sm">What are you planning?</label>
          <input
            type="text"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            placeholder="Enter activity"
            className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none border-b border-gray-300 py-1"
          />
        </div>

        <div className="flex-1">
          <label className="block font-semibold text-sm">Where?</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none border-b border-gray-300 py-1"
          />
        </div>

        <div className="flex-1">
          <label className="block font-semibold text-sm">When?</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Enter date and time"
            className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none border-b border-gray-300 py-1"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-black text-white font-semibold px-5 py-2 rounded-md mt-2 md:mt-6 md:ml-2 flex items-center gap-2"
        >
          Search <span>→</span>
        </button>
      </div>
    </div>
  );
}
