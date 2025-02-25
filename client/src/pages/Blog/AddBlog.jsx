import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import slugify from "slugify";
import { getEnv } from "@/helpers/getEnv";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "../../hooks/userFetch";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import axios from "axios";
import { showToast } from "@/helpers/showToast";
import { useNavigate } from "react-router-dom";
import { RouteBlog } from "@/helpers/RouteName";

const AddBlog = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);

  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all`);

  const formSchema = z.object({
    category: z.string().min(3, "Category must be at least 3 characters long"),
    title: z.string().min(3, "Title must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
    blogContent: z
      .string()
      .min(3, "Blog Content must be at least 3 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { category: "", title: "", slug: "", blogContent: "" },
  });

  const blogTitle = form.watch("title");

  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle, form]);

  const handleFileSelection = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
  };

  const handleEditorData = (event, editor) => {
    form.setValue("blogContent", editor.getData());
  };

  const onSubmit = async (values) => {
    if (!user.user || !user.user._id) {
      showToast("error", "User not authenticated");
      return;
    }

    try {
      const newValue = { ...values, author: user.user._id };
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }
      formData.append("data", JSON.stringify(newValue));

      const response = await axios.post(
        `${getEnv("VITE_API_BASE_URL")}/blog/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      form.reset();
      setFile(null);
      setFilePreview(null);
      navigate(RouteBlog);
      showToast("success", response.data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };

  return (
    <div>
      <Card className="pt-5">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {loading ? (
                            <p className="p-2">Loading categories...</p>
                          ) : error ? (
                            <p className="p-2 text-red-500">
                              Failed to load categories
                            </p>
                          ) : categoryData?.categories?.length > 0 ? (
                            categoryData.categories.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <p className="p-2 text-gray-500">
                              No categories available
                            </p>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <span className="mb-2">Feature Image</span>
              <Dropzone onDrop={handleFileSelection}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="flex flex-col items-center justify-center w-36 h-36 border-2 border-dashed rounded cursor-pointer"
                  >
                    <input {...getInputProps()} />
                    {filePreview ? (
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <p className="text-sm text-gray-500">
                        Drag & drop an image or click to upload
                      </p>
                    )}
                  </div>
                )}
              </Dropzone>

              <FormField
                control={form.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      <Editor
                        initialData={field.value}
                        onChange={handleEditorData}
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
    </div>
  );
};

export default AddBlog;
