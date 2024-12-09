const bcrypt = require("bcrypt");
const saltRounds = 10;

const createPasswordHash = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const comparePassword = (password, passwordHash) => {
  if (!bcrypt.compareSync(password, passwordHash)) {
    throw new Error({ message: "Password hash does not match!" });
  }
  return true;
};

module.exports = {
  createPasswordHash,
  comparePassword,
};
