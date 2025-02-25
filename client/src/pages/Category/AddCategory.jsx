import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@/components/Editor";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formSchema = z.object({
    category: z.string().min(3, "Category is required"),
    title: z.string().min(3, "Title is required"),
    blogContent: z.string().min(3, "Content is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { category: "", title: "", blogContent: "" },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${getEnv("VITE_API_BASE_URL")}/category/all`
        );
        setCategories(response.data.categories);
      } catch (err) {
        setError("Failed to load categories");
      }
    };

    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${getEnv("VITE_API_BASE_URL")}/blog/${id}`
        );
        form.reset(response.data);
      } catch (err) {
        showToast("error", "Failed to load blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchBlogDetails();
  }, [id, form]);

  const onSubmit = async (values) => {
    try {
      await axios.put(
        `${getEnv("VITE_API_BASE_URL")}/blog/update/${id}`,
        values
      );
      showToast("success", "Blog updated successfully");
      navigate("/blogs");
    } catch (err) {
      showToast("error", err.message);
    }
  };

  return (
    <Card className="pt-5 max-w-screen-md mx-auto">
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>Category</label>
            <Select {...form.register("category")}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-3">
            <label>Title</label>
            <Input {...form.register("title")} placeholder="Enter blog title" />
          </div>

          <div className="mb-3">
            <label>Content</label>
            <Editor
              initialData={form.watch("blogContent")}
              onChange={(event, editor) =>
                form.setValue("blogContent", editor.getData())
              }
            />
          </div>

          <Button type="submit" className="w-full">
            Update Blog
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditBlog;
