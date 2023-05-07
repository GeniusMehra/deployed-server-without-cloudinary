import express from "express";
import connectDB from './data/database.js'
import { config } from "dotenv";
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import passport from "passport";
import session from "express-session";
import { connectPassport } from "./utils/Providers.js";

config({
    path:'./data/config.env'
})

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use(userRouter)
app.use("/task",taskRouter)
app.use(session({ secret: 'catsss', resave: false, saveUninitialized: true }));

connectDB()


app.get("/",(req,res)=>{
    res.send("Helo world")
})

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();


app.get(
    "/googlelogin",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );
  
  app.get(
    "/login",
    passport.authenticate("google",{
      successRedirect:"https://google.com"
    }
    )
  );

app.listen(process.env.PORT,()=>{
    console.log(`Server is working on Port ${process.env.PORT} in ${process.env.DEVELOPMENT} mode`)
})