const express = require("express");
const router = express.Router();
const User = require("../models/User");

const SAMPLE_OTP = "123456";

// REGISTER: Save new user info to MongoDB
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, mobile } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered with this email" });
    }

    user = new User({ fullName, email, mobile });
    await user.save();

    res.status(201).json({
      message: "User registered successfully!",
      sampleOtp: SAMPLE_OTP,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SEND OTP: Provide sample OTP for existing users
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No account found with this email. Please register first." });
    }

    res.status(200).json({
      message: "OTP generated",
      sampleOtp: SAMPLE_OTP,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// VERIFY OTP / LOGIN: Complete login using sample OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (otp !== SAMPLE_OTP) {
      return res.status(400).json({ message: "Invalid OTP. Use sample OTP: 123456" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Login successful!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PASSWORD LOGIN (Fallback)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password && user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;