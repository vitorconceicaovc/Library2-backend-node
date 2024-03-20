const jwt = require('jsonwebtoken');

const generateToken = (userId, email, name) => {
  // Payload do token com informações adicionais
  const payload = {
    userId: userId,
    email: email,
    name: name // Adicionar o nome do usuário ao payload
  };

  // Chave secreta para assinar o token (deve ser mantida em segredo)
  const secretKey = 'sua_chave_secreta';

  // Opções do token (como expiração)
  const options = {
    expiresIn: '1h' // Token expira em 1 hora
  };

  // Gerar o token com payload, chave secreta e opções
  const token = jwt.sign(payload, secretKey, options);

  return token;
};