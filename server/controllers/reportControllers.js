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

        const newReport = new Report({
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
        const job = await addJobToQueue(result.secure_url);//calling queue file form here

        return res.status(200).json({messsage:"processing csv", jobId: job.id});
    
    } catch (error) {
    console.log("error in uploadcsvreport controller", error);
    return res.status(500).json({message:`server error: ${error.message}`})
    
}

}

export const getDashboardData = async (req, res) => {
    try {
        const { month, page=1, limit=1 } = req.query;

        const offset = (page-1)*limit;        

        // Build match stage for month filtering
        const filter = month ? { month } : {};
        
        //implemented pipeline here
       const reportData = await Report.find(filter).populate({path:"ngoId", select: "name email region"})
       .skip(Number(offset))
       .limit(Number(limit))
       .lean() // it convert to plain js object
       
       const formattedReports = reportData.map(r=>({
        ...r,
        ngo:r.ngoId,
        ngoId: undefined
       }));        
        // Calculate totals
        const totals = await Report.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: null,
                    totalPeopleHelped: { $sum: "$peopleHelped" },
                    totalEventsConducted: { $sum: "$eventsConducted" },
                    totalFundsUtilized: { $sum: "$fundsUtilized" }
                }
            }
        ]);

        return res.status(200).json({ 
            message: "dashboard data", 
            month: month || "all",
            page: Number(page),
            limit: Number(limit),
            totalNGOs: await Report.countDocuments(filter),
            totalPeopleHelped: totals[0]?.totalPeopleHelped || 0,
            totalEventsConducted: totals[0]?.totalEventsConducted || 0,
            totalFundsUtilized: totals[0]?.totalFundsUtilized || 0,
            reportData: formattedReports
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

export const getReportStatus = async(req, res) => {
    try {
        const {jobId} = req.params;
        
        const job = await getJobStatus(jobId);        
        return res.status(200).json({...job});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"});

    }

}
