import React, { useState } from 'react'
import { Lock, Mail } from 'lucide-react';
import { FaRegUser } from "react-icons/fa";
import axiosInstance from '../../../services/axiosInstance';
import { Link, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/features/user/userSlice';
import { FaUserCircle } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";



const ProfileEdit = () => {
  const user = useSelector(state => state.user);
  const initialFormState = {
    username: user.data?.username,
    email: user.data?.email,
    password: "",
    profilePhoto: user.data?.profilePhoto || ""
  };
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updateUserHandler = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
    const fd = new FormData();
    
    if (formData.profilePhoto) {
      fd.append("profilePhoto", formData.profilePhoto);
    }
    if (formData.password) {
      fd.append("password", formData.password);
    }
    
    fd.append("username", formData.username);
    fd.append("email", formData.email);
    
    for (let [key, value] of fd.entries()) {
      console.log(key, value);
    }
    
      const response = await axiosInstance.post("/api/auth/profile/edit", fd, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (!response.data?.success) {
        return toast.error(response.data?.message);
      }

      // update: send a message to mail about account creation
      toast.success(response.data?.message);
      // setFormData(initialFormState);
      // here is new user data for storing in redux
      const updatedUser = response.data?.user;
      console.log(updatedUser);
      dispatch(createUser(updatedUser));

      navigate("/profile");
    } catch (err) {
      console.log(err)
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  const profilePhotoHandler = (e) => {
    const photo = e.target.files[0];
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: photo
    }));
  }

  const inputHandler = (e) => setFormData(prevData => ({...prevData, [e.target.name]: e.target.value}));

  if(loading) return <p>Updating...</p>
  return (
    <div className='p-10'>
      <div className='max-w-xl mx-auto'>
        <h1 className='text-4xl font-bold my-7'>Edit your Profile</h1>

        <form onSubmit={updateUserHandler}>
          {console.log(formData)}
          <div className='w-32 h-32 rounded-full overflow-hidden mx-auto my-5 relative group'>
            {user.isAuthorized && (
              <>
                {formData.profilePhoto ? (
                  <img src={typeof formData.profilePhoto === "string" ? formData.profilePhoto : URL.createObjectURL(formData.profilePhoto)} alt="Pofile Pic" className='w-full h-full object-cover'/>
                ) : (
                  <FaRegUserCircle className='w-full h-full'/>
                )}
              </>
            )}  
            <label className='bg-black text-white opacity-0 group-hover:opacity-100 text-lg font-semibold z-20 absolute inset-0 flex items-center justify-center transition-opacity duration-300 gap-1 group-hover:cursor-pointer leading-tight text-center' htmlFor="profilePhoto"> <FaEdit /> Upload<br />new<br />photo</label>
            <input type="file" className='hidden' id='profilePhoto' name='profilePhoto' onChange={profilePhotoHandler}/>
          </div>
        
          <div className='border border-gray-400 rounded-full flex items-center px-3 py-1 gap-2 overflow-hidden focus-within:border-red-500'>
            <FaRegUser />
            <input type='text' name='username' value={formData.username} onChange={inputHandler} placeholder='Enter new username' className=' w-full h-8 outline-none'  />
          </div>
          <div className='border border-gray-400 rounded-full flex items-center px-3 py-1 gap-2 overflow-hidden focus-within:border-red-500 mt-4'>
            <Mail />
            <input type='email' name='email' value={formData.email} onChange={inputHandler} placeholder='Enter new email' className=' w-full h-8 outline-none' required/>
          </div>
          <div className='border border-gray-400 rounded-full flex items-center px-3 py-1 gap-2 overflow-hidden focus-within:border-red-500 mt-4'>
            <Lock />
            <input type='password' name="password" value={formData.password} onChange={inputHandler} placeholder='Enter new password' className='w-full h-8 outline-none'/>
          </div>

          <button type='submit' className='bg-red-500 hover:bg-red-400 text-lg text-white text-semibold px-6 py-1 rounded mt-5 mx-auto block'>Update</button>
        </form>
        
      </div>
    </div>
  )
}

export default ProfileEdit