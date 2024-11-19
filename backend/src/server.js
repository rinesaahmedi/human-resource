const express = require("express");
const app = express();
var bodyParser = require("body-parser");

const authRouter = require("./auth/auth.router");

// Configure app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register routers
app.use("/api/auth", authRouter);

app.get("/api", (req, res) => {
  res.json({ success: true, message: "Welcome to HRM api!" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
