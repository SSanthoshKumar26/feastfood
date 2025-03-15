
import userModel from "../models/userModel.js"; // Ensure the correct path

// Add item to the cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Validate input data
        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Missing userId or itemId" });
        }

        // Fetch the user data
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Initialize cartData if not present
        let cartData = userData.cartData || {};

        // Update cartData: Increase quantity by 1, or add the item if it doesn't exist
        cartData[itemId] = (cartData[itemId] || 0) + 1;

        // Save the updated cartData back to the user document
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cartData },
            { new: true, runValidators: true }
        );

        // Send the updated cart data back in the response
        res.json({ success: true, message: "Item added to cart", cart: updatedUser.cartData });
    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
    }
};

// Remove item from the cart
const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        // Fetch the user data
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the item exists in the cart
        if (!user.cartData[itemId]) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // Decrease the quantity by 1
        if (user.cartData[itemId] > 1) {
            user.cartData[itemId] -= 1;
        } else {
            // If quantity is 1, remove the item completely
            delete user.cartData[itemId];
        }

        // Save the updated cartData back to the database
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cartData: user.cartData },
            { new: true }
        );

        // Send the updated cart data back in the response
        res.status(200).json({ success: true, message: "Item removed from cart", cart: updatedUser.cartData });
    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ success: false, message: "Error removing from cart", error: error.message });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    const { userId } = req.body;

    try {
        // Fetch the user data
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, cart: user.cartData });
    } catch (error) {
        console.error("Error in getCart:", error);
        res.status(500).json({ success: false, message: "Error fetching cart data", error: error.message });
    }
};

// Export functions separately
export { addToCart, removeFromCart, getCart };
