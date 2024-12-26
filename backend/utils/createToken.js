const jwt = require("jsonwebtoken");

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

module.exports = createToken;
