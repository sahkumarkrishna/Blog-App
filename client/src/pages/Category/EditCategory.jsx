import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { showToast } from "@/helpers/showToast";
import { getEnv } from "@/helpers/getEnv";
import axios from "axios";
import slugify from "slugify";
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

const EditCategory = () => {
  const { id } = useParams(); // Get category ID from the URL
 
  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    slug: z.string().min(3, "Slug must be at least 3 characters long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  // Fetch category details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${getEnv("VITE_API_BASE_URL")}/category/${id}`
        );
        form.setValue("name", response.data.category.name);

        form.setValue("slug", response.data.category.slug);
        showToast("success", response.data.message);
      } catch (error) {
        showToast("error", error.message);
      }
    };

    fetchCategory();
  }, [id, form]);

  // Generate slug from name
  useEffect(() => {
    const categoryName = form.watch("name");
    if (categoryName) {
      form.setValue("slug", slugify(categoryName, { lower: true }));
    }
  }, [form.watch("name")]);

  // Handle form submission
  async function onSubmit(values) {
    try {
      await axios.put(`${getEnv("VITE_API_BASE_URL")}/category/${id}`, values);

      
    } catch (error) {
      showToast("error", error.message);
    }
  }

  return (
    <div>
      <Card className="pt-5 max-w-screen-md mx-auto">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
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
              </div>

              <Button type="submit" className="w-full">
                Update Category
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCategory;
