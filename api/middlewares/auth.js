const { validateToken } = require("../config/tokens");

function validateUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Token invalid");
  }
  const { payload } = validateToken(token);

  if (!payload) {
    return res.status(401).send("Token invalid");
  }
  req.user = payload;
  next();
}

module.exports = validateUser;
