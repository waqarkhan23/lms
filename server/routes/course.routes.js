import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controllers/course.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/upload.js";
import {
  createLecture,
  getCourseLectures,
} from "../controllers/lecture.controller.js";
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
courseRouter.get("/get-course/:id", getCourseById);

// Routes for post lecture to course
courseRouter.post("/create-lecture", isAuthenticated, createLecture);
courseRouter.get(
  "/get-course-lectures/:courseId",
  isAuthenticated,
  getCourseLectures
);

export default courseRouter;
