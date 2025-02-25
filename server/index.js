import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import AuthRouter from "./routes/Auth.route.js";
import UserRouter from "./routes/User.route.js";
import CategoryRoute from "./routes/Category.route.js";
import BlogRouter from "./routes/Blog.route.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Important for authentication cookies
  })
);

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/category", CategoryRoute);
app.use("/api/blog", BlogRouter); // Ensure this line is correct

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
