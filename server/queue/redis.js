import IORedis from "ioredis";
import { configDotenv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root explicitly, regardless of cwd
configDotenv({ path: path.resolve(__dirname, "../.env") });


console.log("printing",process.env.REDIS_ENDPOINT);
export const redisClient= ()=> {

    return new IORedis(process.env.REDIS_URL);

}
