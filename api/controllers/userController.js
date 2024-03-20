// controllers/userController.js
const User = require("../models/User");
const bcrypt = require('bcrypt');

// Função para registrar um novo usuário
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se os campos obrigatórios foram fornecidos
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    // Verificar se o nome de usuário já está em uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já está em uso." });
    }

    // Criptografar a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar um novo usuário com o nome de usuário e senha criptografada
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
