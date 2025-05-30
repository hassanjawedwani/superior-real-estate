import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router';
import { IoIosLogOut } from "react-icons/io";
import toast from 'react-hot-toast';
import axiosInstance from '../../../services/axiosInstance';
import { deleteUser } from '../../redux/features/user/userSlice';



const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
      try {
        const response = await axiosInstance.post("/api/auth/logout");
  
        if (response.data?.isAuthorized) {
          return toast.error(response.data?.message);
        }     
  
        // removing user from redux
        dispatch(deleteUser());
  
        toast.success("User Logout Successfully!");
      
        navigate("/");
        
      } catch (err) {
        console.log(err)
        toast.error(err.message || "Something went wrong!");
      } 
  }
  
  return (
    <div className='p-10'>
      <div className='max-w-xl mx-auto'>
        <h1 className='text-4xl font-bold my-7'>Profile</h1>

        <div className='bg-white rounded-2xl p-7 flex flex-col items-center gap-3 border border-gray-200 shadow-2xl hover:drop-shadow-2xl cursor-pointer '>
          <NavLink to="/profile/edit" className='flex items-center text-xl text-gray-700 gap-1 self-end border border-gray-300 rounded px-2 py-1 hover:bg-gray-100'>
            <FaEdit /> Edit
          </NavLink>


          <div className='w-32 h-32 rounded-full overflow-hidden'>
            {user.isAuthorized && (
              <>
                {user.data.profilePhoto ? (
                  <img src={user.data.profilePhoto} alt="Pofile Pic" className='w-full'/>
                ) : (
                  <FaUserCircle className='w-full h-full'/>
                )}
              </>
            )}
          </div>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold mt-3'>{user.data?.username}</h2>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold'>{user.data?.email}</h2>
        </div>
        
        <div className='mt-7'>
          <button  className='cursor-pointer flex items-center text-2xl font-medium text-gray-800 gap-1 rounded  w-full h-12 hover:bg-gray-100' onClick={logoutHandler}>
            <IoIosLogOut size={40}/> Logout
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default Profile