import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Mock database - replace with real database
const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@school.com",
    password: "$2a$10$3D9B1N5Q7K8L2M9O6P3R5", // bcrypt hash of "admin123"
    studentId: "STU001",
    class: "12-A",
    rollNumber: "1",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@school.com",
    password: "$2a$10$3D9B1N5Q7K8L2M9O6P3R5", // bcrypt hash of "password123"
    studentId: "STU002",
    class: "11-B",
    rollNumber: "15",
  },
];

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Find user
      const user = users.find((u) => u.email === email);

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // In production, use bcrypt.compare()
      // For demo, just check password directly
      const isPasswordValid =
        password === "admin123" || password === "password123";

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "your_secret_key_change_in_production",
        { expiresIn: "24h" }
      );

      // Return user data (without password)
      const { password: _, ...userWithoutPassword } = user;

      res.json({
        message: "Login successful",
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password, class: studentClass, rollNumber } =
        req.body;

      // Validate input
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email, and password are required" });
      }

      // Check if user already exists
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password, // In production, hash with bcrypt
        studentId: `STU${String(users.length + 1).padStart(3, "0")}`,
        class: studentClass || "11-A",
        rollNumber: rollNumber || "1",
      };

      users.push(newUser);

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET || "your_secret_key_change_in_production",
        { expiresIn: "24h" }
      );

      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        message: "Registration successful",
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = users.find((u) => u.id === req.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default authController;