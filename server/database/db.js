import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    if (!process.env.DB) {
      console.error("[Database Error] process.env.DB environment variable is missing on server!");
      return;
    }
    await mongoose.connect(process.env.DB);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("[Database Connection Error]:", error.message);
  }
};

