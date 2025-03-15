
import mongoose from "mongoose";

// Define the schema for the food model
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
});

// Check if the model is already registered to avoid re-declaration errors
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

// Export the model for use in other parts of the application
export default foodModel;


