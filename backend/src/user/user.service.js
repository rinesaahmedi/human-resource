const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
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

async function updateUserPassword(id, userData) {
  const newPassword = userData.password;
  const currentPassword = userData.currentPassword;

  try {
    if (!id || isNaN(Number(id))) {
      throw new Error("Invalid user ID.");
    }

    const userId = Number(id);

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true },
    });

    if (!existingUser) {
      throw new Error("User not found.");
    }

    const comparedPassword = await bcrypt.compare(
      currentPassword,
      existingUser.passwordHash
    );

    if (!comparedPassword) {
      throw new Error("Wrong password!");
    }

    const isSameAsCurrent = await bcrypt.compare(
      newPassword,
      existingUser.passwordHash
    );
    if (isSameAsCurrent) {
      throw new Error(
        "New password cannot be the same as the current password."
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: hashedNewPassword },
    });

    return { success: true, message: "Password updated successfully." };
  } catch (error) {
    console.error("Error while updating password:", error);
    throw new Error(error.message || "Unexpected error occurred.");
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
  updateUserPassword,
  deleteUser,
};
