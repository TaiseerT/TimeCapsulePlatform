const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
exports.verifyToken = async (req) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or invalid");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      throw new Error("Invalid token");
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Token verification failed:", error.message);
    throw new Error("Unauthorized");
  }
};
