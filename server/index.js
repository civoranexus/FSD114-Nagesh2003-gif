import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import courseRoutes from "./routes/course.js";
import path from "path";

import cors from "cors";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import Razorpay from "razorpay";
dotenv.config();

export const instance = new Razorpay({
  key_id: process.env.Razorpay_Key,
  key_secret: process.env.Razorpay_Secret,
});

const app = express();
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const port = process.env.PORT;

// using middlewares
app.use(express.json());
app.use(cors());

// using routes
app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", courseRoutes);



app.get("/", (req, res) => {
  res.send("Server is Running");
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});