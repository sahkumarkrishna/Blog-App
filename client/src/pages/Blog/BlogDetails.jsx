import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useFetch } from "../../hooks/userFetch.js";
import { getEnv } from "@/helpers/getEnv";
import { showToast } from "@/helpers/showToast";
import Loading from "@/components/Loading";
import { deleteData } from "@/helpers/handleDelete";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const BlogDetails = () => {
  const [deletingId, setDeletingId] = useState(null);

  const {
    data: blogData,
    loading,
    error,
    refetch,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/blog/all`);



  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    setDeletingId(id);
    try {
      const success = await deleteData(
        `${getEnv("VITE_API_BASE_URL")}/blog/${id}`
      );

      if (success) {
        showToast("success", "Blog deleted successfully");
        await refetch();
      } else {
        throw new Error("Failed to delete blog");
      }
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <Loading />;
  if (error)
    return <p className="text-red-500 text-center">Error: {error.message}</p>;

  const blogsArray = Array.isArray(blogData?.blogs)
    ? blogData.blogs
    : Array.isArray(blogData)
    ? blogData
    : [];

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <Button asChild className="w-full md:w-auto">
            <Link to="/blog/add">Add Blog</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {blogsArray.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Dated</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogsArray.map((blog) => (
                    <TableRow key={blog._id}>
                      <TableCell>{blog.author?.name || "Unknown"}</TableCell>
                      <TableCell>
                        {blog.category?.name || "Uncategorized"}
                      </TableCell>
                      <TableCell>{blog.title || "No Title"}</TableCell>
                      <TableCell>{blog.slug || "No Slug"}</TableCell>
                      <TableCell>
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="flex justify-center gap-3">
                        <Button
                          asChild
                          variant="outline"
                          className="hover:bg-violet-500 hover:text-white"
                        >
                          <Link to={`/blog/edit/${blog._id}`}>
                            <FaEdit />
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(blog._id)}
                          disabled={deletingId === blog._id}
                          className="hover:bg-violet-500 hover:text-white"
                        >
                          {deletingId === blog._id ? (
                            "Deleting..."
                          ) : (
                            <FaTrashAlt />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">No blogs available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
