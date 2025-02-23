import express from "express";
import {
  checkOut,
  fetchLecture,
  fetchLectures,
  getAllCourses,
  getMyCourses,
  getSingleCourse,
  paymentVerification,
} from "../controller/course.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/course/all", getAllCourses);
router.get("/course/:id", getSingleCourse);
router.get("/lectures/:id", isAuth, fetchLectures);
router.get("/lecture/:id", isAuth, fetchLecture);
router.get("/mycourse", isAuth, getMyCourses);
router.get("/course/checkout/:id", isAuth, checkOut);
router.get("/verification/:id", isAuth, paymentVerification);

export default router;
