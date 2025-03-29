import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("DB CONNECTED 🍲");
  } catch (error) {
    console.log("Database conection error: ", error);
  }
};
