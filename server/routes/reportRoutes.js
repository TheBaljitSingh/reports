import express from "express";
import multer from "multer" 
import {uploadSingleReport, uploadCsvReport,getDashboardData, getReportStatus} from "../controllers/reportControllers.js"
import {isAuthenticated} from "../middleware/auth.js"
const router = express.Router();

import {upload}  from "../middleware/multer.js"


                    
router.post("/report", uploadSingleReport);
router.post("/reports/upload", upload.single("file"), uploadCsvReport);
router.get("/dashboard", isAuthenticated, getDashboardData); 
router.get("/job-status/:jobId", getReportStatus); 

export default router;