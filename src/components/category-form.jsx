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
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Existing validation schema
const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  image_url: z.string().url("Image URL must be a valid URL"),
});


function CategoryForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingCategory = location.state?.category ?? null;

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: editingCategory || { name: "", image_url: "" },
  });

  const token = localStorage.getItem("session");
  const userRole = localStorage.getItem("role");

  if (!token || userRole !== "admin") {            // filters only to be seen by admin
    return (
      <p className="text-white text-center mt-10">
        You are not authorized to manage categories.git 
      </p>
    );
  }

  useEffect(() => {
    if (editingCategory) {
      form.reset(editingCategory);
    }
  }, [editingCategory, form]);

  const onSubmit = async (values) => {
    const url = editingCategory
      ? `http://localhost:5000/categories/${editingCategory.id}`    
      : "http://localhost:5000/categories";
    const method = editingCategory ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {                                 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Submit failed");
      }
      const data = await response.json();
      toast.success(
        editingCategory
          ? "Category updated successfully"
          : "Category created successfully"
      );
      form.reset();
      navigate("/category", { state: { refresh: true } });
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "Failed to " + (editingCategory ? "update" : "create") + " category"
      );
    }
  };
  
  return (
    
    <Card className="max-w-md mx-auto mt-10 p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">
          {editingCategory ? "Edit Category" : "Add a New Category"}
        </h2>
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
                    <Input placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Image URL */}
            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-black hover:bg-gray-900">
                {editingCategory ? "Update" : "Submit"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    
  );
}

export default CategoryForm;