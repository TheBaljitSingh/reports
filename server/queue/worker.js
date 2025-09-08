import { tryCatch, Worker } from "bullmq";
import IORedis from "ioredis"
import fs from "fs";
import csv from "csv-parser"
import { promisify } from "util";
const unlinkAsync = promisify(fs.unlink);
import { redisClient } from "./redis.js"
import { Readable } from "stream";
import mongoose from "mongoose";
import moment from "moment";

import { connectDB } from "../config/db.js"


import Report from "../models/reports.js";
await connectDB();

console.log("redisClient",redisClient);

const worker = new Worker("reportQueue", async (job) => {
    //only using for "process-report"

    const { fileUrl } = job.data;
    console.log("file url", fileUrl);
    const rows = [];

    await new Promise(async (resolve, reject) => {
        const response = await fetch(fileUrl);
        console.log(response.body);
        Readable.fromWeb(response.body)
            .pipe(
                csv({
                    // Trim BOM and whitespace from headers, and trim values
                    mapHeaders: ({ header }) => header?.replace(/^\uFEFF/, "").trim(),
                    mapValues: ({ value }) => (typeof value === "string" ? value.trim() : value)
                })
            )
            .on("data", row => {
                console.log("Row:", row); // 👀 see the keys
                rows.push(row)
            })
            .on("end", resolve)
            .on("error", reject);
    });

    const total = rows.length;
    let processed = 0;



        // normalize month string into MM-YYYY
        function normalizeMonth(monthStr) {
        // try MM-YYYY (e.g. 05-2025)
        let m = moment(monthStr, ["MM-YYYY", "MMM-YYYY", "MMMM-YYYY","MMM-YY","MMMM-YY","YYYY-MM"], true);
        if (!m.isValid()) {
            throw new Error(`Invalid month format: ${monthStr}`);
        }
        return m.format("MM-YYYY"); 
        }

    
    for (let i = 0; i < total; i++) {
        console.log("rows[i]", rows[i]);
        let { ngoId, month, peopleHelped, eventsConducted, fundsUtilized} = rows[i];
        if(!month || !peopleHelped || !eventsConducted || !fundsUtilized){
            throw new Error("one or more required field is missing");
        }
          const normalizedMonth = normalizeMonth(month);

          console.log(normalizedMonth);

            const ngoObjectId = new mongoose.Types.ObjectId(ngoId);
            // Convert numeric strings → numbers
            const people = Number(peopleHelped);
            const events = Number(eventsConducted);
            const funds = Number(fundsUtilized);

            //just to simulate the delay
            await new Promise((resolve, reject)=>setTimeout(resolve, 3000));
          

        try {
            await Report.updateOne(
                { ngoId: ngoObjectId, month:normalizedMonth },
                { $set: {ngoId, month:normalizedMonth, peopleHelped:people, eventsConducted:events, fundsUtilized:funds } },
                { upsert: true }
            );

            processed++;
            
        } catch (error) {
            console.error("Row failed", i, error);
        }
        
        await job.updateProgress({ 
            processed: processed, // sucessfully processed rows
            total: total, //total row in csv
            current: i + 1, //current row
            failed: (i+1) - processed // failed row
        });
    }


    //job.returnvalue
    return {
        totalRows: total,
        processedRows: processed,
        failedRows: total - processed,

    }

}, { connection: redisClient });//will take as connection for redis

worker.on("ready", () => {
    console.log("worker is started");
})

worker.on("completed", async (job) => {

    console.log(`Job ${job.id} completed.`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed:`, err);
});