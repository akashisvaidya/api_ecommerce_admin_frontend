import mongoose from "mongoose";

export const connectDb = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_CLIENT);
    mongoose.set("strictQuery", false);
    conn && console.log("mongo connnected");
  } catch (error) {}
};
