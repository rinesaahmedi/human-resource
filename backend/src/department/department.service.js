const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createDepartment(departmentData) {
  try {
    const newDepartment = await prisma.department.create({
      data: {
        name: departmentData.name,
        description: departmentData.description,
      },
    });
    return newDepartment;
  } catch (error) {
    throw new Error("Error creating department: " + error.message);
  }
}

async function getAllDepartments() {
  try {
    return await prisma.department.findMany();
  } catch (error) {
    throw new Error("Error fetching departments: " + error.message);
  }
}

async function getDepartmentById(id) {
  try {
    return await prisma.department.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error("Error fetching department: " + error.message);
  }
}

async function updateDepartment(id, departmentData) {
  try {
    return await prisma.department.update({
      where: { id: Number(id) },
      data: departmentData,
    });
  } catch (error) {
    throw new Error("Error updating department: " + error.message);
  }
}

async function deleteDepartment(id) {
  try {
    return await prisma.department.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error("Error deleting department: " + error.message);
  }
}

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
