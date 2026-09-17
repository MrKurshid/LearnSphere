import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
};

export const uploadToCloudinary = async (filePath, folder = "learnsphere", options = {}) => {
  configureCloudinary();
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
      ...options,
    });

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
};

export const deleteFromCloudinary = async (publicIdOrUrl) => {
  configureCloudinary();
  try {
    if (!publicIdOrUrl) return;

    let publicId = publicIdOrUrl;
    if (publicIdOrUrl.includes("res.cloudinary.com")) {
      const parts = publicIdOrUrl.split("/");
      const uploadIdx = parts.indexOf("upload");
      if (uploadIdx !== -1) {
        const pathAfterUpload = parts.slice(uploadIdx + 2).join("/");
        publicId = pathAfterUpload.substring(0, pathAfterUpload.lastIndexOf("."));
      }
    }

    await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

export const getAuthenticatedVideoUrl = (publicId) => {
  configureCloudinary();
  return cloudinary.url(publicId, {
    resource_type: "video",
    type: "authenticated",
    sign_url: true,
    secure: true,
  });
};

export default cloudinary;
