import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js';
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for cross-origin requests
app.use(cors());

// Connect to the database
connectDB();

// Mount API routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(7007,'0.0.0.0', () => {
  console.log('Server is running on port 7007');
});
