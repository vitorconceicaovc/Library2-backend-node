// controllers/userController.js
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    // Gerar um token JWT
    // const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'suaChaveSecreta', { expiresIn: '1h' });

    res.status(201).json({ message: "Usuário registrado com sucesso.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

// Função para fazer login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se o email e a senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Procura o usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Verifica se a senha está correta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // Se as credenciais estiverem corretas, gera um token JWT
    const token = jwt.sign({ userId: user._id, email: user.email }, 'suaChaveSecreta', { expiresIn: '1h' });

    res.status(200).json({ message: "Login bem-sucedido.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};
