import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import {connectCloudinary} from "./utils/cloudinary.js"
import cors from "cors";

configDotenv();



const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.FRONTEND_URL, // Allow only requests from this origin
    methods: 'GET,POST, PUT, DELETE', // Allow only these methods
    // credentials: true 
};

app.use(cors("*"));

app.use(express.json());

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