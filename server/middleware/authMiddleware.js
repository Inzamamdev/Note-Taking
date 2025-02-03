import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
dotenv.config();

export const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from header

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid or expired token" });
    const userId = user.id;
    const userDetails = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userDetails;
    next();
  });
};
