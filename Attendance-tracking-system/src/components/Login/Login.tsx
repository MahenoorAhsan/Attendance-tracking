import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import styles from "./Login.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { RoutePaths } from "../../providers/Router";
import { getImageUrl } from "../../providers/utils";
import logo from "../../assets/logo.png";
import { toast } from "sonner";

// 1. Define schema outside component
const loginForm = z.object({
  email: z.string().min(1, {
    message: "Username is required",
  }),
  password: z.string().min(8, {
    message: "Password must have 8 characters",
  }),
});

export const Login = () => {
  const navigate = useNavigate();
  // 2. Initialize form INSIDE the component
  const form = useForm({
    resolver: zodResolver(loginForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // useEffect(() => {
  //   const token = Cookies.get('access_token');  // Read the cookie
  //   console.log('Cookie Token:', token);
  //   if (token) {
  //     navigate(RoutePaths.DASHBOARD);  // Replace with RoutePaths.DASHBOARD if needed
  //   }
  // },[]);

  const onSubmit = async (values: z.infer<typeof loginForm>) => {
    try {
      console.log(values);
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to submit");
      }
      const result = await response.json();
      localStorage.setItem("login_data", JSON.stringify(result.data));
      setTimeout(() => navigate(RoutePaths.DASHBOARD), 100);
      console.log("Success:", result);
      toast.success(result);
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  // const onSubmit = async () => {
  //  // e.preventDefault();
  //   console.log(JSON.stringify(loginForm))
  //   try {
  //     const response = await fetch(`${BACKEND_URL}/auth/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(loginForm),
  //     });

  //     if (!response.ok) throw new Error('Failed to submit');
  //     const result = await response.json();
  //     console.log('Success:', result);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 flex-col bg-blue-100">
      <div className="card shadow-xl p-20 bg-white rounded-3xl">
        <div className="flex justify-center  align-middle">
          <img src={logo} className="m-3  h-12" alt="Login visual" />
          <h2 className="text-6xl text-center ">RollCallPro</h2>
        </div>
        {/* <h6>Fastest AI-Enabled Attendance Tracker</h6> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} type="email" />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} type="password" />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
