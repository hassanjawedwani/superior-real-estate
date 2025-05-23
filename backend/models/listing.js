import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  rating: { type: Number },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;