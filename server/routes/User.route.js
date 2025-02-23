import express from "express";
import { getUser, updateUser } from "../controllers/User.controller.js";
import upload from "../config/multer.js";

const UserRouter = express.Router();

// Register Route
UserRouter.get("/get-user/:userId", getUser);
UserRouter.put("/update-user/:userId", upload.single('file'), updateUser);
export default UserRouter;
