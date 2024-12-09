const express = require("express");
const router = express.Router();

// Services
const employeeService = require("./employee.service");

// Signup route
router.get("", async (req, res) => {
  res.json({ success: true, data: await employeeService.getAllEmployee() });
});

module.exports = router;
