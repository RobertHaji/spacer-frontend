import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ResultsPage() {
  const { search } = useLocation();
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const activity = params.get("activity");
    const location = params.get("location");

    axios
      .get("http://spacer-backend-production.up.railway.app/spaces", {
        params: { activity, location },
      })
      .then((res) => {
        setSpaces(res.data);
      })
      .catch((err) => {
        console.error("Error fetching search results:", err);
      });
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <Link
          to="/"
          className="inline-block mb-6 text-blue-600 hover:underline text-sm"
        >
          ← Back to Search
        </Link>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Search Results
        </h2>

        {spaces.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {spaces.map(space => (
              <li
                key={space.id}
                className="border border-gray-200 p-4 rounded-lg bg-white hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-700">{space.name}</h3>
                <p className="text-gray-500">Activity: {space.activity}</p>
                <p className="text-gray-500">Location: {space.location}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-600 text-lg">
            No matching spaces found.
          </div>
        )}
      </div>
    </div>
  );
}
