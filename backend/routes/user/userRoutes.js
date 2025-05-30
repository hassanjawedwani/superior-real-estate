import express from 'express';
import { authme, login, logout, signup, updateProfile } from '../../controllers/userControllers.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { upload } from '../../config/multer-cloudinary.js';
const router = express.Router();

router
  .route("/signup")
  .post(signup);

router
  .route("/login")
  .post(login);

router
  .route("/logout")
  .post(logout);

router
  .route("/authme")
  .get(authme);

router
  .route("/profile/edit")
  .post(authMiddleware, upload.single('profilePhoto'), updateProfile);

export default router;