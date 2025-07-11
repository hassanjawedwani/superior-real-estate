import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router'
import axiosInstance from '../../services/axiosInstance';
import toast from 'react-hot-toast';
import { deleteUser } from '../redux/features/user/userSlice';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const logoutHandler = async () => {
  //   try {
  //     const response = await axiosInstance.post("/api/auth/logout");

  //     if (response.data?.isAuthorized) {
  //       return toast.error(response.data?.message);
  //     }     

  //     // removing user from redux
  //     dispatch(deleteUser());

  //     toast.success("User Logout Successfully!");
    
  //     navigate("/");
      
  //   } catch (err) {
  //     console.log(err)
  //     toast.error(err.message || "Something went wrong!");
  //   } 
  // }

  return (
    <div className='flex items-center justify-between px-5 cursor-pointer sticky top-0 bg-white shadow z-10 h-14' >

      <div className='flex items-center' onClick={() => navigate("/")}>
        <img src='/logo.svg' alt="logo" className='w-14 md:w-18'/>
        <span className='text-2xl md:text-3xl font-bold text-red-800'>Superior</span>
      </div>

      <div className='h-full flex items-center gap-3'>

        <NavLink to="/listings/new" className="text-md md:text-lg font-semibold text-slate-800 hover:text-slate-600 hover:underline underline-offset-3">
          Create Listing
        </NavLink>

        {user.isAuthorized && (
          <div className='w-12 h-12 rounded-full overflow-hidden'>
            <NavLink to="/profile">
              {user.data.profilePhoto ? (
                <img src={user.data.profilePhoto} alt="Pofile Pic" className='w-full'/>
              ) : (
                <FaUserCircle className='w-full h-full'/>
              )}
            </NavLink>
          </div>
        )}
        
         {/* (
        <button type="button" className='text-md md:text-lg font-semibold text-white bg-red-600 px-4 py-1 rounded-md' onClick={logoutHandler}>Logout</button>
        )  */}

        {!user.isAuthorized && (
        <>
          <NavLink to="/signup" className="text-md md:text-lg font-semibold text-white bg-green-600 px-4 py-1 rounded-md mr-3">
            SignUp
          </NavLink>
          <NavLink to="/login" className="text-md md:text-lg font-semibold text-white bg-green-600 px-4 py-1 rounded-md">
            Login
          </NavLink>
        </>
        )}
      </div>
    </div>
  )
}

export default Navbar