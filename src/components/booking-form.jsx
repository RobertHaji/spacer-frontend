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

function BookingForm() {
  const accessToken = localStorage.getItem("token");
  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      spaceName: "",
      numberOfGuests: 1,
      dateOfBooking: new Date(),
      numberOfHours: 1,
    },
  });


  const onTheSubmit = async (values) => {
      console.log("Submited values:", values);

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
        form.reset(); // ✅ Reset after success
      } else {
        toast.error(data.error || "Booking failed.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("Something went wrong while booking.");
    }
  };


  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ background: "linear-gradient(to bottom, #0F555C, #20B4C2)" }}
    >
      <Card
        className="max-w-md mx-auto mt-10 p-6 text-white rounded-lg shadow-lg"
        style={{ background: "linear-gradient(to bottom, #20B4C2, #0F555C)" }}
      >
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Add a New Space</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onTheSubmit)}
              className="space-y-4"
            >
              {/* Space Name */}
              <FormField
                control={form.control}
                name="spaceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Space name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Space Name"
                        {...field}
                        className="bg-transparent text-white placeholder-white border-white focus:border-white focus:ring-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Number of Guests */}
              <FormField
                control={form.control}
                name="numberOfGuests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Number of guests"
                        min="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Date of booking */}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Number of Hours */}
              <FormField
                control={form.control}
                name="numberOfHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of hours you want to book for</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Hours booked"
                        min="1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Confirm
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingForm;
