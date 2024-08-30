const express=require("express")
const app=express();
const cors = require('cors');
app.use(cors());
const {authenticateToken}=require("./middleware/authtoken")


require("dotenv").config();
const PORT=process.env.PORT || 4000

app.use(express.json());

require("./config/database").connectDb();

//routes
const user =require("./routes/user");
app.use("/api",user)

//routes of task
const task=require("./routes/task")
app.use("/api",task)

app.listen(PORT,()=>{
    console.log(`app is liestening ${PORT}`);
})



