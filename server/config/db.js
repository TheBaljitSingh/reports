import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root explicitly, regardless of cwd
configDotenv({ path: path.resolve(__dirname, "../.env") });

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
