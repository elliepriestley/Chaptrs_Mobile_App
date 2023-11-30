const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  datetime: { type: Date, required: true },
  location: { type: String, required: true },
  bookclub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bookclub',
    required: true,
  },
  users_attending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  chosen_book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    // required: true
  },
  suggested_books: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    },
  ],
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
