import express from "express";
import {
  addBlog,
  showAllBlog,
  editBlog, 
  updateBlog,
  deleteBlog,
} from "../controllers/Blog.controller.js";
import upload from "../config/multer.js";

const BlogRouter = express.Router();

// Create a new blog (with image upload)
BlogRouter.post("/add", upload.single("file"), addBlog);

// Get all blogs
BlogRouter.get("/all", showAllBlog);

// Get a single blog for editing
BlogRouter.get("/:id", editBlog);

// Update a blog
BlogRouter.put("/:id", updateBlog);

// Delete a blog
BlogRouter.delete("/:id", deleteBlog);

export default BlogRouter;
