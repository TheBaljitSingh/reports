import Report from "../models/reports.js";
import {generateRandomId} from "../utils/generate.js"
import { addJobToQueue, getJobStatus } from "../queue/queue.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs"


export const uploadSingleReport = async (req, res) => {
    try {

        const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = req.body;

        if (!ngoId || !month || !peopleHelped || !eventsConducted || !fundsUtilized) {
            return res.status(400).json({ message: "required field is missing or invallid" });

        }

        const newReport = new reports({
            ngoId,
            month,
            peopleHelped,
            eventsConducted,
            fundsUtilized

        })
        const createdReport = await newReport.save();

        return res.status(201).json({ message: "created report", createdReport });


    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "internal server error" });
    }



}

export const uploadCsvReport = async(req, res) => {

try {
        //push random id to queue, with status updating.
        if(!req.file){
            return res.status(400).json({ error: "csv file required" });
    
        }
        
        console.log(req.file);

        const result = await uploadOnCloudinary(req.file.path, {folder:"reports_file"});
        console.log(result);
        fs.unlinkSync(req.file.path);
        //passing direct url
        const job = await addJobToQueue({fileUrl: result.secure_url});//calling queue file form here

        return res.status(200).json({messsage:"processing csv", job});
    
    } catch (error) {
    console.log("error in uploadcsvreport controller", error);
    return res.status(500).json({message:`server error: ${error.message}`})
    
}

}

export const getDashboardData = async (req, res) => {
    try {

        //implemented pipeline here
        const reportData = await Report.aggregate([
            {
                $lookup:{
                    from:"ngos",
                    localField:"ngoId",
                    foreignField:"_id",
                    as:"ngo",
                }
            },
            {
                $unwind:"$ngo"
            }
        ]);

        const reportLength = await Report.countDocuments();



        return res.status(200).json({ message: "dashboard data", length: reportLength,reportData });




    } catch (error) {

    }
}

export const getReportStatus = async(req, res) => {
    try {
        const {jobId} = req.params;
        console.log("params",jobId);
        
        const job = await getJobStatus(jobId);        
        return res.status(200).json({...job});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"});

    }

}
