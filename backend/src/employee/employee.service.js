const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createEmployee(employeeData) {
  try {
    const newEmployee = await prisma.employee.create({
      data: {
        name: employeeData.name,
        contact: employeeData.contact,
        departmentId: employeeData.departmentId,
        roleId: employeeData.roleId,
      },
    });
    return newEmployee;
  } catch (error) {
    throw new Error("Error fetching employees: " + error.message);
  }
}

async function getAllEmployee() {
  try {
    return await prisma.employee.findMany({
      include: {
        department: true,
        role: true,
        attendance: true,
        leaveRequest: true,
        payroll: true,
        review: true,
        task: true,
      },
    });
  } catch (error) {
    throw new Error("Error fetching employees: " + error.message);
  }
}

async function getEmployeeById(id) {
  try {
    return await prisma.employee.findUnique({
      where: { id: Number(id) },
      include: {
        department: true,
        role: true,
        attendance: true,
        leaveRequest: true,
        payroll: true,
        review: true,
        task: true,
      },
    });
  } catch (error) {
    throw new Error("Error fetching employee: " + error.message);
  }
}

async function updateEmployee(id, employeeData) {
  try {
    return await prisma.employee.update({
      where: { id: Number(id) },
      data: employeeData,
    });
  } catch (error) {
    throw new Error("Error updating employee: " + error.message);
  }
}

async function deleteEmployee(id) {
  try {
    return await prisma.employee.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error("Error deleting employee: " + error.message);
  }
}

module.exports = {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
