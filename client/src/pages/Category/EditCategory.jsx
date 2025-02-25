import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getEnv } from "@/helpers/getEnv";
import slugify from "slugify";
import { showToast } from "@/helpers/showToast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ToastContainer } from "react-toastify";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      featureImage: "",
      content: "",
    },
  });

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${getEnv("VITE_API_BASE_URL")}/blog/${id}`
        );
        const blog = response.data.blog;

        if (blog) {
          setValue("title", blog.title);
          setValue("slug", blog.slug);
          setValue("category", blog.category);
          setValue("featureImage", blog.featureImage);
          setValue("content", blog.content);
          showToast("success", "Blog loaded successfully!");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        showToast("error", "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, setValue]);

  // Generate slug from title
  useEffect(() => {
    setValue("slug", slugify(watch("title"), { lower: true }));
  }, [watch("title"), setValue]);

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      await axios.put(`${getEnv("VITE_API_BASE_URL")}/blog/${id}`, values);
      showToast("success", "Blog updated successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error("Update Error:", error);
      showToast("error", "Failed to update blog");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Card className="pt-5 max-w-screen-md mx-auto">
        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...register("title")} placeholder="Enter blog title" />
              </FormControl>
            </div>

            <div className="mb-3">
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...register("slug")} placeholder="Slug" readOnly />
              </FormControl>
            </div>

            <div className="mb-3">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...register("category")} placeholder="Category" />
              </FormControl>
            </div>

            <div className="mb-3">
              <FormLabel>Feature Image URL</FormLabel>
              <FormControl>
                <Input {...register("featureImage")} placeholder="Image URL" />
              </FormControl>
            </div>

            <div className="mb-3">
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <textarea
                  {...register("content")}
                  className="w-full h-40 p-2 border rounded"
                />
              </FormControl>
            </div>

            <Button type="submit" className="w-full">
              {loading ? "Updating..." : "Update Blog"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBlog;
