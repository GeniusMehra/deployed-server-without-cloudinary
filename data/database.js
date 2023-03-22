import mongoose from "mongoose";

 const connectDB=()=>{mongoose.connect(process.env.MONGO_URI,{
    dbName:"JustNow"
}).then((c)=>{console.log(`Database Connectd at ${c.connection.host}`)})
.catch((e)=>{console.log(e)})}

export default connectDB