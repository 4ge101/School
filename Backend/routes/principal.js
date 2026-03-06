import express from "express";
import principalController from "../controllers/principalController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — anyone can read (About page fetches this)
router.get("/", principalController.get);

// Protected — only logged-in admin can update (Dashboard)
router.put("/", authMiddleware.verifyToken, principalController.update);

export default router;