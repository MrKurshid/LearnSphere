import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import Razorpay from "razorpay";
import cors from "cors";

import fs from "fs";
import multer from "multer";

dotenv.config();

// ensure uploads directory exists safely
try {
  if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
  }
} catch (error) {
  // Ignore read-only filesystem error in serverless environment
}

export const instance = new Razorpay({
  key_id: process.env.Razorpay_key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();

// Database connection middleware for serverless requests
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (error) {
    next(error);
  }
});

// using middleware
app.use(express.json());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
  })
);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is working");
});

// importing routes
import userRoutes from "./routes/user.js";
import courseRoutes from "./routes/course.js";
import adminRoutes from "./routes/admin.js";

//using routes
app.use("/api", userRoutes);
app.use("/api", courseRoutes);
app.use("/api", adminRoutes);

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError || error.message?.includes("Only ")) {
    return res.status(400).json({ message: error.message });
  }
  console.error("[Server Error]", error.message);
  res.status(503).json({ message: "Service temporarily unavailable" });
});

// Only listen locally, Vercel handles invocation
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
}

export default app;
