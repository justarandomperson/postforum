import mongoose from "mongoose";

export default async function connectMongoDB() {
  try {
    return await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
}
