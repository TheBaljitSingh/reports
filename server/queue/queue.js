import { Queue } from "bullmq";
import { generateRandomId } from "../utils/generate.js";
import {redisClient} from "./redis.js"
//this will be redis client


export const reportQueue = new Queue("reportQueue", {connection: redisClient()});

export const addJobToQueue = async(fileUrl)=>{
    //taking  as file
    //check what is comming
    console.log(fileUrl);
    const job = await reportQueue.add("process-report", {fileUrl}, {jobId: `csv_${await generateRandomId()}`, removeOnComplete:false, removeOnFail:false});
    return job;
    
}


export const getJobStatus = async(id)=>{
    const job = await reportQueue.getJob(id);
    if(!job) return { id, status: "not_found", progress: null };
    const state = await job.getState();

    return {
        id: job.id,
        status: state,
        progress: job.progress,
        result: job.returnvalue
    }
}