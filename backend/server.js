import dotenv from "dotenv";
dotenv.config();

import express from "express";

import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import cookieParser from 'cookie-parser';
import connectDB from "./database/db.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined. Check your .env file.');
    process.exit(1);
}

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server listen at port ${PORT}`);
    });
});
