import jwt from "jsonwebtoken";

const authMiddleware = {
  verifyToken: (req, res, next) => {
    try {
      // Get token from header
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_secret_key_change_in_production"
      );

      // Attach userId to request
      req.userId = decoded.userId;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
  },
};

export default authMiddleware;