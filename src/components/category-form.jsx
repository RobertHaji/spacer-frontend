import {
  Form,
  FormField,
  FormMessage,
  FormLabel,
  FormControl,
  FormItem,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// Validation schema using Zod
const spaceSchema = z.object({
  name: z.string().min(2, "Name is required"),
  owner_name: z.string().min(2, "Owner name is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  rent_rate: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Rent rate must be a positive number",
    }),
  image_url: z.string().url("Image URL must be a valid URL"),
  available: z.boolean(),
  category_id: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Category ID must be a positive number",
    }),
});

function CartegoryForm() {
  //  UseForm with zod
  const form = useForm({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      name: "",
      image_url: "",
      user_id: 1,
    },
  });

  const onSubmit = (values) => {
    console.log("Submited values:", values);

    setTimeout(() => {
      toast.success("category created succesfully");
      form.reset();
    }, 500);
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Add a New category</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Space Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Image */}
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* user */}
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="User ID" {...field} />
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

export default CartegoryForm;
