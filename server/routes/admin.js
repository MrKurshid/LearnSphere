import express from "express";
import { isAdmin, isAuth } from "../middlewares/isAuth.js";
import {
  addLecture,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllStats,
} from "../controller/admin.js";
import { uploadfiles } from "../middlewares/multer.js";

const router = express.Router();

router.post("/course/new", isAuth, isAdmin, uploadfiles, createCourse);
router.post("/course/:id", isAuth, isAdmin, uploadfiles, addLecture);
router.delete("/course/:id", isAuth, isAdmin, deleteCourse);
router.delete("/lecture/:id", isAuth, isAdmin, deleteLecture);

router.get("/stats", isAuth, isAdmin, getAllStats);

export default router;
