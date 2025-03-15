import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js"; // Ensure function names match exactly
import multer from "multer";

const foodRouter = express.Router();

// Image storage configuration using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Ensure the "uploads" folder exists or handle errors
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp and original filename for uniqueness
  },
});

const upload = multer({ storage }); // Initialize multer with the storage configuration

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood); // Corrected function name casing if necessary
foodRouter.post("/remove", removeFood); // Ensure consistency in function naming

export default foodRouter;
