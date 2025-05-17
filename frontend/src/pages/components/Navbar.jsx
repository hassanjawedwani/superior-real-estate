import React from 'react'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='flex px-5 cursor-pointer sticky top-0 bg-white shadow z-10' onClick={() => navigate("/")}>
      <div className='flex items-center'>
        <img src='/logo.svg' alt="logo" className='w-18'/>
        <span className='text-3xl font-bold text-red-800'>Superior</span>
      </div>
    </div>
  )
}

export default Navbar