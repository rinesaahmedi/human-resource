const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createRole(roleData) {
  try {
    const newRole = await prisma.role.create({
      data: roleData,
    });
    return newRole;
  } catch (error) {
    throw new Error("Error creating role:" + error.message);
  }
}

async function getAllRoles() {
  try {
    return await prisma.role.findMany();
  } catch (error) {
    throw new Error("Error fetching roles:" + error.message);
  }
}

async function getRoleById(id) {
  try {
    return await prisma.role.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error("Error fetching roles:" + error.message);
  }
}

async function updateRole(id, roleData) {
  try {
    return await prisma.role.update({
      where: { id: Number(id) },
      data: roleData,
    });
  } catch (error) {
    throw new Error("Error updating roles:" + error.message);
  }
}

async function deleteRole(id) {
  try {
    return await prisma.role.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error("Error deleting roles:" + error.message);
  }
}

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
