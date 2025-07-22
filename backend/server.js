import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import connectDB from "./database/db.js";
import cors from "cors";
import path from "path";

const _dirname = path.resolve()

const app = express();
const PORT = process.env.PORT || 3000;

// Check for Mongo URI
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "https://blog-app-xqmy.onrender.com", // frontend URL
  credentials: true,
}));


// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// Serve frontend (production)
 app.use(express.static(path.join(_dirname,"/frontend/dist")));
 app.get("*", (_, res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
 });

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
