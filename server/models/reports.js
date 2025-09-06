import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({

    ngoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"NGO",
        require:true
    },
    month:{ //yyyy-mm
        type:String,
        require:true,
        default:0
    },
    peopleHelped:{
        type:Number,
        require:true,

    },
    eventsConducted:{
        type:Number,
        require:true,
    },
    fundsUtilized:{
        type:Number,
        require:true

    }
},{timestamps:true});


// Compound unique index to ensure idempotency - why using compound index
reportSchema.index({ ngoId: 1, month: 1 }, { unique: true });

const Report = mongoose.model("Report", reportSchema);

export default Report;