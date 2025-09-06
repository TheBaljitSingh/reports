import { tryCatch, Worker } from "bullmq";
import IORedis from "ioredis"
import fs from "fs";
import csv from "csv-parser"
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink);
import {redisClient} from "./redis.js"
import { Readable } from "stream";
import mongoose from "mongoose";

import {connectDB} from "../config/db.js"


import Report from "../models/reports.js";
await connectDB();

const worker = new Worker("reportQueue", async (job) => {
    
    const { fileUrl } = job.data;
    console.log("file url", fileUrl);
    let processed = 0;

    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(fileUrl);
            
            Readable.fromWeb(response.body)
                .pipe(csv())
                .on("data", async (row) => {
                    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = row;
                    
                    try {

                        await Report.updateOne(
                            { ngoId: new mongoose.Types.ObjectId(ngoId), month },
                            { $set: {peopleHelped, eventsConducted, fundsUtilized } },
                            { upsert: true }
                        );
                        processed++;
                        job.updateProgress({ processed });
                    } catch (error) {
                        console.error("Row failed", row, error);
                    }
                })
                .on("end", () => resolve({ processed }))
                .on("error", reject);
        } catch (error) {
            reject(error);
        }
    });
}, { connection: redisClient });//will take as connection for redis

worker.on("ready", ()=>{
    console.log("worker is started");
})

worker.on("completed", async(job) => {

  console.log(`Job ${job.id} completed.`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});