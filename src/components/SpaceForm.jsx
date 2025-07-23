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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
  // Additional field (lcation validation)
  location: z.string().min(2, "Location is required"),
  category_id: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Please select a valid category",
    }),
});

function SpaceForm() {
  //  UseForm with zod
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const form = useForm({
    resolver: zodResolver(spaceSchema),
    defaultValues: {
      name: "",
      owner_name: "",
      description: "",
      rent_rate: 0,
      image_url: "",
      available: true,
      location: "",
      category_id: 0,
    },
  });

  // Checks if the user is an admin
  const token = localStorage.getItem("session");
  const userRole = localStorage.getItem("role");

  if (!token || userRole !== "admin") {
    return (
      <p className="text-white text-center mt-10">
        You are not authorized to add a space.
      </p>
    );
  }
  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/spaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create space");
      }

      const data = await response.json();
      toast.success("Space created successfully");
      console.log("Created space:", data);
      form.reset();
      // After succesful post navigate the spaces page
      navigate("/SpacesPage", { state: { refresh: true } });
    } catch (error) {
      console.error("Error submitting space:", error);
      toast.error("Failed to create space");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Add a New Space</h2>
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
            {/* Owner_name */}
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
            {/* Description */}
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
            {/* Rent Rate */}
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
            {/* Availability */}
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
            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Category */}
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
            {/* Category Dropdown */}
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value={0}>Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
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

export default SpaceForm;
