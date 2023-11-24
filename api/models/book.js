const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }],
  year_published: { type: String, required: true },
  cover_photo: String,
  session: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
    },
  ],
});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;
