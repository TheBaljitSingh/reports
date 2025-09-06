import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import {connectCloudinary} from "./utils/cloudinary.js"
configDotenv();



const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

connectDB();
connectCloudinary();

app.get("/test", async(req, res)=>{
   
    return res.status(200).json({message:"server is working fine!"});
})


import reportRoute from "./routes/reportRoutes.js";
import ngoRoute from "./routes/ngoRoutes.js";

app.use("/api/v1", reportRoute);
app.use("/api/v1", ngoRoute);


app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server started on ",port);
} )