import mongoose from "mongoose";

export async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("Database connected");
}

