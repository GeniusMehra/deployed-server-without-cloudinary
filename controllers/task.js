import Task from "../models/task.js";

export const newTask=async(req,res)=>{
   try {
    const {title,description}=req.body;

    await Task.create({
        title:title,description:description,user:req.user,
    })
    res.status(201).json({
        success:true,
        message:"Task created"
    })
   } catch (error) {
    console.log(error)
   }

}

export const allTasks=async(req,res)=>{

 try {
    const tasks=await Task.find({user:req.user._id})
    if(!tasks){
        return res.status(404).json({
            success:false,
            message:"User Id doesn't exist"
        })
    }
    res.status(201).json({
        success:true,
        tasks
    })

 } catch (error) {
console.log(error)    
 }
}

export const updateTask=async(req,res)=>{
try {
    let task=await Task.findById(req.params.id);

    if(!task){
        return res.status(404).json({
            success:false,
            message:"User Id doesn't exist"
        })}
    task.isCompleted=!task.isCompleted;
    // console.log(task.isCompleted)
    // await task.updateOne({isCompleted:!task.isCompleted})
    await task.save()
    res.status(201).json({
        success:true,
        message:"Updated",
        task
    })
} catch (error) {
    console.log(error)
}
}


export const deleteTask=async(req,res)=>{
  try {
    const task=await Task.findById(req.params.id);
    if(!task){
        return res.status(201).json({
            success:false,
            message:"Task doesn't exist"
        })
    }

    await task.deleteOne()

    res.status(201).json({
        success:true,
        message:"Deleted"
    })
  } catch (error) {
    console.log(error)
  }
}