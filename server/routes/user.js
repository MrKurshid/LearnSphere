import express from "express";
import {
  loginUser,
  myProfile,
  register,
  verifyUser,
} from "../controller/user.js";
import { isAuth } from "../middlewares/isAuth.js";
import { rateLimit } from "../middlewares/rateLimit.js";

const router = express.Router();

const registrationLimit = rateLimit({ windowMs: 15 * 60 * 1000, maxRequests: 5 });
const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, maxRequests: 10 });

router.post("/user/register", registrationLimit, register);
router.post("/user/verify", registrationLimit, verifyUser);
router.post("/user/login", loginLimit, loginUser);
router.get("/user/me", isAuth, myProfile);

export default router;
