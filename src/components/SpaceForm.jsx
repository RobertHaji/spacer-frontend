import {
  Form,
  FormField,
  FormMessage,
  FormLabel,
  FormControl,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils";

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

function SpaceForm({ onSpaceAdded }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

//  UseForm with zod
  const form = useForm({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      name: "",
      owner_name: "",
      description: "",
      rent_rate: 0,
      image_url: "",
      available: true,
      category_id: 1,
    },
  });

  const onSubmit = (values) => {
    fetch(`${BASE_URL}/spaces`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create space");
        return res.json();
      })
      .then(() => {
        toast.success("Space created successfully");
        form.reset();
          if (onSpaceAdded) {
            onSpaceAdded();
          } else {
              navigate("/spaces");
        };
      })
      .catch((err) => {
        console.error(err);
        toast.error("You are not authorized or something went wrong");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add a New Space</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="owner_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Owner Name</FormLabel>
                <FormControl>
                  <Input placeholder="Owner Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Short description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rent_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rent Rate</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Rent Rate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="!mt-0">Available</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category ID</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Category ID" {...field} />
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
    </div>
  );
}

export default SpaceForm;