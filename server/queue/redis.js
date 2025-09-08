import IORedis from "ioredis";
import { configDotenv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

if (process.env.NODE_ENV !== "production") {
  // Only load .env locally
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  configDotenv({ path: path.resolve(__dirname, "../.env") });
}
// env is not wokring currently

export const redisClient = () => {
  console.log("Connecting to Redis:", process.env.REDIS_URL);
    return new IORedis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    tls: {}, // required for Redis Cloud
  });

};

