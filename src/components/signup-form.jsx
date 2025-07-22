import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Form,
  FormField,
  FormMessage,
  FormLabel,
  FormControl,
  FormItem,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";

const schema = z.object({
  name: z
    .string({ required_error: "Full name is required" })
    .nonempty({ message: "Full name is required" }),
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Enter a valid email address" }),
  password_hash: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password cannot be less than 3 characters" }),
});

export function SignUpForm({ className, ...props }) {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);

    const raw = JSON.stringify(values);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: raw,
    };

    await fetch("http://localhost:5000/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.user) {
          // display success message
          toast.success(result.message);
          // reseting the form
          form.reset();

          localStorage.setItem("session", result.access_token);

          navigate(
            result.user.role === "admin" ? "/BookingPage" : "/SpacesPage"
          );
        } else {
          const message =
            typeof result.message === "object"
              ? Object.values(result.message)[0]
              : result.message;

          toast.error(message);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Please Login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password_hash"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>

                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disable={form.formState.isSubmitting}
                    type="submit"
                    className="w-full hover:cursor-pointer"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2Icon /> signup....
                      </>
                    ) : (
                      "SignUp"
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    href="#"
                    className="underline underline-offset-4"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
