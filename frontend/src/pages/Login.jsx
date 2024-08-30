import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { authActions } from '../store/auth'; 
import { useDispatch } from 'react-redux';
import {useSelector} from "react-redux"

const Login = () => {
  const [Data,setData]=useState({email:"",password:""})
  const history=useNavigate();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn===true){
    history("/")}

  
  const dispatch=useDispatch();
  const change=(e)=>{
    const {name,value}=e.target;
    setData({...Data,[name]:value});
  }

  const submit=async()=>{
    if(Data.email==="" || Data.password===""){
      alert("All field is required")
    }else{
      try {
        const response = await axios.post("http://localhost:3000/api/login", Data);
        setData({email:"",password:""});
        console.log(response);
        localStorage.setItem("id",response.data.newUser._id);
        localStorage.setItem("token",response.data.token);
        //alert(response.data.message);

        dispatch(authActions.login());
        history("/")
       
      } catch (error) {
        console.error(error);
       const errorMsg = error.response?.data?.message ;
      alert(errorMsg);
        
      }
    }
  }


  return (
    <div className='h-[98vh] flex items-center justify-center'>

    <div className='p-4 w-1/3 rounded bg-gray-800'>
    <div className='text-center text-3xl'>Login</div>
   
    <input type="email" name='email' value={Data.email} required onChange={change} placeholder='email' className='bg-gray-600 px-3 py-2 my-3 w-full'/>
    <input type="password"  name='password' value={Data.password} required onChange={change} placeholder='password' className='bg-gray-600 px-3 py-2 my-3 w-full'/>
    <div className='w-full flex items-center gap-4'>
    <button className='bg-amber-600 px-8 py-2 rounded-lg ' onClick={submit}>Login</button>
    <Link className='text-rose-500' to="/signup">Not having an account? signup</Link>
    </div>
    </div>
</div>
  )
}

export default Login