const { body, validationResult } = require("express-validator");
const Book = require("../../models/book");
const asyncHandler = require("express-async-handler");

// Display list of all books - API
exports.book_list_api = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title author")
    .sort({ title: 1 })
    .populate("author")
    .exec();

  res.json({ books: allBooks });
});

// Display detail page for a specific book - API
exports.book_detail_api = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id)
    .populate("author")
    .populate("genre")
    .exec();

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json({ book: book });
});

// Handle book create on POST - API
exports.book_create_api = [
  body("title", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("summary", "Summary must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, summary, isbn, genre } = req.body;

    const book = new Book({
      title,
      author,
      summary,
      isbn,
      genre,
    });

    try {
      const newBook = await book.save();
      res.status(201).json({ book: newBook });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }),
];

// Handle book update on PUT - API
exports.book_update_api = [
  body("title", "Title must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("author", "Author must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("summary", "Summary must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
  body("genre.*").escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, summary, isbn, genre } = req.body;

    const book = {
      title,
      author,
      summary,
      isbn,
      genre,
    };

    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, { new: true });
      res.json({ book: updatedBook });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }),
];

// Handle book delete on DELETE - API
exports.book_delete_api = asyncHandler(async (req, res, next) => {
  try {
    await Book.findByIdAndRemove(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
