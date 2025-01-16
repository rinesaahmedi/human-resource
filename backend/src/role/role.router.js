const express = require("express");
const router = express.Router();

//Services
const roleService = require("./role.service");

//Create a new role
router.post("", async (req, res) => {
  try {
    const newRole = await roleService.createRole(req.body);
    res.status(201).json({ success: true, data: newRole });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Error while creating role: ${error.message}`,
    });
  }
});

//Get all roles
router.get("", async (req, res) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json({ success: true, data: roles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//Get role by Id
router.get("/:id", async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//Update a role
router.put("/:id", async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }
    const updatedRole = await roleService.updateRole(req.params.id, req.body);
    res.json({ success: true, message: error.message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//Delete a role
router.delete("/:id", async (req, res) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    if (!role) {
      return res
        .status(404)
        .json({ success: false, message: "Role not found" });
    }
    await roleService.deleteRole(req.params.id);
    res.json({ success: true, message: "Role deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
