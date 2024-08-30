import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

const InputData = ({ inputDiv, setInputDiv, onTaskCreated, updateData ,setUpdateData}) => {
    const headers = {
        id: localStorage.getItem('id'),
        token: `Bearer ${localStorage.getItem('token')}`,
    };

    const [data, setData] = useState({ title: "", desc: "" });

    useEffect(() => {
        if (updateData) {
            setData({
                title: updateData.title || "",
                desc: updateData.desc || ""
            });
        }
    }, [updateData]);

    const change = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const submitHandle = async () => {
        if (data.title === "" || data.desc === "") {
            alert("All fields are required");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/createtask", data, { headers });
            if (response.data.success) {
                onTaskCreated(); 
                setInputDiv("hidden");
                setData({ title: "", desc: "" }); 
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message);
            alert("Failed to create task");
        }
    };

    return (
        <>
            <div className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-70 h-screen w-full`}></div>
            <div className={`${inputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-2/6 bg-gray-800 p-4 rounded-lg'>
                    <button className='text-xl mb-2 text-white cursor-pointer' onClick={() => setInputDiv("hidden")}>
                        <IoCloseSharp />
                    </button>
                    <input
                        type="text"
                        placeholder='Title'
                        name="title"
                        className='px-3 py-2 rounded w-full bg-slate-600'
                        value={data.title}
                        onChange={change}
                    />
                    <textarea
                        name='desc'
                        cols="20"
                        rows="10"
                        placeholder='Description'
                        className='px-3 py-2 rounded w-full mt-2 bg-slate-600'
                        value={data.desc}
                        onChange={change}
                    ></textarea>
                    <button className='px-3 py-2 bg-orange-700 w-full mt-2 rounded-lg' onClick={submitHandle}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}

export default InputData;
