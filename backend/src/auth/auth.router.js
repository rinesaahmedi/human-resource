const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Services
const authService = require("./auth.service");

// Signup route
router.post("/signup", async (req, res) => {
  const { username, password } = req?.body || {};

  // Validate the data
  if (!username || !password) {
    return res.json(
      {
        success: false,
        error:
          "Please enter all required filed { username: string, password: string }!",
      },
      400
    );
  }

  const newUser = await authService.signup(username, password);

  res.json({ success: true, data: newUser });
});

// Signin route
router.post("/signin", async (req, res) => {
  const { username, password } = req?.body || {};

  // Validate the data
  if (!username || !password) {
    return res.json(
      {
        success: false,
        error: "The username or password are incorrect!",
      },
      400
    );
  }

  const data = await authService.signin(username, password);

  let token;

  token = jwt.sign(
    {
      userId: data.id,
      userName: data.username,
      role: data.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  try {
    return res.json({
      success: true,
      data: { data, token },
    });
  } catch (error) {
    console.log(error);
  }

  return res.json(
    {
      success: false,
      data: null,
      message: "The username or password are incorrect!",
    },
    401
  );
});

module.exports = router;
