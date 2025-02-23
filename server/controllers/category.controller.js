import Category from "../models/category.model.js";
import { handleError } from "../helpers/handleError.js";

// Add Category
export const addCategory = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    const category = new Category({
      name,
      slug,
    });

    await category.save();

    res.status(201).json({ success: true, message: "Category added" });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

// Show All Categories
export const showCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

// Edit Category
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, slug },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return next(handleError(404, "Category not found"));
    }

    res
      .status(200)
      .json({ success: true, message: "Category updated", updatedCategory });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};

// Delete Category
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return next(handleError(404, "Category not found"));
    }

    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
// Get all categories
export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 }).lean().exec(); // Fetch all categories
    res.status(200).json({ success: true, categories });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};
