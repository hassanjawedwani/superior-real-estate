import mongoose from "mongoose";
import Listing from "../models/listing.js"
import User from "../models/user.js";

export const getListings = async (req, res) => {
  try {
    const userId = req.userId;

    let listings = await Listing.find().populate({
        path: "owner",
        select: "username"
    });

    if (userId) {
      console.log("user is logged in");

      listings = listings.map(listing => {
        const isLiked = listing.likes.includes(mongoose.Types.ObjectId.createFromHexString(userId));
        return {...listing.toObject(), isLiked, totalLikes: listing.likes.length}
      })
    } else {
      console.log("user is not logged in");
      listings = listings.map(listing => {
        return {...listing.toObject(), isLiked: false, totalLikes: listing.likes.length || 0}
      })
    } 
    res.json({ success: true, message:"Listings found successfully",  listings });
  } catch (err) {
    res.json({success: false, message: err.message})
  }
}
export const getOneListing = async (req, res) => {
  const { listingId } = req.params;
  try {
    const listing = await Listing.findById(listingId).populate('comments.user', "username text");
    res.json({ success: true, message:"Listings found successfully",  listing });
  } catch (err) {
    res.json({success: false, message: err.message})
  }
}

export const likeToogle = async (req, res) => {
  console.log("like toogle");

  const userId = req.userId;
  
  const { listingId } = req.params; 

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.json({ success: false, message: "Listing not found" });
    }
    
    
    const isLiked = listing.likes.map(id => id.toString()).includes(userId);
    

    if (isLiked) {
      listing.likes = listing.likes.filter(id => id.toString() !== userId);
    } else {
      listing.likes.push(mongoose.Types.ObjectId.createFromHexString(userId));
    }


    await listing.save();

    const user = await User.findById(userId);
  
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    const isLisitngLikedByThisUser = user.likedListings.map(id => id.toString()).includes(listingId);

    console.log(isLisitngLikedByThisUser)
    
    if (isLisitngLikedByThisUser) {
      user.likedListings = user.likedListings.filter(id => id.toString() !== listingId);
    } else {
      user.likedListings.push(mongoose.Types.ObjectId.createFromHexString(listingId));
    }

    await user.save();

    return res.json({ success: true, message: `${isLisitngLikedByThisUser ? "Unliked Successfully" : "Liked Successfully!"} ` });

  } catch (err) {
    res.json({ success: false, message: err.message || "some error occured in like option"})
  }
}


export const createListing = async (req, res) => {
  console.log("createLisitng route");
  let images = req.files.map(file => file.path);
  const list = {
    images,
    ...req.body
  }
  console.log(list);

  try {
    const newListing = await Listing.create(list);
    const user = await User.findById(req.userId);
    user.listingsOwner.push(user);
    await user.save();
    res.json({ success: true, message: "New Listing Created!" });
  } catch (err) {
    res.json({success: false, message: err.message})
  }
}

export const createComment = async (req, res) => {
  console.log("create comment controller");
  const { comment } = req.body;
  const { listingId } = req.params;
  const userId = req.userId;

  const completeComment = {
    user: userId,
    text: comment
  };

  try {
    const listing = await Listing.findById(listingId);
    if (!listing) {
      res.json({ success: false, message: "Listing not found!" });
    }
    listing.comments.push(completeComment);
    await listing.save();

    const user = await User.findById(userId);
    if (!user) {
      res.json({ success: false, message: "User not found!" });
    }

    user.commentsListings.push(listingId);
    await listing.save();

    res.json({ success: true, message: "Comment Added!", comments: listing.comments });
    
  } catch (err) {
    res.json({success: false, message: err.message})
  }
}