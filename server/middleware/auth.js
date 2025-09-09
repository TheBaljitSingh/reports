import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const isAuthenticated = async(req, res, next)=>{

    try {
        //takin from header also
        const token = req.cookies.token || req.headers['token'].split(" ")[1]; //taking bearer token
        console.log(token);

        if(!token){
            return res.status(401).json({ message: "Unauthorized, no token provided" });

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        req.user = user; 

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Invalid or expired token"});
        
    }

}
