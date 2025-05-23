import express from 'express';
import { getListings, getOneListing, likeToogle } from '../../controllers.js/listingsControllers.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { optionalAuthMiddleware } from '../../middlewares/optionalAuthMiddleware.js';
const router = express.Router();

router
  .route("/")
  .get(optionalAuthMiddleware, getListings);

router
  .route("/:listingId/show")
  .get(getOneListing);

router
  .route("/:listingId/like")
  .post(authMiddleware,  likeToogle);

export default router;