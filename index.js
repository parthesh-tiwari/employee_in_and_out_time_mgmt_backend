const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./constants/database");

const app = express();

app.use(express.json());
app.use(cors("*"));

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Welcome to Employee In and out time management system");
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/employees", require("./routes/employeeRoutes"));

app.use("/api/employee-entry", require("./routes/entryRoutes"));

mongoose.connect(MONGODB_URI, {}).then(() => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
