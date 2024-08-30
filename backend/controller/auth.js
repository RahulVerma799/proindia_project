const bcrypt=require("bcrypt")
const user=require("../model/user")
const jwt=require("jsonwebtoken");

require("dotenv").config();

exports.signup=async(req,res)=>{
    try{
        const {username,email,password,confrimPassword}=req.body;

        const existUser=await user.findOne({email});
        if(existUser){
            return res.status(400).json({
                success:false,
                message:"User already exits",
            });
        }
        if(password !==confrimPassword){
            return res.status(401).json({
                success:false,
                message:"user pssword not match"
            })
        }

        let hashpasword;
        try{
            hashpasword=await bcrypt.hash(password,8);

        }
        catch(error){
            return res.status(402).json({
                success:false,
                message:"password hash has error",
            })
        }

        const newUser= await user.create({
            username,email,password:hashpasword
        })

        return res.status(200).json({
            success:true,
            message:"newUser created",
        });

    }
    catch(error){
        console.error(error)
        return res.status(500).json(
            {
                success:false,
                message:"user not registered",
            }
        )

        
    }
}

exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({
                success:false,
                message:"email and password not filled",
            })
        }

        const newUser=await user.findOne({email});
        if(!newUser){
            return res.status(401).json({
                success:false,
                message:"user is not registered"
            })
        }
        const payload={
            email:newUser.email,
            id:newUser._id
        };



        if(await bcrypt.compare(password,newUser.password)){
            let token=jwt.sign(payload,process.env.JWT_URL,{expiresIn:"2h"})
        

                newUser.token=token;

                newUser.password=undefined;
                const options={
                expires:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
                }
        res.cookie("token",token,options).status(200)
        .header("Authorization", `Bearer ${token}`) 
        .json({
            success:true,
            token,
            newUser,
            message:"true user login Successfully",
        })
    }
    
    else{
        return res.status(403).json({
            success:false,
            message:"password incorrect"
        })
    }
}
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"login failure",
        })

    }
}