import {
  Form,
  FormField,
  FormMessage,
  FormLabel,
  FormControl,
  FormItem,
} from "@/components/ui/form";
import { Input } from "./ui/input";
// import { Textarea } from "./ui/textarea";
// import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


// Validation schema using Zod
const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  image_url: z.string().url("Image URL must be a valid URL"),
  user_id: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "User ID must be a positive number",
    }),
});

function CartegoryForm() {
  //  UseForm with zod
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      image_url: "",
    },
  });
  // confirms role of the user 
  const token = localStorage.getItem("session");
  const userRole = localStorage.getItem("role");

  if (!token || userRole !== "admin") {
    return (
      <p className="text-white text-center mt-10">
        You are not authorized to add a category.
      </p>
    );
  }
  const onSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const data = await response.json();
      toast.success("Category created successfully");
      console.log("Created category:", data);
      form.reset();
      // After succesful post navigate the categories page
      navigate("/category", { state: { refresh: true } });
    } catch (error) {
      console.error("Error submitting category:", error);
      toast.error("Failed to create category");
    }
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
                    <Input placeholder="Category Name" {...field} />
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
