import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth'; 
import { useDispatch } from 'react-redux';
import axios from "axios"


const Sidebar = () => {
  const dispatch=useDispatch()
  const history=useNavigate()
  const data=[
    {
      title:"todo task ",
      link:"/"

    },
   
   
  ]

  const [Data,setData]=useState()
  const logout=()=>{
      dispatch(authActions.logout());
      localStorage.clear("id");
      localStorage.clear("token");
      history("/signup")
  }
  const headers = {
    id: localStorage.getItem("id"),
    token: `Bearer ${localStorage.getItem("token")}`
  };
 
  useEffect(() => {
    const fetch = async () => {
     
      
      try {
        console.log('Sending request with headers:', headers);
        const response = await axios.get("http://localhost:3000/api/getAlltask", { headers });
        setData( response.data.data);
      } catch (error) {
        console.error(  error.message);
      }
    };
  
    fetch();
  }, []);

  return (
    <>
      {Data && (
        <div>
            <h2 className='text-xl font-semibold'>{Data.username}</h2>
            <h4>{Data.email}</h4>
            <hr/>
        </div>
      )}

        <div >
            {data.map((items,i)=>
            (<Link to={items.link} key={i} className='my-4 flex items-center hover:bg-slate-300 p-2 rounded transition-all duration-300'>
              {items.title}</Link>))

            }
        </div>

        <div>
        <button className='bg-orange-600 w-full p-2 rounded-3xl' onClick={logout} >Log-Out</button>
        </div>
       
    </>
  )
}

export default Sidebar