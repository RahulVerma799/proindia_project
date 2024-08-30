import React from 'react'
import Sidebar from '../component/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex h-[98vh] gap-4'>
        <div className=' w-1/6 border border-cyan-400 rounded-xl p-3 flex flex-col justify-between'>
        <Sidebar/></div>
        <div className=' w-5/6 border border-cyan-600 rounded-xl p-3'><Outlet/></div>
    </div>
  )
}

export default Home