import User from "../models/user.model.js";
import { handleError } from "../helpers/handleError.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // ✅ Fix: Corrected query (_id instead of _is)
    const user = await User.findOne({ _id: userId }).lean().exec();

    if (!user) {
      return next(handleError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User data found",
      user,
    });
  } catch (error) {
    return next(handleError(500, error.message));
  }
};




export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return next(handleError(400, "User ID is required"));
    }

   

    const data = JSON.parse(req.body.data || "{}");

    const user = await User.findById(userId);
    if (!user) {
      return next(handleError(404, "User not found"));
    }

    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.bio) user.bio = data.bio;

    if (data.password && data.password.length >= 8) {
      user.password = await bcrypt.hash(data.password, 10);
    }

    if (req.file) {
      console.log("Uploading to Cloudinary...");

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "Blog-App", resource_type: "auto" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        uploadStream.end(req.file.buffer);
      });

      console.log("Cloudinary Upload Result:", uploadResult);
      user.avatar = uploadResult.secure_url;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    return next(handleError(500, error.message));
  }
};