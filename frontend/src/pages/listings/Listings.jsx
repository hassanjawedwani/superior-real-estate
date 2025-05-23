import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import {Heart, Star} from "lucide-react"
import axiosInstance from '../../../services/axiosInstance.js';
import toast from 'react-hot-toast';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';



const Listings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user);


  
  
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const allListings = await axiosInstance.get("/api/listings");
        console.log(allListings.data.listings);
        setListings(allListings.data.listings);
      } catch (err) {
        const errorMessage = err.response.data?.message || err.message || "Something went wrong";
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, []);

  
  
  const likeHandler = async (e, listingId) => {
    e.stopPropagation();
    if (!user?.isAuthorized) {
      return toast.error("Please login before to make a like");
    } 
    try {
      const response = await axiosInstance.post(`/api/listings/${listingId}/like`);
      if (!response.data?.success) {
        return toast.error(response.data?.message);
      }

      
      setListings(prevListings => prevListings.map(listing => {
        if (listing._id === listingId) {
          return {
            ...listing,
            totalLikes: listing.isLiked ? (listing.totalLikes - 1) : (listing.totalLikes + 1),
            isLiked: !listing.isLiked,
          }
        }
        return listing;
      }));

      return toast.success(response.data?.message);
    } catch (err) {
      toast.error(err.message);
    }
  }


  if (loading) return <p>loading</p>
  return (
    <div>
      <h1 className='text-2xl md:text-3xl  font-semibold text-center my-10'>Explore</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-10 p-5'>
        {
          listings?.map((listing, index) => (
            <div key={index} className='cursor-pointer' onClick={() => navigate(`/listings/${listing._id}`)}>
              <img src={listing.imageURL} alt="listing image" className='w-96 h-96 object-cover rounded-3xl' />
              <div className=' flex justify-between p-2'>
                <div>
                  <h2 className='text-md font-medium text-slate-800 mt-1'>{listing.title}</h2>
                  <div className='flex items-center gap-1'>
                    <p className='mr-1.5'>${listing.price}</p>
                    <Star size={16} fill="true" absoluteStrokeWidth />
                    <span>{listing.rating}</span>
                  </div>
                </div>

                <div className='flex flex-col items-center shrink-0 par'>
                  <button onClick={(e) => likeHandler(e, listing._id)} className='text-2xl hover:cursor-pointer'>
                    {
                      listing.isLiked ?  <FaHeart  className='text-red-700' /> : <FaRegHeart />
                    }
                  </button>
                  <span className='text-sm font-medium '>{listing.totalLikes} Likes</span>
                </div>
              </div>



              <div className='flex justify-between gap-2 text-sm text-slate-800'>
               
                
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Listings