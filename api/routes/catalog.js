// api/routes/catalog.js

const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Rota para listar todos os livros
router.get('/books', bookController.book_list);

// Rota para criar um novo livro
router.post('/books/create', bookController.book_create_post);

// Rota para detalhes de um livro específico
router.get('/books/:id', bookController.book_detail);

// Rota para atualizar um livro específico
router.put('/books/:id/update', bookController.book_update_put);

// Rota para deletar um livro específico
router.delete('/books/:id/delete', bookController.book_delete_delete);

module.exports = router;
