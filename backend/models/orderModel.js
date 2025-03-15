import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
  items: [{ 
    id: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true }, // Reference to FoodItem model
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
});

// Check for an existing model before creating a new one
const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
