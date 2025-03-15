import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://santhosh:Santo%401234@cluster0.chwj0.mongodb.net/food");
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
