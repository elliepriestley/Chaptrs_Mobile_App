const Book = require('../models/book');
const TokenGenerator = require('../lib/token_generator');

const BooksController = {
  FindAll: async (req, res) => {
    try {
      const books = await Book.find();
      if (!books) {
        throw new Error('Books not found');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ books: books, token: token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  FindById: async (req, res) => {
    try {
      const books = await Book.findById(req.params.id);
      if (!books) {
        throw new Error('Books not found');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ books: books, token: token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  Create: async (req, res) => {
    try {
      const book = await Book.create(req.body);
      if (!book) {
        throw new Error('Book could not be created');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `${book.title} book has been created`,
        token: token,
        book: book,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  DeleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByIdAndDelete(id);
      if (!book) {
        throw new Error('Book does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `${book.title} book has been deleted`,
        token: token,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  UpdateById: async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!book) {
        throw new Error('Book does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `${book.title} has been updated`,
        token: token,
        book: book,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = BooksController;
