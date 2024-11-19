const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

const prisma = new PrismaClient();

const {
  createPasswordHash,
  comparePassword,
} = require("./../utils/crypt.utils");

async function signup(username, password) {
  const passwordHash = createPasswordHash(password);
  console.log(passwordHash.hash);

  return prisma.user.create({
    data: {
      username,
      passwordHash,
      role: "",
    },
  });
}

async function signin(username, password) {
  // get user from database by username
  const existingUser = await prisma.user.findFirstOrThrow({
    where: { username },
  });

  // check if passwords are the same
  const { passwordHash } = existingUser;

  // return the user
  return comparePassword(password, passwordHash);
}

module.exports = {
  signup,
  signin,
};
