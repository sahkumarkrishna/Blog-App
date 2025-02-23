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
import { useFetch } from "@/hooks/userFetch";
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { showToast } from "@/helpers/showToast";

const CategoryDetails = () => {
  const {
    data: categoryData,
    loading,
    error,
    refetch,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all`);

  const [isDeleting, setIsDeleting] = useState(false);

  // Function to delete a category
  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    setIsDeleting(true);
    try {
      const response = await axios.delete(`${getEnv("VITE_API_BASE_URL")}/category/${categoryId}`);
      showToast("success", response.data.message);
      refetch(); // Refresh the category list after deleting
    } catch (error) {
      showToast("error", "Failed to delete category");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <Loading />;
  
  return (
    <div>
      <Card>
        <CardHeader>
          <Button asChild>
            <Link to="/category/add">Add Category</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {/* Show error if exists */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Show categories if data exists */}
          {categoryData?.categories?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryData.categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell className="flex gap-3">
                      {/* Edit Button */}
                      <Button variant="outline" className="hover:bg-violet-500 hover:text-white" asChild>
                        <Link to={`/category/edit/${category._id}`}>
                          <FaEdit />
                        </Link>
                      </Button>

                      {/* Delete Button */}
                      <Button
                        variant="outline"
                        className="hover:bg-red-500 hover:text-white"
                        onClick={() => handleDelete(category._id)}
                        disabled={isDeleting}
                      >
                        <FaTrashAlt />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan="3" className="text-center">
                    No categories found.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
