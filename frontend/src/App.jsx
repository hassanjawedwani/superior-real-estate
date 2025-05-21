import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Listings from './pages/listings/Listings';
import ShowListing from './pages/listings/ShowListing';
import Navbar from './components/Navbar';
import Login from './pages/user/login';
import Signup from './pages/user/Signup';
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
       <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/listings" replace />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:listingId" element={<ShowListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;