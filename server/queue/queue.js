import { Queue } from "bullmq";
import { generateRandomId } from "../utils/generate.js";
import {redisClient} from "./redis.js"
//this will be redis client


export const reportQueue = new Queue("reportQueue",redisClient);

export const addJobToQueue = async(fileUrl, jobId)=>{
    //taking  as file
    //check what is comming
    console.log(fileUrl);
    const job = await reportQueue.add("reportQueue", fileUrl, {jobId: `csv_${await generateRandomId()}`});
    return job;
    
}


export const getJobStatus = async(id)=>{
    const job = await reportQueue.getJob(id);
    if(!job) return { error: "Job not found" };
    return {
        id: job.id,
        status: await job.getState(),
        progress: job.progress,
        result: job.returnvalue,
        data: job.data
    }
}