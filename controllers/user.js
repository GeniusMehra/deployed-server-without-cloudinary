import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/features.js";

export const Register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
    // console.log(name)
    let user=await User.findOne({email})
    if(user){
        return res.status(400).json({
            success:false,
            message:"The user already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    // console.log(hashedPassword)
    user=await User.create({
        name,email,password:hashedPassword
    })

    sendCookie(res,user,200,"User created")
    } catch (error) {
        console.log(error)
    }
}


export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
    let user=await User.findOne({email}).select("+password")
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(404).json({
            success:false,
            message:"password is wrong"
        })
    }

    sendCookie(res,user,200,"Logged In")
    } catch (error) {
        console.log(error)
    }
}

export const getMyProfile=async(req,res)=>{
    
    try {
        res.status(200).json({
            success:true,
            message:"DOne successfully see Profiel",
            user:req.user
        })
    } catch (error) {
        console.log(error)
    }

}

export const logout=(req,res)=>{
    try {
        res.status(200).
    cookie("token","",{
        sameSite: process.env.DEVELOPMENT==='GOING'?"lax": "none",
            secure: process.env.DEVELOPMENT==='GOING'?false:true,
        expires:new Date(Date.now())})
    .json({
        success:true,
        user:req.user
    });
    } catch (error) {
       console.log(error) 
    }
}