import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";

const tempDir = process.env.VERCEL || fs.existsSync("/tmp") ? "/tmp" : "uploads";

try {
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
} catch (e) {}

const imageMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const videoMimeTypes = new Set(["video/mp4", "video/webm", "video/quicktime"]);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, tempDir);
  },
  filename(req, file, cb) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    const filename = `${id}.${extName}`;
    cb(null, filename);
  },
});

const createUploader = (permittedTypes, errorMessage, maxFileSize) =>
  multer({
    storage,
    limits: { fileSize: maxFileSize },
    fileFilter(req, file, cb) {
      if (!permittedTypes.has(file.mimetype)) {
        return cb(new Error(errorMessage));
      }
      cb(null, true);
    },
  }).single("file");

export const uploadCourseImage = createUploader(
  imageMimeTypes,
  "Only JPEG, PNG, or WebP images are allowed",
  10 * 1024 * 1024
);

export const uploadLectureVideo = createUploader(
  videoMimeTypes,
  "Only MP4, WebM, or MOV videos are allowed",
  100 * 1024 * 1024
);
