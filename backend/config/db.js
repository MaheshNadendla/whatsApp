import mongoose from "mongoose";

const BASE_URL= process.env.NODE_ENV=="development" ? process.env.MONGODB_URI : process.env.MONGODB_URI_GLOBE ;
console.log("base url",BASE_URL)

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {});

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); 
  }
};

