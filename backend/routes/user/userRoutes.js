import express from 'express';
import { signup } from '../../controllers.js/userControllers.js';
const router = express.Router();

router
  .route("/signup")
  .post(signup);

export default router;