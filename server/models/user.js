import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    role:{
        type: String,
        default:'user',
        enum:['user','admin']
    },
    password:{
        type:String,
        require:true,
        select:false
    }
});


userSchema.methods.verifyPassword = async function(password){
    return await bcrypt.compare(password, this.password); 
}

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

const User = mongoose.model("User", userSchema);

export default User;