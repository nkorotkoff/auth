import mongoose from "mongoose";
import { config } from "dotenv";

const connectDB = async () => {
  const MONGO_URI: string = String(process.env.MONGO_URI);
  try {
    const _connect = mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected : ${(await _connect).connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
