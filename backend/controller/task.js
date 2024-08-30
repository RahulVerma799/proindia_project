const task=require("../model/task")
const user=require("../model/user")


exports.createtask=async(req,res)=>{
    try{
        const {title,desc}=req.body;
        const {id}=req.headers;
        if(!title || !desc){
            return res.status(400).json({
                success:false,
                message:"all field is required",
            })
        }

      const newTask=new task({title:title,desc:desc});
      const saveTask=await newTask.save();
      const taskId=saveTask._id;
      await user.findByIdAndUpdate(req.user.id,{$push:{tasks:taskId._id}})
       res.status(200).json({success:true,message:"task created"})


    }catch(error)
    {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create task",
        });
    }
}

exports.getAlltask=async(req,res)=>{
    try{
        const {id}=req.headers;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required", 
            });
        }
        const userData= await user.findById(id).populate({path:"tasks",options:{sort:{createdAt:-1}}})
        
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: "User not found", 
            });
        }
        return res.status(200).json({
            success: true,
            data: userData, 
        });

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"error in getall task not retreive data",
        })
    }

}
exports.updateTask=async(req,res)=>{
    try{

        const {id}=req.params;
        const {title,desc}=req.body;
        await task.findByIdAndUpdate(id,{title:title,desc:desc});
        return res.status(200).json({
            success:true,
            message:"task update successfully"
        })
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"update task problem",
        })
    }
}

exports.todotasks=async(req,res)=>{
    try{
        const {id}=req.params;
        const taskdata=await task.findById(id);
        const completeTask=taskdata.complete;
        await task.findByIdAndUpdate(id,{complete:!completeTask});
        return res.status(200).json({
            message:"task updated Successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in getall task"
        })

    }
}

exports.taskdone=async(req,res)=>{
    try{
        const {id}=req.headers;
        const Data=await user.findById(id).populate({
            path:"tasks",
            match:{complete:true},
            options:{sort:{createdAt:-1}},
        });

        const completedata=Data.tasks;
        return res.status(200).json({
            data:completedata
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in getall task"
        })
    }
}

exports.taskprogress=async(req,res)=>{
    try{
        const {id}=req.headers;
        const Data=await user.findById(id).populate({
            path:"tasks",
            match:{complete:false},
            options:{sort:{createdAt:-1}},
        });

        const completedata=Data.tasks;
        return res.status(200).json({
            data:completedata
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"error in getall task"
        })
    }
}

exports.deletetask=async(req,res)=>{
    try{
        const {id}=req.params;
        const userId=req.headers.id;
        await task.findByIdAndDelete(id)
        await user.findByIdAndUpdate(userId,{$pull:{tasks:id}});

        res.status(200).json({
            message:"task deleted successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"unable to delete task in deletetask problem"
        })
    }
}