import mongoose from "mongoose";

let isConnected = false;

export const connectDb = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  try {
    if (!process.env.DB) {
      throw new Error("Database is not configured");
    }
    const db = await mongoose.connect(process.env.DB);
    isConnected = db.connections[0].readyState === 1;
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("[Database Connection Error]:", error.message);
    throw error;
  }
};

