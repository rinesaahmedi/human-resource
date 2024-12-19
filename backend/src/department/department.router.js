const express = require("express");
const router = express.Router();

// Services
const departmentService = require("./department.service");

// Create a new department
router.post("", async (req, res) => {
  try {
    const newDepartment = await departmentService.createDepartment(req.body);
    res.status(201).json({ success: true, data: newDepartment });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error while creating department: ${error.message}`,
    });
  }
});

// Get all departments
router.get("", async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }
    res.json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update department
router.put("/:id", async (req, res) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    const updatedDepartment = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );

    return res.json({ success: true, data: updatedDepartment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete department
router.delete("/:id", async (req, res) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);
    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    await departmentService.deleteDepartment(req.params.id);
    return res.json({ success: true, message: "Department deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
