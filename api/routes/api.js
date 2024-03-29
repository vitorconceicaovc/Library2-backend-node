const express = require("express");
const router = express.Router();
const book_controller = require("../controllers/bookController");
const bookinstance_controller = require("../controllers/bookinstanceController")
const userController = require("../../api/controllers/userController");
const author_controller = require("../controllers/authorController")
const authenticateToken = require("../middleware/authenticateToken");

// POST register user
router.post("/users/register", userController.registerUser);
// POST register user
router.post("/users/login", userController.loginUser);

// GET all books
router.get("/books", book_controller.book_list_api);

// GET all instances
router.get("/booksinstances", bookinstance_controller.bookinstance_list_api);

// GET all authors
router.get("/authors", author_controller.author_list_api);

// POST verify token
router.post("/users/verifyToken", userController.verifyToken)

//Need to authenticateToken
router.use(authenticateToken);

// GET a specific book
router.get("/books/:id", book_controller.book_detail_api);

// POST create a new book
router.post("/books", book_controller.book_create_api);

// PUT update a book
router.put("/books/:id", book_controller.book_update_api);

// DELETE delete a book
router.delete("/books/:id", book_controller.book_delete_api);

// GET a specific author
router.get("/authors/:id", author_controller.author_detail_api);

module.exports = router;
