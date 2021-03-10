const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get All Route
router.get("/", async (req, res) => {
  console.log('Access GetAllUser');  
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get One Route
router.get("/:id", async (req, res) => {
  // Rest of the code will go here
});

// Create One Route
router.post("/", async (req, res) => {
  // Rest of the code will go here
});

// Edit One Route PUT version
router.put("/:id", async (req, res) => {
  // Rest of the code will go here
});

// Edit One Route PATCH version
router.patch("/:id", async (req, res) => {
  // Rest of the code will go here
});

// Delete One Route
router.delete("/:id", async (req, res) => {
  // Rest of the code will go here
});

module.exports = router;
