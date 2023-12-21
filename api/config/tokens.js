const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

function validateToken(token) {
  return jwt.verify(token, SECRET);
}

function generateToken(payload) {
  return jwt.sign({ payload }, SECRET, {
    expiresIn: "12h",
  });
}

module.exports = { generateToken, validateToken };
