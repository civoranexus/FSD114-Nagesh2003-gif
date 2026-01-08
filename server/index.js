import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/db.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import cors from "cors";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


dotenv.config();

const app = express();


const port = process.env.PORT;

// using middlewares
app.use(express.json());
app.use(cors());

// using routes
app.use("/api", userRoutes);
app.use("/api", adminRoutes);


app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});