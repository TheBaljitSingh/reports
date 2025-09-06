import express from "express";
import ngo from "../models/ngo.js";
const router = express.Router();

//just to fast the development used here controller
router.post("/insert-ngo", async(req, res)=>{
    try {
        const {name, region, email} = req.body;

        const ngoData = new ngo({
            name,
            region,
            email
        })

        const savedNgo  = await ngoData.save();
        return res.status(201).json({
            message: "NGO inserted successfully",
            savedNgo,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"});
                
    }


})

export default router;