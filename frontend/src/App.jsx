import React, { useEffect } from 'react'
import Home from "./pages/Home"
import Alltask from './pages/Alltask'
import { authActions } from './store/auth'; 
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router,Routes,Route, useNavigate} from "react-router-dom"

import Signup from './pages/Signup'
import Login from './pages/Login'
import {useSelector} from "react-redux"


const App = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);
  console.log(isLoggedIn)
 useEffect(()=>{
  if(localStorage.getItem("id") && localStorage.getItem("token")){
    dispatch(authActions.login());
  } if(isLoggedIn===false){
    navigate("/signup")}

 },[])
  
  return (
    <div className='bg-gray-900 p-2 text-white h-screen relative'>
      
        <Routes>
          <Route exact path='/' element={<Home/>}>
         <Route index element={<Alltask/>}/> 
        
        
         </Route>

         <Route path="/signup" element={<Signup/>}/>
         <Route path="/login" element={<Login/>}/>

         
         

      </Routes>
      

      </div>
  )
}

export default App