import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecentBookings() {
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("session");
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    if (!userId || !accessToken) {
      console.error(`User ID: ${userId}, Access Token: ${accessToken}`);
      setLoading(false);
      return;
    }

    fetch(
      `https://spacer-backend-production.up.railway.app/users/${userId}/bookings`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        const recent = sorted.slice(0, 2);
        setRecentBookings(recent);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const sorted = recentBookings.sort(
    (a, b) => new Date(b.date_of_booking) - new Date(a.date_of_booking)
  );
  const recent = sorted.slice(0, 2);
  return (
    <div className=" bg-gradient-to-b from-[#0F555C] to-[#20B4C2] text-white px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center drop-shadow-lg">
        Recent Bookings
      </h2>

      {loading ? (
        <p className="text-center text-white/80 animate-pulse">Loading...</p>
      ) : recent.length === 0 ? (
        <p className="text-center text-white/70 italic">
          No recent bookings found.
        </p>
      ) : (
        <div className="space-y-4 max-w-xl mx-auto">
          {recent.map((booking) => (
            <div
              key={booking.id}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-white/90 mb-1 truncate">
                {booking.space_name}
              </h3>
              <div className="text-sm text-white/80 space-y-1">
                <p>{new Date(booking.date_of_booking).toLocaleDateString()}</p>
                <p>Guests: {booking.number_of_guests}</p>
                <p>Hours: {booking.number_of_hours}</p>
              </div>

              <div className="mt-3 text-right">
                <Link
                  to="/bookingPage"
                  className="text-sm text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-[#0F555C] transition"
                >
                  View Full History
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default RecentBookings;