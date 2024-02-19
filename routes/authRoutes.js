const express = require("express");

const {
  login,
  register,
  changePassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/sign-up", register);

router.post("/login", login);

router.post("/change-password", changePassword);

module.exports = router;
