import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const query = new URLSearchParams();
      if (location) query.append("location", location);
      if (category) query.append("category", category);
      if (selectedDate) query.append("date", selectedDate.toISOString());

      const res = await fetch(
        `http://spacer-backend-production.up.railway.app/spaces?${query.toString()}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch filtered spaces");

      navigate("/SpacesPage", { state: { filteredSpaces: data } });

      setCategory("");
      setLocation("");
      setSelectedDate(null);
    } catch (err) {
      console.error("Search error:", err);
      alert("Error searching spaces. Try again.");
    }
  };

  return (
    <div className="bg-teal-700 p-3 rounded-md w-full max-w-5xl mx-auto">
      <div className="bg-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-md">
        <div className="flex-1">
          <label className="block font-semibold text-sm text-black">
            What are you planning?
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Search category..."
            className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none border-b border-gray-300 py-1"
          />
        </div>

        <div className="flex-1">
          <label className="block font-semibold text-sm text-black">
            Where?
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search location..."
            className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none border-b border-gray-300 py-1"
          />
        </div>

        {/* <div className="flex-1">
          <label className="block font-semibold text-sm text-black">
            When?
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select date & time"
            className="w-full text-sm text-gray-600 placeholder-gray-400 focus:outline-none border-b border-gray-300 py-1"
          />
        </div> */}

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
