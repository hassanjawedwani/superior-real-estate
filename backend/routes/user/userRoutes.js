import express from 'express';
import { authme, login, logout, signup } from '../../controllers.js/userControllers.js';
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

export default router;