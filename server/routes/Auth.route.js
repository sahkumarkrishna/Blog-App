import express from "express";
import { GoogleLogin, Login, Logout, Register } from "../controllers/Auth.controller.js";

const AuthRouter = express.Router();

// Register Route
AuthRouter.post("/register", Register);
AuthRouter.post("/login", Login);
AuthRouter.post("/google-login", GoogleLogin);
// Change logout route to POST
AuthRouter.post("/logout", Logout);

export default AuthRouter;
