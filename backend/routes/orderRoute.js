import express from "express";
import { placeOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";

const orderRouter = express.Router();

// Add a logging middleware to check the request body before calling the placeOrder function
orderRouter.post("/place", authMiddleware, (req, res, next) => {
  console.log(req.body); // Log the request body to see if it's being received correctly
  next(); // Continue to the next middleware (which is placeOrder)
}, placeOrder);

export default orderRouter;
