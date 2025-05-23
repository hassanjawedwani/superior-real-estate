import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String }, // delet it after
  images: [{type: String}],
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  rating: { type: Number, default: 0 },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }
  ],
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;