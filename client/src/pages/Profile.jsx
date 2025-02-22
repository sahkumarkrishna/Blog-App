import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios"; // ✅ Import axios
import { useNavigate } from "react-router-dom";
import { RouteIndex } from "@/helpers/RouteName";
import { Textarea } from "@/components/ui/textarea";
const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Corrected Zod Validation Schema
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    bio: z.string().min(3, "Bio must be at least 3 characters long"),
    password: z.string().min(3, "Password is too short"),
  });

  // React Hook Form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  // Handle Login
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

      if (response.data?.user) {
        const userData = {
          id: response.data.user.id,
          email: response.data.user.email,
          avatar: response.data.user.avatar || "",
          isLogged: true,
        };

        dispatch(setUser(userData));
        showToast("success", response.data.message);
        navigate(RouteIndex);
      }
    } catch (error) {
      console.error("Login Error:", error);
      showToast("error", error.response?.data?.message || "Login failed");
    }
  }

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex flex-col items-center mt-10">
          <Avatar className="w-28 h-28">
            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
          </Avatar>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              {/* Name Field */}
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your name"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email Field */}
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
                          placeholder="Enter your email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bio Field */}
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          type="textarea"
                          placeholder="Enter  bio"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Field */}
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
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
