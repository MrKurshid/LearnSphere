import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllStats,
} from "../controller/admin.js";
import { uploadCourseImage, uploadLectureVideo } from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, uploadCourseImage, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadLectureVideo, addLecture);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);

router.get("/stats", isAuth, isAdmin, getAllStats);

export default router;
