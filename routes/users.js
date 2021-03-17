const express = require("express");
const router = express.Router();
const User = require("../models/User");

//getUserById middleware
async function getUserById(req, res, next) {
  console.log("Access to getUserById");
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      console.log("Cannot find User");
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    console.log("getUserById OK");
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

//getUserByEmail middleware
async function getUserByEmail(req, res, next) {
  console.log("Access to getUserByEmail");
  let user;
  try {
    user = await User.findById(req.header.email);
    if (user == null) {
      console.log("Cannot find User");
      return res.status(404).json({ message: "Cannot find User" });
    }
  } catch (err) {
    console.log("getUserByEmail OK");
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

// Get All Route
router.get("/", async (req, res) => {
  console.log("Access to GetAllUser");
  try {
    const users = await User.find();
    res.json(users);
    console.log("Access to GetAllUser OK");
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error during access GetAllUser");
  }
});

// Get One Route
router.get("/:id", getUserById, (req, res) => {
  res.json(res.user);
});

// Create One Route
router.post("/", async (req, res) => {
  console.log("Access to CreateOneUser");
  const user = new User({
    email: req.body.email,
    psw: req.body.psw,
  });
  try {
    const newUser = await user.save();
    res.status(201).json({ newUser });
    console.log("a new user has been created");
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("error during new user creation");
  }
});

// Edit One Route PUT version 
router.put("/:id", getUserById, async (req, res) => {
  try {
    res.user.email = req.body.email;
    res.user.psw = req.body.psw;
    res.user.modifyAt = new Date();
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit One Route PATCH version
router.patch("/:id", getUserById, async (req, res) => {
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.psw != null) {
    res.user.psw = req.body.psw;
  }
  res.user.modifyAt = new Date();
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete One Route
router.delete("/:id", getUserById, async (req, res) => {
  try {
    await res.user.deleteOne();
    res.json({ message: "User has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
