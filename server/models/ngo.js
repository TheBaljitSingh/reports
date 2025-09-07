import mongoose from "mongoose";
const ngoSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    region:{
        type:String,
    },
    email:{
        type: String,
        require:true,
    }
},{timestamps:true});

export default mongoose.model('Ngo', ngoSchema);