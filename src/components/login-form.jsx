import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2Icon, UtensilsIcon } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// import { BASE_URL } from "@/utils";

const schema = z.object({
  email: z
    .string({ required_error: "Email address is required" })
    .email({ message: "Enter a valid email address" }),
  password_hash: z
    .string({ required_error: "Password is required" })
    .min(3, { message: "Password cannot be less than 3 characters" }),
});

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values) => {
    const raw = JSON.stringify(values);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: raw,
    };

    await fetch("http://localhost:5000/signin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.user) {
          // display success message
          toast.success(result.message);
          // reseting the form
          form.reset();

          //store user session
          localStorage.setItem("session", result.access_token);
          localStorage.setItem("role", result.user.role);
          localStorage.setItem("userid", result.user.id);
          // redirects
          navigate(result.user.role === "admin" ? "/AdminPage" : "/");
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

                          <Link
                            to="/forgot-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full hover:cursor-pointer"
                  >
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2Icon /> login.....
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    href="#"
                    className="underline underline-offset-4"
                  >
                    Sign up
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
