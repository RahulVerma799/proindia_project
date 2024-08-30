import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import axios from "axios";
import {useSelector} from "react-redux"
import { authActions } from '../store/auth'; 

const Signup = () => {
  const history=useNavigate();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn===true){
    history("/")}
  const [Data,setData]=useState({username:"",email:"",password:"",confrimPassword:""})
  
  const change=(e)=>{
    const {name,value}=e.target;
    setData({...Data,[name]:value});
  }

  const submit=async()=>{
    if(Data.username==="" || Data.email==="" || Data.password==="" ||Data.confrimPassword===""){
      alert("All field is required")
    }else{
      try {
        const response = await axios.post("http://localhost:3000/api/signup", Data);
        console.log(response);
        alert(response.data.message);
        history("/login")
      } catch (error) {
        const errorMsg = error.response?.data?.message ;
        alert(errorMsg);
        //alert("There was an error during signup. Please try again later.");
      }
    }
  }

  return (
    <div className='h-[98vh] flex items-center justify-center'>

        <div className='p-4 w-1/3 rounded bg-gray-800'>
        <div className='text-center text-3xl'>Signup</div>
        <input type="text" name='username' value={Data.username} required onChange={change} placeholder='username' className='bg-gray-600 px-3 py-2 my-3 w-full'/>
        <input type="email" name='email' value={Data.email} required onChange={change} placeholder='email' className='bg-gray-600 px-3 py-2 my-3 w-full'/>
        <input type="password" name='password' value={Data.password} required onChange={change} placeholder='password' className='bg-gray-600 px-3 py-2 my-3 w-full'/>
        <input type="password" name="confrimPassword" value={Data.confrimPassword} required onChange={change} placeholder='confrimPassword' className='bg-gray-600 px-3 py-2 my-3 w-full'/>
        <div className='w-full flex items-center gap-4'>
        <button className='bg-amber-600 px-8 py-2 rounded-lg ' onClick={submit}>Signup</button>
        <Link className='text-rose-500' to="/Login">Already have account </Link>
        </div>
        </div>
    </div>
  )
}

export default Signup