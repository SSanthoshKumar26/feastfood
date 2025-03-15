import jwt from "jsonwebtoken";

// Function to generate a token
const generateToken = (userId) => {
    const payload = { id: userId };
    const secretKey = process.env.JWT_SECRET;
    const options = {
        expiresIn: "1d", 
    };
    return jwt.sign(payload, secretKey, options);
};

// Middleware for token verification
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.error("Error in authMiddleware:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again."
            });
        }
        res.status(401).json({
            success: false,
            message: "Token verification failed. Please login again."
        });
    }
};

// Export both functions
export { generateToken, authMiddleware };
