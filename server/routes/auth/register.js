const express = require('express');
const User = require('../../models/user.js');
const bcrypt = require("bcrypt");
require("dotenv").config();

// Instantiate router
const router = express.Router();

// Use json parser
router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const { username, plainTextPassword, currentNotes } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } 

    const encryptedPassword = await bcrypt.hash(plainTextPassword, 10);

    const newUser = new User({ username, password: encryptedPassword, notes: currentNotes });

    await newUser.save();

    res.status(201).json({ message: "User registered" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;