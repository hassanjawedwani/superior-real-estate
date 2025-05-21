import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);

  // update: use joi
  if (!username) return res.json({ success: false, message: "Please enter username"});
  if (!email) return res.json({ success: false, message: "Please enter email"});
  if (!password) return res.json({ success: false, message: "Please enter password" });

  // already user exist or not
 
  const user = await User.findOne({ email });
  if(user) return res.json({ success: false, message: "User already exists!" });
   
  
  // bcrypt password
  const hashedPassword = await bcrypt.hash(password, 10);
 

  // creating user in mongodb
  try {
    
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ userId: user.username }, process.env.TOKEN_SECRET, {expiresIn: '1h'});
    
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "User Account Created Successfully", user: { userId: user._id, username: user.username, email: user.email } });

  } catch (err) {
  
    return res.json({ success: false, message: err.message || "Some error occured in db operations" });
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);

  // update: use joi
  if (!email) return res.json({ success: false, message: "Please enter email" });
  if (!password) return res.json({ success: false, message: "Please enter password" });

  // not exist or exist
 
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "Account from this mail don't exists!" });
   
  
 

  // finding user in mongodb
  try {
    
    const user = await User.findOne({ email });

    const isPasswordTrue = await bcrypt.compare(password, user.password);

    if (!isPasswordTrue) return res.json({ success: false, message: "Password Incorrect!" });

    const token = jwt.sign({ userId: user.username }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    
    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "User loggined successfully!", user: { userId: user._id, username: user.username, email: user.email } });

  } catch (err) {
  
    return res.json({ success: false, message: err.message || "Some error occured in db operations" });
  }
}