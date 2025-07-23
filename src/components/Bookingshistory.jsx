import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

function BookingsHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  
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
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>

      {loading ? (
        <p className="text-center">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-white/80">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {bookings.map((booking) => (
            <Card
              key={booking.id}
              className="bg-white/10 border border-white/20 rounded-lg"
            >
              <CardContent className="p-6 space-y-2">
                <h2 className="text-xl font-semibold">{booking.space_name}</h2>
                <p>
                  Date: {new Date(booking.date_of_booking).toLocaleDateString()}
                </p>
                <p>Guests: {booking.number_of_guests}</p>
                <p>Hours: {booking.number_of_hours}</p>
                <p>Amount paid: {booking.total_amount}</p>

                <div className="flex justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white transition duration-300"
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