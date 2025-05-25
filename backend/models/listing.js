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
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true},
      text: { type: String, required: true}
    }
  ],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;