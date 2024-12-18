const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createEmployee(employeeData) {
  const newEmployee = await prisma.employee.create({
    data: {
      name: employeeData.name,
      contact: employeeData.contact,
      departmentId: employeeData.departmentId,
      roleId: employeeData.roleId,
    },
  });
  return newEmployee;
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

module.exports = {
  createEmployee,
  getAllEmployee,
};
