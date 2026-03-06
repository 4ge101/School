import jwt from "jsonwebtoken";

const authMiddleware = {
  verifyToken: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // Debug log — remove after fixing
      console.log("Auth header received:", authHeader);

      if (!authHeader) {
        return res.status(401).json({ message: "No authorization header" });
      }

      // Support both "Bearer <token>" and just "<token>"
      const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_secret_key_change_in_production"
      );

      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired — please log in again" });
      }
      return res.status(401).json({ message: "Invalid token" });
    }
  },
};

export default authMiddleware;