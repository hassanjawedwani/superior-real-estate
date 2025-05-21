import React, { useEffect, useState } from 'react'
import { Lock, Mail } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import axiosInstance from '../../../services/axiosInstance';
import { Link } from 'react-router';




const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const customLoginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance("/api/auth/login");
      console.log(response);
    } catch (err) {
      toast(err.response.data.message || err.message || "Something went wrong!");
    } 
  }


  const inputHandler = (e) => setFormData(prevData => ({...prevData, [e.target.name]: e.target.value}))

  return (
    <div className='min-h-[calc(100vh-56px)] w-full p-5 flex items-center justify-center'>
      <div className='w-96  bg-white rounded-md p-5 shadow border border-gray-400 '>
        <h1 className="text-center text-2xl font-medium mb-7">Login</h1>

        {/* <button className='hover:cursor-pointer bg-white border border-gray-400 w-full text-lg rounded-full h-12 flex items-center justify-center gap-2 shadow hover:bg-gray-100' onClick={googleHandler}>
          <FcGoogle />
          <p className='text-xl font-medium text-slate-800'>Google</p>
        </button> */}
        

        {/* <div className='flex items-center my-5'>
            <div className='border-t border-t-gray-400 flex-1'></div>
            <div className='text-gray-500 shrink-0 mx-2'>or continue with</div>
            <div className='border-t border-t-gray-400 flex-1'></div>
        </div> */}

        
        {/* Custom Login Form */}
        <form onSubmit={customLoginHandler}>
          <div className='border border-gray-400 rounded-full flex items-center px-3 py-1 gap-2 overflow-hidden focus-within:border-red-500'>
            <Mail />
            <input type='email' name='email' value={formData.email} onChange={inputHandler} placeholder='Email' className=' w-full h-8 outline-none' required/>
          </div>
          <div className='border border-gray-400 rounded-full flex items-center px-3 py-1 gap-2 overflow-hidden focus-within:border-red-500 mt-4'>
            <Lock />
            <input type='password' name="password" value={formData.password} onChange={inputHandler} placeholder='Password' className='w-full h-8 outline-none' required/>
          </div>

          <p className='mt-3 pl-2 text-sm'>Dont have Account? <Link to="/signup" className='text-blue-600  hover:text-blue-400 '>Create Account</Link></p>

          <button type='submit' className='bg-red-500 hover:bg-red-400 text-lg text-white text-semibold px-6 py-1 rounded mt-5 mx-auto block'>Login</button>
        </form>
        
      </div>
    </div>
  )
}

export default Login