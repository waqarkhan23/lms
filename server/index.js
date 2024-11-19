import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

dotenv.config({}); // Load environment variables
connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 8000;
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
