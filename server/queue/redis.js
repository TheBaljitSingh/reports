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

export const redisClient= ()=> {

    return new IORedis(process.env.REDIS_URL);

}
