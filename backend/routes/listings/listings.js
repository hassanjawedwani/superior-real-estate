import express from 'express';
import { getListings, getOneListing } from '../../controllers.js/listingsControllers.js';
const router = express.Router();

router
  .route("/")
  .get(getListings);

router
  .route("/:listingId/show")
  .get(getOneListing);

export default router;