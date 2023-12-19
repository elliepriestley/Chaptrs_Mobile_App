const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  published: { type: Date, required: true },
  cover_photo: String,
  description: String,
  isbn: String,
  categories: [String],
  // genre: String,
  // session: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Session',
  //   },
  // ],
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
