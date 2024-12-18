const express = require("express");
const router = express.Router();

// Services
const employeeService = require("./employee.service");

//Create new employee
router.post("", async (req, res) => {
  try {
    const newEmployee = employeeService.createEmployee(req.body);
    res.status(201).json({ success: true, data: newEmployee });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error while creating employee: ${error.message}`,
    });
  }
});

//Get all employees
router.get("", async (req, res) => {
  try {
    const employees = await employeeService.getAllEmployee();
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Signup route
router.get("", async (req, res) => {
  res.json({ success: true, data: await employeeService.getAllEmployee() });
});

module.exports = router;
