import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Listings from './pages/listings/Listings';
import ShowListing from './pages/listings/ShowListing';
import Navbar from './pages/components/Navbar';


const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/listings" replace />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listings/:listingId" element={<ShowListing />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;