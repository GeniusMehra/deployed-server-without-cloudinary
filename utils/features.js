import jwt from "jsonwebtoken"

export const sendCookie=(res,user,statusCode,message)=>{
    try {
        const token=jwt.sign({
            _id:user._id
        },process.env.JWT_SECRET)
    
        res.status(statusCode)
        .cookie("token",token,{
            httpOnly:true,
            maxAge:15*60*1000,
            sameSite: process.env.DEVELOPMENT==='GOING'?"lax": "none",
            secure: process.env.DEVELOPMENT==='GOING'?false:true
        }).json({
            success:true,
            message:"message",
            user:[user]
        })
    } catch (error) {
        console.log(error)
    }
}