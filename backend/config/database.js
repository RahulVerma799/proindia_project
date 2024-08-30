const mongoose=require("mongoose")

require("dotenv").config();

exports.connectDb=()=>{
    mongoose.connect(process.env.MONGO_URL,{}
)
.then(()=>{console.log("db connected successfuly")})
.catch((error)=>{
    console.log("db connection issues");
    console.error(error);
})
}