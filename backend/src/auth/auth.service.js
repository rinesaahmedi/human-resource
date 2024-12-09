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

  // check if hash match
  comparePassword(password, passwordHash);

  let token;

  token = jwt.sign(
    {
      userId: existingUser.id,
      userName: existingUser.username,
      role: existingUser.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { user: existingUser, token };
}

module.exports = {
  signup,
  signin,
};
