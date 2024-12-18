const express = require("express");
const router = express.Router();

// Services
const employeeService = require("./employee.service");

//Create new employee
router.post("", async (req, res) => {
  try {
    const newEmployee = await employeeService.createEmployee(req.body);
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

// Get employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }
    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update employee
router.put("/:id", async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const updatedEmployee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );

    return res.json({ success: true, data: updatedEmployee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    await employeeService.deleteEmployee(req.params.id);
    return res.json({ success: true, message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
