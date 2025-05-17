import Listing from "../models/listing.js"

export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json({ success: true, message:"Listings found successfully",  listings });
  } catch (err) {
    res.json({success: false, message: err.message})
  }
}
export const getOneListing = async (req, res) => {
  const { listingId } = req.params;
  try {
    const listing = await Listing.findById(listingId);
    res.json({ success: true, message:"Listings found successfully",  listing });
  } catch (err) {
    res.json({success: false, message: err.message})
  }
}