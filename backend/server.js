import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import { main as connectDB } from './config/db.js';
import { initListings } from './init/init.js';
import listingsRouter from "./routes/listings/listings.js";
import cors from 'cors';

const app = express();

const port = process.env.PORT || 8080;



connectDB();

// initListings();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials : true,
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  console.log("hello root");
})

app.use(`/api/listings`, listingsRouter);

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});