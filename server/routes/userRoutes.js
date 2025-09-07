import express from "express"
import User from "../models/user.js"
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../middleware/auth.js";
const router = express.Router();


//to speedup the process i'm handing response here
// i can also use it in the controller
router.post("/register", async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Account already registered" });
        }

        const newUser = new User({
            name, email, password
        });

        const savedUser = await newUser.save();

        return res.status(201).json({
            message: "successfully created",
            user: savedUser
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({ message: "field is missing" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ message: "invalid credentials" });
        }

        const isMatched = await user.verifyPassword(password);

        if (!isMatched) {
            return res.status(404).json({ message: "invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1hr" });

        res.cookie("token", token, {
            httpOnly: true, //not acced by document.cookies
            secure: process.env.NODE_ENV==='production', //in prod only
            sameSite: "None", //csrf
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        })

        return res.status(200).json({
            message: "Login successful",
            userId: user._id,
            token
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to login",
            error: error?.message,
        });


    }



})

router.get("/me", isAuthenticated, async (req, res)=>{
    return res.status(200).json({message:"my profile", user:req.user});    
})

router.post("/logout", async (req, res) => {
  try {
    return res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:"None",
      maxAge: 0,
      path: '/'  
    }).status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
})

export default router;