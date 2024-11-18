import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import morgan from "morgan";
const app = express();

dotenv.config({}); // Load environment variables
connectDB(); // Connect to MongoDB
morgan(":method :url :status :res[content-length] - :response-time ms");
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
