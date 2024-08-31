import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import formRoutes from "./routes/formRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Route setup
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/send", formRoutes);

// Handle serving the frontend build files in production
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});
