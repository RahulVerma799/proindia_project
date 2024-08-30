import React, { useEffect, useState } from 'react';
import Cards from '../component/Cards';
import { IoMdAddCircle } from 'react-icons/io';
import InputData from '../component/InputData';
import axios from 'axios';

const Alltask = () => {
  const [inputDiv, setInputDiv] = useState('hidden');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [updateData,setUpdateData]=useState({id:"",title:"",desc:""})

  const headers = {
    id: localStorage.getItem('id'),
    token: `Bearer ${localStorage.getItem('token')}`,
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getAlltask', { headers });
      if (response.data.success) {
        setData(response.data.data.tasks);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      setError('Failed to retrieve tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const refreshTasks = () => {
    fetchTasks(); // Call the function to refresh tasks
  };

  return (
    <>
      {error && (
        <div className='text-red-500'>
          {error} {/* Display error messages */}
        </div>
      )}

      <div>
        <div className='w-full flex justify-end p-4'>
          <button onClick={() => { setInputDiv('fixed'); }}>
            <IoMdAddCircle className='text-2xl hover:cursor-pointer hover:text-gray-600 transition-all scale-150 duration-300' />
          </button>
        </div>
        <Cards setInputDiv={setInputDiv} data={data} setData={setData} updateData={updateData} setUpdateData={setUpdateData}/>
      </div>

      <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} onTaskCreated={refreshTasks} setUpdateData={setUpdateData}/>
    </>
  );
}

export default Alltask;
