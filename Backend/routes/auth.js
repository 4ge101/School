import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Login route
router.post("/login", authController.login);

// Register route
router.post("/register", authController.register);

// Verify token route (protected)
router.get("/verify", authMiddleware.verifyToken, (req, res) => {
  res.json({ message: "Token is valid", userId: req.userId });
});

// Get user profile (protected)
router.get("/profile", authMiddleware.verifyToken, authController.getProfile);

export default router;