// middleware/authenticateToken.js
const jwt = require("jsonwebtoken");
// const config = require("../config/config");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido." });
    }

    req.userId = decoded.id;
    next();
  });
};
