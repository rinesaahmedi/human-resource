const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createPasswordHash } = require("./../utils/crypt.utils");

async function createUser(userData) {
  try {
    const hashedPassword = await createPasswordHash(userData.password);
    const newUser = await prisma.user.create({
      data: {
        username: userData.username,
        passwordHash: hashedPassword,
        role: userData.role,
      },
    });
    return newUser;
  } catch (error) {
    throw new Error("Error while creating user: " + error.message);
  }
}

async function getAllUser() {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}

async function getUserById(id) {
  try {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
}

async function updateUser(id, userData) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: userData,
    });

    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
}

async function deleteUser(id) {
  try {
    return await prisma.user.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
}

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
