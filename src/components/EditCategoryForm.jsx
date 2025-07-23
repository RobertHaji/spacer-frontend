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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Validation schema
const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  image_url: z.string().url("Image URL must be a valid URL"),
});

function EditCategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("session");
  const userRole = localStorage.getItem("role");

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      image_url: "",
    },
  });

  // Access control
  if (!token || userRole !== "admin") {
    return (
      <p className="text-white text-center mt-10">
        You are not authorized to edit this category.
      </p>
    );
  }

  // Fetch category by ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`http://localhost:5001/categories/${id}`);
        const data = await res.json();

        form.reset({
          name: data.name,
          image_url: data.image_url,
        });
      } catch (err) {
        console.error("Failed to fetch category:", err);
        toast.error("Error loading category");
      }
    };

    fetchCategory();
  }, [id, form]);

  const onSubmit = async (values) => {
    try {
      const response = await fetch(`http://localhost:5001/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to update category");

      toast.success("Category updated successfully!");
      navigate("/category", { state: { refresh: true } });
    } catch (err) {
      console.error(err);
      toast.error("Error updating category");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Edit Category</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
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

            <Button type="submit" className="w-full">
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default EditCategoryForm;
