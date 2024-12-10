import Lecture from "../models/lecture.model.js";
import Course from "../models/course.model.js";

export const createLecture = async (req, res) => {
  const { courseId, lectureTitle } = req.body;
  console.log(courseId, lectureTitle);

  try {
    if (!courseId || !lectureTitle) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const newLecture = await Lecture.create({
      lectureTitle,
    });

    course.lectures.push(newLecture._id);
    await course.save();

    res.status(201).json(newLecture);
  } catch (error) {
    console.error("Error in createLecture:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log(courseId);
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }
    const course = await Course.findById(courseId).populate("lectures");
    if (!course) {
      return res.status(404).json({ message: "lectures not found" });
    }
    res.status(200).json({
      message: "Lectures retrieved successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
