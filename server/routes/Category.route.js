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
CategoryRoute.get("/:id", showCategory);

// Update a category
CategoryRoute.put("/:id", updateCategory);

// Delete a category
CategoryRoute.delete("/:id", deleteCategory);

export default CategoryRoute;
