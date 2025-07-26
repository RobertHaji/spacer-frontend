import {
  Form,
  FormField,
  FormMessage,
  FormLabel,
  FormControl,
  FormItem,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Booking form schema
const bookingSchema = z.object({
  spaceName: z.string().min(1, "Space name is required"),
  numberOfGuests: z.coerce
    .number()
    .min(1, "Number of guests must be at least 1"),
  dateOfBooking: z.date().min(new Date(), {
    message: "Booking date must be in the future",
  }),
  numberOfHours: z.coerce
    .number()
    .min(1, "Number of hours must be at least 1")
    .max(24, "Cannot exceed 24"),
});

function BookingForm({ space ,onClose}) {
  const accessToken = localStorage.getItem("session");
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      spaceName: space?.name || "",
      numberOfGuests: 1,
      dateOfBooking: new Date(),
      numberOfHours: 1,
    },
  });
  const [availableSpaces, setAvailableSpaces] = useState([]);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    if (space) {
      form.reset({
        spaceName: space.name,
        numberOfGuests: 1,
        dateOfBooking: new Date(),
        numberOfHours: 1,
      });
    }
  }, [space]);

  if (!showForm) return null; 

  // const onTheSubmit = async (values) => {
  //   const formattedDate = new Date(values.dateOfBooking)
  //     .toISOString()
  //     .slice(0, 19)
  //     .replace("T", " ");

  //   const payload = {
  //     space_name: values.spaceName,
  //     number_of_guests: values.numberOfGuests,
  //     date_of_booking: formattedDate,
  //     number_of_hours: values.numberOfHours,
  //   };

  //   try {
  //     const response = await fetch("http://localhost:5000/bookings", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       toast.success("Booking successful!");
  //       console.log("Created booking:", data);
  //       form.reset();
  //       navigate("/payment", { state: { booking: data } });

  //     } else if (!accessToken){
  //       toast.error(data.error || "User must login to book");
  //       navigate("/login")
  //     }
  //     else {
  //       toast.error(data.error || "Booking failed")
  //     }
  //   } catch (err) {
  //     console.error("Booking error:", err);
  //     toast.error("Something went wrong while booking.");
  //   }
  // };
  const onTheSubmit = async (values) => {
    const formattedDate = new Date(values.dateOfBooking)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const payload = {
      space_name: values.spaceName,
      number_of_guests: values.numberOfGuests,
      date_of_booking: formattedDate,
      number_of_hours: values.numberOfHours,
    };

    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Booking successful!");
        console.log("Created booking:", data);
        form.reset();
        navigate("/payment", { state: { booking: data } });
      } else if (!accessToken) {
        toast.error(data.error || "User must login to book");
        navigate("/login");
      } else {
        toast.error(data.error || "Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Something went wrong while booking.");
    }
  };


  return (
      <Card
        className="w-full max-w-lg mx-auto p-8 text-white rounded-lg shadow-lg flex flex-col justify-center min-h-[20vh]"
        style={{ background: "linear-gradient(to bottom, #20B4C2, #0F555C)" }}
      >
        <CardContent className="flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-bold text-center">Book This Space</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onTheSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="spaceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Space name</FormLabel>
                    <FormControl>
                      <Input
                        readOnly
                        className="w-full bg-transparent text-white placeholder-white border-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfGuests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        className="w-full bg-transparent text-white placeholder-white border-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBooking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Booking</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        value={field.value.toISOString().slice(0, 10)}
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                        className="w-full bg-transparent text-white placeholder-white border-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="24"
                        className="w-full bg-transparent text-white placeholder-white border-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-transparent border-2 border-green-600 text-white hover:bg-green-600/100 transition duration-300"
                >
                  Confirm Booking
                </Button>
                <Button
                  type="button"
                  className="w-full bg-transparent border-2 border-red-600 text-white hover:bg-red-700/100 transition duration-300"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
    </Card>
  );
}

export default BookingForm;