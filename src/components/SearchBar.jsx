import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const activityCategories = [
  "Wedding", "Meeting", "Workshop", "Conference", "Party",
  "Training", "Birthday", "BabyShower", "Other"
];

const counties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay",
  "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu",
  "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru",
  "Migori", "Mombasa", "Murang’a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia",
  "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

export default function SearchBar() {
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!activity || !location || !selectedDate) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const params = new URLSearchParams({
        activity,
        location,
        date: selectedDate.toISOString(),
      });

      const res = await fetch(`http://localhost:5000/spaces?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      console.log("Returning spaces:", data);

      navigate("/results", {
        state: {
          results: data,
          activity,
          location,
          date: selectedDate.toISOString(),
        },
      });

      setActivity("");
      setLocation("");
      setSelectedDate(null);
    } catch (error) {
      // console.error("Search error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-teal-700 p-3 rounded-md w-full max-w-5xl mx-auto">
      <div className="bg-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-md">

        <div className="flex-1">
          <label className="block font-semibold text-sm text-black">What are you planning?</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full text-sm text-gray-600 focus:outline-none border-b border-gray-300 py-1 bg-white"
          >
            <option value="">Select activity</option>
            {activityCategories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block font-semibold text-sm text-black">Where?</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm text-gray-600 focus:outline-none border-b border-gray-300 py-1 bg-white"
          >
            <option value="">Select county</option>
            {counties.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block font-semibold text-sm text-black">When?</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Select date & time"
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
