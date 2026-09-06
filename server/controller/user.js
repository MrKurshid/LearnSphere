import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendmails.js";
import TryCatch from "../middlewares/tryCatch.js";

export const register = TryCatch(async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      message: "Please fill in all fields (name, email, password)",
    });
  }

  if (!process.env.Activation_Secret) {
    console.error("[Config Error] Activation_Secret environment variable is missing on server!");
    return res.status(500).json({
      message: "Server configuration error: Activation_Secret environment variable is missing on Render dashboard.",
    });
  }

  if (!process.env.Gmail && !process.env.SMTP_USER) {
    console.error("[Config Error] Gmail environment variable is missing on server!");
    return res.status(500).json({
      message: "Server configuration error: Gmail environment variable is missing on Render dashboard.",
    });
  }

  if (!process.env.Password && !process.env.SMTP_PASS) {
    console.error("[Config Error] Password (Gmail App Password) environment variable is missing on server!");
    return res.status(500).json({
      message: "Server configuration error: Password (16-character Google App Password) environment variable is missing on Render dashboard.",
    });
  }

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({
      message: "User Already exists",
    });

  const hashPassword = await bcrypt.hash(password, 10);

  user = {
    name,
    email,
    password: hashPassword,
  };

  const otp = Math.floor(Math.random() * 1000000);

  const activationToken = jwt.sign(
    {
      user,
      otp,
    },
    process.env.Activation_Secret,
    {
      expiresIn: "5m",
    }
  );

  const data = {
    name,
    otp,
  };

  try {
    await sendMail(email, "E learning", data);
  } catch (mailErr) {
    console.error("[SMTP Error] Failed to send OTP email:", mailErr);
    return res.status(500).json({
      message: `Failed to send OTP email: ${mailErr.message || "Connection timeout"}. Please verify backend Gmail App Password and environment variables on Render.`,
    });
  }

  res.status(200).json({
    message: "Otp send to your mail",
    activationToken,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { otp, activationToken } = req.body;

  if (!activationToken) {
    return res.status(400).json({
      message: "Activation token missing or expired. Please register again.",
    });
  }

  if (!process.env.Activation_Secret) {
    return res.status(500).json({
      message: "Server configuration error: Activation_Secret is missing on server.",
    });
  }

  let verify;
  try {
    verify = jwt.verify(activationToken, process.env.Activation_Secret);
  } catch (err) {
    return res.status(400).json({
      message: "OTP expired or invalid session. Please register again.",
    });
  }

  if (!verify)
    return res.status(400).json({
      message: "Otp Expired",
    });

  if (String(verify.otp) !== String(otp))
    return res.status(400).json({
      message: "Wrong Otp",
    });

  await User.create({
    name: verify.user.name,
    email: verify.user.email,
    password: verify.user.password,
  });

  res.json({
    message: "User Registered",
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "No User with this email",
    });
  }
  const mathPassword = await bcrypt.compare(password, user.password);
  if (!mathPassword) {
    return res.status(400).json({
      message: "Wrong password",
    });
  }
  const token = jwt.sign({ _id: user._id }, process.env.Jwt_Sec, {
    expiresIn: "15d",
  });
  const userObj = user.toObject();
  delete userObj.password;

  res.json({
    message: `welcome back ${user.name}`,
    token,
    user: userObj,
  });
});

export const myProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json({ user });
});

