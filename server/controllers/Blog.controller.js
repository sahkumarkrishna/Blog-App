import Blog from "../models/Blog.model.js";
import { handleError } from "../helpers/handleError.js";
import cloudinary from "../config/cloudinary.js";
import { encode } from "entities";

// Add a new blog
export const addBlog = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = "";

    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              { folder: "Blog-App", resource_type: "auto" },
              (error, result) => (error ? reject(error) : resolve(result))
            )
            .end(req.file.buffer);
        });

        featuredImage = uploadResult.secure_url;
      } catch (uploadError) {
        return next(handleError(500, "Image upload failed"));
      }
    }

    // Create and save blog
    const blog = new Blog({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: featuredImage,
      blogContent: encode(data.blogContent),
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog added successfully",
      blog,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

// Edit a blog (fetch a blog for editing)
export const editBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Fetching Blog ID:", id); // ✅ Log ID

    const blog = await Blog.findById(id).populate("category", "name");

    if (!blog) {
      console.log("Blog not found in database"); // ✅ Log missing blog
      return next(handleError(404, "Blog not found"));
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching blog:", error.message); // ✅ Log error
    return next(handleError(500, error.message));
  }
};

// Update a blog (Supports file upload)
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // If a file is uploaded, update image URL
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true, // Ensure validation runs
    });

    if (!updatedBlog) return next(handleError(404, "Blog not found"));

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

// Delete a blog
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the blog exists before attempting to delete
    const blog = await Blog.findById(id);
    if (!blog) return next(handleError(404, "Blog not found"));

    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
// // Show all blogs

export const showAllBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name ").populate("category","name avatar") // Fetch author details
      .sort({ createdAt: -1 }).lean().exec();



    res.status(200).json(blogs);
  } catch (error) {
   
 return next(handleError(500, error.message));  }
};
