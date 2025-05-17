import mongoose from 'mongoose';
import { listingsData } from './data.js';
import Listing from '../models/listing.js';

export const initListings = async () => {
  try {
    await Listing.deleteMany();
    console.log("deleted previous")
    await Listing.insertMany(listingsData);
    console.log("updated")
  } catch (err) {
    console.log(err.message);
  }
}

