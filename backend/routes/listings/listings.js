import express from 'express';
import { createListing, getListings, getOneListing, likeToogle } from '../../controllers.js/listingsControllers.js';
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
  .route("/new")
  .post(authMiddleware, upload.array("images"), createListing);
  


export default router;