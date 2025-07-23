import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

function BookingsHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("session");
  const userId = localStorage.getItem("userid");

  
  useEffect(() => {
    if (!userId) {
      toast.error("User ID not found");
      return;
    }

    fetch(`http://localhost:5000/users/${userId}/bookings`, {
      headers: {
            Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Could not load bookings");
        setLoading(false);
      });
  }, [userId]);


  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        toast.success("Booking deleted");
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        toast.error("Failed to delete booking");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting booking");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F555C] to-[#20B4C2] text-white px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-wide drop-shadow-lg">
        My Bookings
      </h1>

      {loading ? (
        <p className="text-center text-white/80 animate-pulse">
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-white/70 italic">
          You have no bookings yet.
        </p>
      ) : (
        <div className="space-y-8 max-w-3xl mx-auto">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className="bg-white/10 border border-white/30 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-md"
            >
              <CardContent className="p-6 space-y-3">
                <h2 className="text-2xl font-bold text-white/90 flex items-center gap-2">
                  {booking.space_name}
                </h2>
                <p className="text-white/80">
                  Date: {new Date(booking.date_of_booking).toLocaleDateString()}
                </p>
                <p className="text-white/80">
                  Guests: {booking.number_of_guests}
                </p>
                <p className="text-white/80">
                  Hours: {booking.number_of_hours}
                </p>
                <p className="text-white/80">
                  Amount paid:{" "}
                  <span className="text-green-300 font-semibold">
                    KES {booking.total_amount}
                  </span>
                </p>

                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-400 border-red-400 hover:bg-red-600 hover:text-white transition duration-300 px-4 py-2 rounded-md"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this booking?")
                      ) {
                        handleDelete(booking.id);
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
export default BookingsHistory;