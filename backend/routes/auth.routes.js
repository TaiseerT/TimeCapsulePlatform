const express = require("express");
const router = express.Router();

// auth validation
const {
  registerValidator,
  loginValidator,
} = require("../utils/validators/auth.validator");

// auth controllers
const { register, login } = require("../controllers/auth.controller");

router.route("/register").post(registerValidator, register);
router.route("/login").post(loginValidator, login);
module.exports = router;
