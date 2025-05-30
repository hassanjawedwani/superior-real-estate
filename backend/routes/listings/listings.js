import express from 'express';
import { createComment, createListing, getListings, getOneListing, likeToogle } from '../../controllers/listingsControllers.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { optionalAuthMiddleware } from '../../middlewares/optionalAuthMiddleware.js';
import { upload } from '../../config/multer-cloudinary.js';
const router = express.Router();

router
  .route("/")
  .get(optionalAuthMiddleware, getListings);

router
  .route("/:listingId/show")
  .get(getOneListing);

router
  .route("/:listingId/like")
  .post(authMiddleware, likeToogle);

router
  .route("/:listingId/comment")
  .post(authMiddleware, createComment);
  
router
  .route("/new")
  .post(authMiddleware, upload.array("images"), createListing);
  


export default router;