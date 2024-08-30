const express=require("express")
const route=express.Router()
const {authenticateToken}=require("../middleware/authtoken")

const {createtask, getAlltask, deletetask,updateTask, todotasks, taskdone,taskprogress}=require("../controller/task")

route.post("/createtask",authenticateToken,createtask)
route.get("/getAlltask",authenticateToken,getAlltask)
route.delete("/deletetask/:id",authenticateToken,deletetask)
route.put("/updateTask/:id",authenticateToken,updateTask)
route.put("/todotask/:id",authenticateToken,todotasks)
route.get("/taskdone",authenticateToken,taskdone)
route.get("/taskprogress",authenticateToken,taskprogress)

module.exports=route