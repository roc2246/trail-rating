import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export async function connectDB(): Promise<void> {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables");
    }

    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }

    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();

  console.log("MongoDB disconnected");
}