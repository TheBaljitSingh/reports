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
  const url = process.env.REDIS_URL;
  if (url) {
    const isRediss = url.startsWith("rediss://");
    return new IORedis(url, {
      maxRetriesPerRequest: null,
      tls: isRediss ? {} : undefined,
    });
  }

  const useTls = String(process.env.REDIS_TLS || "false").toLowerCase() === "true";
  return new IORedis({
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    host: process.env.REDIS_HOST || "127.0.0.1",
    password: process.env.REDIS_PASSWORD,
    maxRetriesPerRequest: null,
    tls: useTls ? {} : undefined,
  });

};

