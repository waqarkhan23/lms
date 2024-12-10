import Course from "../models/course.model.js";
import {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} from "../utils/cloudinary.js";
import fs from "fs/promises";
export const createCourse = async (req, res) => {
  const { title, category } = req.body;
  try {
    if (!title || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newCourse = await Course.create({
      courseTitle: title,
      category,
      creator: req.id,
    });

    res
      .status(201)
      .json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: error.message || "Failed to create course." });
  }
};

export const getAllCourses = async (req, res) => {
  const userId = req.id;
  try {
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }
    res
      .status(200)
      .json({ message: "Courses retrieved successfully", courses });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to retrieve courses." });
  }
};

export const updateCourse = async (req, res) => {
  const userId = req.id;
  const courseId = req.params.id;
  const {
    courseTitle,
    subTitle,
    description,
    category,
    courseLevel,
    coursePrice,
  } = req.body;
  const courseThumbnail = req.file;
  console.log(
    courseTitle,
    subTitle,
    description,
    category,
    courseLevel,
    coursePrice
  );

  try {
    if (
      !courseTitle ||
      !category ||
      !courseLevel ||
      !coursePrice ||
      !courseThumbnail
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this course." });
    }
    let updatedThumbnail;
    if (courseThumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      const result = await uploadMediaToCloudinary(courseThumbnail);
      updatedThumbnail = result.secure_url;
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: updatedThumbnail,
    };
    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData);

    try {
      await fs.unlink(courseThumbnail.path);
      console.log(`Successfully deleted temp file: ${courseThumbnail.path}`);
    } catch (unlinkError) {
      console.error(`Error deleting temp file: ${unlinkError}`);
    }

    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to update course." });
  }
};

export const deleteCourse = async (req, res) => {
  const userId = req.id;
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.creator.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this course." });
    }
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to delete course." });
  }
};

export const getCourseById = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course retrieved successfully", course });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to retrieve course." });
  }
};
