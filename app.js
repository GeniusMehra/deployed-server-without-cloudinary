import express from "express";
import connectDB from './data/database.js'
import { config } from "dotenv";
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

config({
    path:'./data/config.env'
})

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(userRouter)
app.use("/task",taskRouter)


connectDB()


app.get("/",(req,res)=>{
    res.send("Helo world")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on Port ${process.env.PORT} in ${process.env.DEVELOPMENT} mode`)
})