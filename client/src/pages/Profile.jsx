import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RouteIndex } from "@/helpers/RouteName";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks/userFetch";
import Loading from "@/components/Loading";
import { CiCamera } from "react-icons/ci";
import Dropzone from "react-dropzone";

const Profile = () => {
  const [filePreview, setFilePreview] = useState();
  const [file,setFile]=useState()

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: userData,
    loading,
    error,
  } = useFetch(
    user.user?._id
      ? `${getEnv("VITE_API_BASE_URL")}/user/get-user/${user.user._id}`
      : null
  );

  // ✅ Zod Validation Schema
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    bio: z.string().min(3, "Bio must be at least 3 characters long"),

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

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData, form]);

  useEffect(() => {
    if (!user.user?._id) {
      navigate(RouteIndex);
    }
  }, [user, navigate]);

 async function onSubmit(values) {
   try {
     const formData = new FormData(); // ✅ Corrected typo
     formData.append("file", file); // Ensure 'file' is defined
     formData.append("data", JSON.stringify(values));

     const response = await axios.put(
       `${getEnv("VITE_API_BASE_URL")}/user/update-user/${userData.user._id}`,
       formData, // ✅ Use FormData instead of raw JSON
       {
         withCredentials: true,
         headers: {
           "Content-Type": "multipart/form-data", // ✅ Required for FormData
         },
       }
     );

     if (response.data.success) {
      //  dispatch(setUser(response.data.user));
       showToast("success", "Profile updated successfully");
       navigate(RouteIndex);
     }
   } catch (error) {
     showToast("error", error.response?.data?.message || "Update failed");
   }
 }

  const handleFileSelection = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file)
    const preview = URL.createObjectURL(file);
    setFilePreview(preview);
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">Error loading profile</p>;

  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex flex-col items-center mt-10">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps()}
                className="flex justify-center items-center"
              >
                <input {...getInputProps()} />
                <Avatar className="w-32 h-32 relative group">
                  {" "}
                  {/* Fixed size */}
                  <AvatarImage
                    src={filePreview ? filePreview : userData?.user?.avatar}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute z-10 w-full h-full top-0 left-0 flex justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <CiCamera color="#7c3aed" size={24} />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                        {...field}
                      />
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
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter bio" {...field} />
                    </FormControl>
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

              <Button type="submit" className="w-full mt-4">
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
