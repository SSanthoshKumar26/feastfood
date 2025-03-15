
import foodModel from "../models/temp.js"; // Import the food model
import fs from "fs"; // For file system operations
import mongoose from "mongoose"; // Ensure mongoose is imported if creating schemas

// Add Food Controller
const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    const { name, description, price, category } = req.body; // Extract body data
    const imageFilename = req.file.filename;

    try {
        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: imageFilename, // Store the image filename
        });

        await food.save(); // Save to the database
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding food" });
    }
};

// List Food Controller
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving food list" });
    }
};

// Remove Food Controller
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Remove image from uploads folder
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.error(`Error deleting file: ${err.message}`);
        });

        // Remove food entry from database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
};

export { addFood, listFood, removeFood };


