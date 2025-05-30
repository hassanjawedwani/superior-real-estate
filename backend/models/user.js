import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, "Please enter username"] },
  email: { type: String,  required: [true, "Please enter email"], unique: true },
  password: { type: String, required: [true, "Please enter password"] },
  likedListings: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Listing'},
  ],
  listingsOwner: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}
  ],
  commentsListings: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}
  ],
  profilePhoto: { type: String, default: "" }
});

const User = mongoose.model("User", userSchema);

export default User;