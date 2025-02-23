import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { RouteAddCategory } from "@/helpers/RouteName";
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

const CategoryDetails = () => {
  const {
    data: categoryData,
    loading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/category/all`);

  if (loading) return <Loading />;

  return (
    <div>
      <Card>
        <CardHeader>
          <Button asChild>
            <Link to={RouteAddCategory}>Add Category</Link>
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
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryData.categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.slug}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan="3" className="text-center">
                    Data not found
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
