import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { getEnv } from "@/helpers/getEnv";
import { RouteIndex, RouteSignUp } from "@/helpers/RouteName";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.Slice";
import GoogleLogin from "@/components/GoogleLogin";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Validation schema
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password field required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await axios.post(
        `${getEnv("VITE_API_BASE_URL")}/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        { withCredentials: true }
      );

      // ✅ Ensure the user data structure is correct
      const userData = {
        id: response.data.user.id,
        email: response.data.user.email,
        avatar: response.data.user.avatar || "", // Default to empty string if not provided
        isLogged: true,
      };

      // ✅ Dispatch user data to Redux store
      dispatch(setUser(userData));

      showToast("success", response.data.message);
      navigate(RouteIndex);
    } catch (error) {
      console.error("Login Error:", error);
      showToast("error", error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px] p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Login Into Account
        </h1>
        <div className="flex flex-col items-center">
          <GoogleLogin />
          <div className="relative flex items-center my-5 w-full">
            <hr className="w-full border-2" />
            <span className="absolute left-1/2 transform -translate-x-1/2 bg-white px-2 text-sm">
              Or
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="mt-5 text-sm flex justify-center items-center gap-2">
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to={RouteSignUp}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
