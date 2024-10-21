import mongoose from "mongoose";

export const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully ✅");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); 
  }
};