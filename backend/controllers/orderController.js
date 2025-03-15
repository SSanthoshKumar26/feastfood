import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "http://localhost:3000";

// Place order function
export const placeOrder = async (req, res) => {
  console.log("placeOrder called with body:", req.body);
  try {
    const { userId, items, amount, address } = req.body;

    // Validate the request data
    if (!userId || !items || !amount || !address) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Verify user exists in the database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Calculate the total amount from line items (in paise)
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Convert price to paise (INR smallest unit)
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200, // Delivery charge in paise
      },
      quantity: 1,
    });

    // Calculate the total amount (in paise)
    const totalAmount = line_items.reduce((acc, item) => acc + (item.price_data.unit_amount * item.quantity), 0);

    // Check if the total amount is below ₹50 (5000 paise)
    if (totalAmount < 5000) {
      return res.status(400).json({ success: false, message: "Total amount is too low, minimum is ₹50" });
    }

    // Ensure that the provided amount matches the calculated total
    if (amount * 100 !== totalAmount) {
      return res.status(400).json({ success: false, message: "Amount mismatch, please verify the order details" });
    }

    // Create new order in the database
    const newOrder = new orderModel({ userId, items, amount, address });
    await newOrder.save();

    // Clear the user's cart after placing the order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("Stripe session created successfully:", session);

    // Send the Stripe session URL to the frontend
    res.json({
      success: true,
      url: session.url,
      orderId: newOrder._id,  // Include order ID in the response
    });
  } catch (error) {
    console.error("Error in placeOrder:", error);

    // Detailed error logging from Stripe
    if (error.type === 'StripeCardError') {
      console.error('Card error:', error.message);
    } else {
      console.error('Other Stripe error:', error.message);
    }

    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};
