import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import {connectCloudinary} from "./utils/cloudinary.js"
import cors from "cors";
import cookieParser from "cookie-parser";


configDotenv({path:'.env'});

const app = express();

const port = process.env.PORT;

const corsOptions = {
    origin: process.env.FRONTEND_URL, // Allow only requests from this origin
    methods: 'GET,POST, PUT, DELETE', // Allow only these methods
    credentials: true  //allowing cookies to be sent
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());

connectDB();
connectCloudinary();

app.get("/test", async(req, res)=>{
   
    return res.status(200).json({message:"server is working fine!"});
})


import reportRoute from "./routes/reportRoutes.js";
import ngoRoute from "./routes/ngoRoutes.js";
import userRoute from "./routes/userRoutes.js"

app.use("/api/v1", reportRoute);
app.use("/api/v1", ngoRoute);
app.use("/api/v1/auth/", userRoute);


app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server started on ",port);
} )