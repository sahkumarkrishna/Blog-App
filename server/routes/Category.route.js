import express from "express";
import {
  addCategory,
  showCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
} from "../controllers/category.controller.js";

const CategoryRoute = express.Router();

// Create a new category
CategoryRoute.post("/add", addCategory);

// Get all categories
CategoryRoute.get("/all", getAllCategory);

// Get a single category by ID
CategoryRoute.get("/:category_Id", showCategory);

// Update a category
CategoryRoute.put("/:category_Id", updateCategory);

// Delete a category
CategoryRoute.delete("/:category_Id", deleteCategory);

export default CategoryRoute;
