import React from 'react';
import { GrDocumentUpdate } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";


const getHeaders = () => ({
  headers: {
    id: localStorage.getItem('id'),
    token: `Bearer ${localStorage.getItem('token')}`,
  }
});

const Cards = ({ setInputDiv, data, setData,setUpdateData}) => {

  
  const updateHandle = async (id,title,desc) => {
    // try {
    //   const response = await axios.put(`http://localhost:3000/api/updateTask/${id}`, {}, getHeaders());
    //   alert(response.data.message);
     
    // } catch (error) {
    //   console.error('Error updating task:', error);
    // }
    setInputDiv("fixed")
    setUpdateData({id:id,title:title,desc:desc})
  };

  
  const deletetask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/deletetask/${id}`, getHeaders());
      alert(response.data.message);
      
     
      setData(prevData => prevData.filter(item => item._id !== id));
      
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

//   const updateHandle=async(id)=>{
//     try {
//         const response = await axios.delete(`http://localhost:3000/api/deletetask/${id}`, getHeaders());
//         alert(response.data.message);
        
       
//         setData(prevData => prevData.filter(item => item._id !== id));
        
//       } catch (error) {
//         console.error('Error deleting task:', error);
//       }

//   }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data.map((items) => (
        <div key={items._id} className='flex flex-col justify-between border bg-gray-600 border-x-cyan-200 rounded-lg p-3'>
          <div>
            <h3>{items.title}</h3>
            <p className="mt-2 overflow-auto max-h-44 break-words">{items.desc}</p>
          </div>
          <div className='mt-4 w-full flex items-center'>
            <button onClick={() => handletask(items._id)} className='bg-orange-600 p-2 font-bold rounded-lg w-3/6 mt-2'>
              {items.complete ? "Done" : "Progress"}
            </button>
            <div className='text-white bg-gray-600 p-2 w-3/6 text-2xl font-semibold flex justify-around'>
              <button onClick={()=>updateHandle(items._id,items.title,items.desc)}>
                <GrDocumentUpdate />
              </button>
              <button onClick={() => deletetask(items._id)}>
                <MdOutlineDelete />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => setInputDiv("fixed")} className='flex flex-col justify-center items-center border bg-gray-600 border-x-cyan-200 rounded-lg p-3'>
        <IoMdAddCircle className='text-5xl hover:cursor-pointer' />
        <h2 className='text-2xl mt-3 hover:cursor-pointer'> Add task </h2>
      </button>
    </div>
  );
}

export default Cards;
