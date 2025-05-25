import React, { useEffect, useState } from 'react'
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/authme");
        if (!response.data?.authenticated) {
          navigate("/login");
          toast.error("Please login first before continue")
        }
        setLoading(false);
      } catch (err) {
        toast.error(err.message || "Something went wrong!");
        setLoading(false);
      }
    }
    checkAuth();
  }, [navigate]);
  
  if(loading) return <p>loading</p>

 
  return children
}

export default PrivateRoute;