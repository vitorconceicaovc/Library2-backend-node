// middleware/authenticateToken.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Pegue o token do cabeçalho da requisição
  const token = req.header('Authorization');

  // Se o token não estiver presente
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verifique o token
    const decoded = jwt.verify(token, 'suaChaveSecreta');

    // Adicione o usuário do token à requisição
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};