const express = require("express");
const User = require("../../models/user");
require("dotenv").config();

const router = express.Router();

router.use(express.json());

router.post("/login", async (req, res) => {
  try {
    const { username, plainTextPassword } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "Username not found" });
    }

    const isValidPassword = await existingUser.comparePassword(plainTextPassword);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(201).json({ message: "Logged in successfully", user: existingUser });
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;