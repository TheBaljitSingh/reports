import { Queue } from "bullmq";
import { redisClient } from "./redis.js";

const queue = new Queue("reportQueue", {
  connection: redisClient(),
});

const run = async () => {
  const job = await queue.add(
    "process-report",
    { fileUrl: "https://res.cloudinary.com/dzdt11nsx/raw/upload/v1757161338/csv_reports/file-1757161335263-890178356" },
    { jobId: "manual-1235" }
  );
  console.log("Added job:", job.id);
  process.exit(0);
};

run();
