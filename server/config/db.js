import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

//evn is not working here fix it later
const mongo = process.env.MONGO_URI || "mongodb://localhost:27017/reports";


export async function connectDB() {
  try {
    console.log("env: ", mongo);

    await mongoose.connect(mongo);

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // stop app if db not connected
  }
}
