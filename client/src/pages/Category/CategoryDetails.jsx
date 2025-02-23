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
import { useFetch } from "@/hooks/useFetch"; // Ensure correct import
import { getEnv } from "@/helpers/getEnv";
import Loading from "@/components/Loading";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { showToast } from "@/helpers/showToast";
import { deleteData } from "@/helpers/handleDelete";

const CategoryDetails = () => {
  const [deletingId, setDeletingId] = useState(null); // Track which category is deleting

  const {
    data: categoryData,
    loading,
    error,
    refetch, // Ensure refetch is available
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all`);

  const handleDelete = async (id) => {
   

    setDeletingId(id); // Set deleting state for this category
    try {
      const success = await deleteData(
        `${getEnv("VITE_API_BASE_URL")}/category/${id}`
      );

      if (success) {
      
        refetch(); // Refresh category list after deletion
      }
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "An error occurred while deleting."
      );
    } finally {
      setDeletingId(null); // Reset deleting state
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
          {error && <p className="text-red-500">{error}</p>}

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
                      <Button
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                        asChild
                      >
                        <Link to={`/category/edit/${category._id}`}>
                          <FaEdit />
                        </Link>
                      </Button>

                      {/* Delete Button */}
                      <Button
                        variant="outline"
                        className="hover:bg-violet-500 hover:text-white"
                        onClick={() => handleDelete(category._id)}
                        disabled={deletingId === category._id} // Disable only the deleting button
                      >
                        {deletingId === category._id ? (
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
