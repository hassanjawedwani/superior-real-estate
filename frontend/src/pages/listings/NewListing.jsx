import React, { useState } from 'react'
import { FiUpload } from "react-icons/fi";
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../services/axiosInstance.js';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';


const NewListing = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user)
  const initialData = {
    images: [],
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    formData.images.forEach(image => {
      fd.append("images", image);
    })
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("location", formData.location);
    fd.append("country", formData.country);
    fd.append("owner", user.data.userId);
    

    try {
      const response = await axiosInstance.post("api/listings/new", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      if (!response.data?.success) {
        toast.error(response.data?.message);
      }
      toast.success(response.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false);
    }

  }

  const imageChangeHandler = (e) => {
    const images = formData.images;
    images[e.target.name] = e.target.files[0];
    setFormData(prevData => ({
      ...prevData,
      images
    }));
  }

  const inputHandler = (e) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  if(loading) return <p>Listing Creating...</p>
  return (
    <form onSubmit={submitHandler}>
      <h1 className='text-2xl font-semibold text-center my-5'>Create a new listing</h1>
      <div className='p-3 flex flex-col gap-5 max-w-lg mx-auto'>
        <div>
          <label className='font-medium'>Select Listing Images</label>
          <div className='mt-2 flex gap-5 flex-wrap justify-between'>

            {Array(4).fill('').map((_, index) => (
              <div key={index} className='w-24 h-24 flex-shrink-0'>
                <label className='w-full h-full flex flex-col justify-center items-center border border-gray-400' htmlFor={`image${index}`}>
                  {
                    formData.images[index] ? (<img src={URL.createObjectURL(formData.images[index])} alt={`image${index}`} className='w-full h-full object-full' />) : (<>
                       <FiUpload className='w-9 h-9'/>
                       <span className='text-sm text-center text-slate-700'>select Image</span>
                    </>)
                  }
                 
                </label>
                <input type="file" onChange={imageChangeHandler} id={`image${index}`} name={`${index}`} className='hidden' />
              </div>
            ))
           
          }
          
          </div>
        </div>


        <div>
          <label className='font-medium' htmlFor='title'>Title</label>
          <input type='text' onChange={inputHandler} value={formData.title} id='title' name='title' className='border border-gray-400 rounded w-full mt-1 h-9 p-1 outline-none focus:border-red-800' placeholder='Title'/>
        </div>
        <div>
          <label className='font-medium' htmlFor='description'>Description</label>
          <input type='text' id='description' onChange={inputHandler} value={formData.description} name='description' className='border border-gray-400 rounded w-full mt-1 h-9 p-1 outline-none focus:border-red-800' placeholder='Description'/>
        </div>
        <div>
          <label className='font-medium' htmlFor='price'>Price</label>
          <input type='number' onChange={inputHandler}  value={formData.price} id='price' name='price' className='border border-gray-400 rounded w-full mt-1 h-9 p-1 outline-none focus:border-red-800' placeholder='Price'/>
        </div>
        <div>
          <label className='font-medium' htmlFor='location'>Location</label>
          <input type='text' onChange={inputHandler} value={formData.location}  id='location' name='location' className='border border-gray-400 rounded w-full mt-1 h-9 p-1 outline-none focus:border-red-800' placeholder='Location'/>
        </div>
        <div>
          <label className='font-medium' htmlFor='country'>Country</label>
          <input type='text ' onChange={inputHandler} value={formData.country} id='country' name='country' className='border border-gray-400 rounded w-full mt-1 h-9 p-1 outline-none focus:border-red-800' placeholder='Country'/>
        </div>
        
        <button type='submit' className='bg-red-600 hover:bg-red-500 text-white text-xl h-9 mt-5'>Create</button>
        
      </div>
    </form>
  )
}

export default NewListing;


// const listingSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   imageURL: { type: String, required: true },
//   price: { type: Number, required: true },
//   location: { type: String, required: true },
//   country: { type: String, required: true },
//   rating: { type: Number },
//   likes: [
//     { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
//   ],
// });