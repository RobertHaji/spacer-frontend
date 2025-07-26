import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const { activity, location: county, date } = state || {};

  useEffect(() => {
    if (!activity || !county || !date) {
      navigate("/");
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/venues", {
          params: {
            activity,
            location: county,
            date,
          },
        });
        setResults(res.data);
      } catch (err) {
        console.error("Search failed:", err);
        alert("Failed to load results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [activity, county, date, navigate]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Results for <span className="text-teal-600">{activity}</span> in{" "}
        <span className="text-teal-600">{county}</span> on{" "}
        <span className="text-teal-600">{new Date(date).toLocaleString()}</span>
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading search results...</p>
      ) : results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((spaces) => (
            <li
              key={venue.id}
              className="p-4 border border-gray-200 rounded shadow bg-white hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-gray-800">{venue.name}</h3>
              <p className="text-gray-700">{venue.description}</p>
              <p className="text-sm text-gray-500 mt-1">{spaces.address}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No spaces found for your search.</p>
      )}
    </div>
  );
}
