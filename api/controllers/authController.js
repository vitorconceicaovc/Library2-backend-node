// controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
// const config = require("../config/config");
const User = require("../models/User");

// Função de login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign({ id: user._id }, config.secretKey, {
      expiresIn: 86400, // 24 horas em segundos
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
