import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const emailSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

const resetSchema = z.object({
  email: z.string().email(),
  new_password: z.string().min(3, "Password must be at least 3 characters"),
});

export function ForgotPasswordForm() {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const navigate = useNavigate();

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
  });

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: emailValue,
    },
  });

  const checkEmail = async (values) => {
    try {
      const res = await fetch("http://spacer-backend-production.up.railway.app/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success("Email found. You can now reset your password.");
        setEmailVerified(true);
        setEmailValue(values.email);
        resetForm.setValue("email", values.email);
      } else {
        const data = await res.json();
        toast.error(data.message || "Invalid email");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const resetPassword = async (values) => {
    try {
      const res = await fetch("http://spacer-backend-production.up.railway.app/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        resetForm.reset();
        setEmailVerified(false);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-center">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        {!emailVerified ? (
          <>
            <Form {...emailForm}>
              <form
                onSubmit={emailForm.handleSubmit(checkEmail)}
                className="space-y-4"
              >
                <FormField
                  control={emailForm.control}
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
                <Button type="submit" className="w-full">
                  Check Email
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Not sure?{" "}
              <Link
                to="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Go back home
              </Link>
            </div>
          </>
        ) : (
          <Form {...resetForm}>
            <form
              onSubmit={resetForm.handleSubmit(resetPassword)}
              className="space-y-4"
            >
              <Input
                type="hidden"
                value={emailValue}
                {...resetForm.register("email")}
              />
              <FormField
                control={resetForm.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
              <div className="text-center text-sm mt-2">
                Changed your mind?{" "}
                <Link
                  to="/login"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Go to Login
                </Link>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
