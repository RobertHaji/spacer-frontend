import React from "react";
import { Formik } from "formik";

const handleBookingSubmit = async (values, { resetForm }) => {
  const formattedDate = new Date(values.bookingDate)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' '); // -> "YYYY-MM-DD HH:MM:SS"

  const payload = {
    space_name: values.spaceName,
    number_of_guests: Number(values.numberOfGuests),
    date_of_booking: formattedDate,
    number_of_hours: Number(values.numberOfHours)
  };

  try {
    const response = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${yourAccessToken}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (response.ok) {
      alert("Booking successful!");
      resetForm();
      console.log("Booking created:", data);
    } else {
      alert(`Error: ${data.error || "Booking failed."}`);
    }
  } catch (error) {
    console.error("Booking error:", error);
    alert("Something went wrong. Please try again.");
  }
    return (
    <div className="booking-form">
      <h2>Book Your Space</h2>
      <Formik
        initialValues={{
          spaceName: "",
          bookingDate: "",
          numberOfHours: 1,
          numberOfGuests: 1,
        }}
        onSubmit={handleBookingSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Space Name</label>
              <input
                type="text"
                id="spaceName"
                name="spaceName"
                value={values.spaceName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="bookingDate">Booking Date</label>
              <input
                type="date"
                id="bookingDate"
                name="bookingDate"
                value={values.bookingDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="numberOfHours">Number of Hours</label>
              <input
                type="number"
                id="numberOfHours"
                name="numberOfHours"
                value={values.numberOfHours}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div>
              <label htmlFor="numberOfGuests">Number of Guests</label>
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                value={values.numberOfGuests}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <button type="submit">Book Now</button>
          </form>
        )}
      </Formik>
    </div>
  );
};
