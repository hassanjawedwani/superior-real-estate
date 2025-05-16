import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import { listingsInit } from '../../../init/init';
import {Star} from "lucide-react"


const Listings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    setListings(listingsInit);
  }, []);

  console.log(listings)

  return (
    <div>
      
      <h1 className='text-2xl md:text-3xl  font-semibold text-center my-10'>Explore</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-10 p-5'>
        {
          listings.map((listing, index) => (
            <div key={index} className='cursor-pointer' onClick={() => navigate(`/listings/${listing._id}`)}>
              <img src={listing.imageURL} alt="listing image" className='w-96 h-96 object-cover rounded-3xl'/>
              <h2 className='text-md font-medium text-slate-800 mt-1'>{listing.title}</h2>
              <div className='flex gap-2 text-sm text-slate-800'>
                <p>${listing.price}</p>
                <p className='flex items-center gap-0.5'><Star size={12} fill="true" absoluteStrokeWidth /><span>{listing.rating}</span></p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Listings