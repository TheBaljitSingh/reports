import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

export async function connectDB() {

  console.log(process.env.MONGO_URI);
  
  mongoose.connect(
    process.env.MONGO_URI
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));
}