import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import AuthRouter from "./routes/Auth.route.js";

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

// // Set Security Headers (COOP and COEP)
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
//   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//   next();
// });


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
