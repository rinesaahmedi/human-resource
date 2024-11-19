const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

// Routes
const authRouter = require("./auth/auth.router");
const employeeRouter = require("./employee/employee.router");

const publicRoutes = ["/api/auth/signin", "/api/auth/signup"];

// Configure app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// JWT Middleware
app.use((req, res, next) => {
  console.log(req.path);
  // Skip middleware for public routes
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  // Extract token from Authorization header
  const authHeader = req.headers["authorization"];

  // Ensure the header exists and follows the Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  console.log("secret", process.env.JWT_SECRET_KEY);

  // Verify token
  jwt.verify(token.trim(), process.env.JWT_SECRET_KEY, (err, user) => {
    console.log("usr", err);
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    // Attach user information to request object
    req.user = user;
    next();
  });
});

// Register routers
app.use("/api/auth", authRouter);
app.use("/api/employee", employeeRouter);

app.get("/api", (req, res) => {
  res.json({ success: true, message: "Welcome to HRM api!" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
