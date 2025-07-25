import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ResultsPage() {
  const { state } = useLocation();
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (state) {
      axios
        .get("http://localhost:5000/api/search", {
          params: {
            activity: state.activity,
            location: state.location,
            date: state.date,
          },
        })
        .then((res) => setResults(res.data))
        .catch((err) => console.error(err));
    }
  }, [state]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Search Results</h1>
      <ul>
        {results.map((item) => (
          <li key={item.id} className="mb-2 p-3 bg-gray-100 rounded">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
