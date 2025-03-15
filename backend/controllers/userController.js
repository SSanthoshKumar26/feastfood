import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create JWT Token with expiration time
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Token expires in 7 days
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("Error in loginUser:", error.message);
        res.status(500).json({ success: false, message: "An error occurred. Please try again." });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        // Validate password length (minimum 8 characters)
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const user = await newUser.save();

        // Create JWT token for the new user
        const token = createToken(user._id);

        // Send success response with the token
        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ success: false, message: "An error occurred. Please try again." });
    }
};

export { loginUser, registerUser };
