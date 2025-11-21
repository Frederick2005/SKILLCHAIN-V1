import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";


// -----------------------------------------------------------
// REGISTER USER
// -----------------------------------------------------------
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username, // this must match your field
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------------------------
// LOGIN USER
// -----------------------------------------------------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

const token = jwt.sign(
  { id: user._id },   // MUST MATCH protect middleware
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


  res.status(200).json({
    success: true,
    message: "Login successful",
    token: token,
    user: user,
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;    // req.user must be set by middleware

  if (!userId) {
    return res.status(400).json({ message: "User ID missing in token" });
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});
