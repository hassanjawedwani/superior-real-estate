import React, { useEffect } from 'react'
import axiosInstance from '../../services/axiosInstance';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/features/user/userSlice';
import toast from 'react-hot-toast';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get("/api/auth/authme");
        if (response.data?.authenticated) {
          dispatch(createUser(response.data?.user));
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
    getUser();
  }, []);

  return children;
}

export default AuthProvider