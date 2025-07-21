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
  numberOfGuests: z.number().min(1, "Number of guests must be at least 1"),
  dateOfBooking: z.date().min(new Date(), {
    message: "Booking date must be in the future",
  }),
  numberOfHours: z.number().min(1, "Number of hours must be at least 1").max(24, "Number of hours cannot exceed 24")
});

function BookingForm() {
  //  UseForm with zod
  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      spaceName: "",
      numberOfGuests: 1,
      dateOfBooking: new Date(),
      numberOfHours: 1,
    },
  });

  const onSubmit = (values) => {
    console.log("Submited values:", values);

    setTimeout(() => {
      toast.success("Booking succesfully");
      form.reset();
    }, 500);
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Add a New Space</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Space Name */}
            <FormField
              control={form.control}
              name="spaceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Space name</FormLabel>
                  <FormControl>
                    <Input placeholder="Space Name" {...field} />
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
                    <Input type= "number" placeholder="Number of guests" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date of booking */}
            <FormField
              control={form.control}
              name="DateOfBooking"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Booking</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Booking Date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Number of Hours */}
            <FormField
              control={form.control}
              name="NumberOfHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of hours you want to book for</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Hours booked" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default BookingForm;
