import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/course.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/upload.js";
const courseRouter = Router();

courseRouter.post("/create", isAuthenticated, createCourse);
courseRouter.get("/allCourses", isAuthenticated, getAllCourses);
courseRouter.put(
  "/update-course/:id",
  isAuthenticated,
  upload.single("courseThumbnail"),
  updateCourse
);
courseRouter.delete("/delete-course/:id", isAuthenticated, deleteCourse);
export default courseRouter;
