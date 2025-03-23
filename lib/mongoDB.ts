import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

let isConnected = false; // Track connection status

export const connectDB = async () => {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);

    isConnected = connection.readyState === 1;
    console.log("=> Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    throw new Error("Database connection failed");
  }
};
