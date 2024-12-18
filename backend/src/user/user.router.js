const express = require("express");
const router = express.Router();

// Services
const userService = require("./user.service");

//Create new user
router.post("", async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error while creating user: ${error.message}`,
    });
  }
});

//Get all users
router.get("", async (req, res) => {
  try {
    const users = await userService.getAllUser();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updatedUser = await userService.updateUser(req.params.id, req.body);

    return res.json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await userService.deleteUser(req.params.id);
    return res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
