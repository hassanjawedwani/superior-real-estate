import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import axiosInstance from '../../../services/axiosInstance.js';
import toast from 'react-hot-toast';
import { FaCircleUser } from "react-icons/fa6";
import {  useSelector } from 'react-redux';



const ShowListing = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  const commentsRef = useRef(null);
  const location = useLocation();
  const [comment, setComment] = useState("");
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && listing && location.state?.scrollToComments && commentsRef.current) {
      commentsRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [location, loading, listing]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listing = await axiosInstance.get(`/api/listings/${listingId}/show`);
        if (listing.data.success) {
          setListing(listing.data.listing);
        } else {
          toast.error(listing.data.message)
        }
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
    console.log(commentsRef);
  }, []);

  const commentSubmitHandler = async (e, listingId) => {
    e.preventDefault();
    console.log("comment handler")
    if (!user.isAuthorized) {
      navigate("/login");
      return toast.error("Please login first before adding comment");
     
    }
    try {
      let response = await axiosInstance.post(`api/listings/${listingId}/comment`, {comment});
      if (!response.data?.success) {
        return toast.error(response.data?.message);
      }
      setListing(prevListing => ({
        ...prevListing,
        comments: response.data.comments
      }))
      console.log(listing)
      setComment("");
      return toast.success(response.data?.message);

    } catch (err) {
      toast.error(err.message)
    }
  }


  
  if (loading)  return <p>loading...</p>
  return (
    <div className='max-w-7xl p-5 mx-auto'>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-2xl overflow-hidden'>
        <img src={listing.images[0]} alt="listing Image" className='w-full h-auto object-cover'/>
        <div className='bg-red-300 hidden sm:grid'>
          Other image
        </div>
      </div>
      <div className='text-center sm:text-start flex flex-col gap-5'>
        <h1 className='text-2xl md:text-3xl font-medium mt-5 mb-3'>{listing.title}</h1>
        <p>{listing.location} {listing.country}</p>
        <p>{listing.description}</p>
        <h2 className='text-2xl font-medium '>${listing.price}</h2>
        <button className='bg-green-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-500 text-white font-bold md:self-start'>Buy Now</button>
      </div>
      <div ref={commentsRef} className='pt-16'>
        <h2 className='text-slate-800 text-2xl font-medium text-center'>Comments</h2>

        <form className='border border-gray-200 p-5 flex flex-col gap-2 max-w-2xl mx-auto my-5 ' onSubmit={(e) => { commentSubmitHandler(e, listing._id) }}>
          <label className='text-lg font-medium' htmlFor='comment'>Add a comment</label>
          <textarea value={comment} required onChange={e => setComment(e.target.value)} className='border border-gray-500 w-full p-1 h-24 focus:outline-red-400' placeholder='i love this place'></textarea>
          <button type='submit' className='bg-red-600 text-white font-medium w-full h-9'>Submit</button>
        </form> 
        {/* previous comments */}
        <div className='pt-5 bg-gray-100'>
          <h2 className='text-start pl-8 text-2xl font-medium text-gray-700 mb-4 '>Others Comments</h2>
          <div className=' grid grid-cols-1 lg:grid-cols-2 p-5 gap-8'>
            {
              listing.comments.map((comment, index) => (
                <div className='flex gap-5' key={index}>
                  <div>
                    <FaCircleUser className='text-7xl' />
                  </div>
                  <div>
                    <h3 className='text-xl'>@{comment.user.username}</h3>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className='min-h-96'></div>
      </div>
      
    </div>
  )
}

export default ShowListing

