import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_GLOBE;

export const connectDB = async () => {
  try {
    if (!BASE_URL) {
      throw new Error("MongoDB URI is missing");
    }

    const conn = await mongoose.connect(BASE_URL);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
