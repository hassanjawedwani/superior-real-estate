import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { listingsInit } from '../../../init/init';


const ShowListing = () => {
  const { listingId } = useParams();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setListing(listingsInit.find(listing => listing._id === listingId));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchListing();
  }, [listingId]);
  console.log(listing)
  
  if (loading)  return <p>loading...</p>
  return (
    <div className='max-w-7xl p-5 mx-auto'>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-2xl overflow-hidden'>
        <img src={listing.imageURL} alt="listing Image" className='w-full h-auto object-cover'/>
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
      
    </div>
  )
}

export default ShowListing