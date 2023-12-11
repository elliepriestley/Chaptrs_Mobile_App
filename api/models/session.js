const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  datetime: { type: Date, required: true },
  location: { type: String, required: true },
  details: String,
  bookclub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bookclub',
    required: true,
    autopopulate: true,
  },
  users_attending: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
  chosen_book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
    autopopulate: true,
  },
  suggested_books: [
    {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
      },
      book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        autopopulate: true,
      },
    },
  ],
});

SessionSchema.plugin(require('mongoose-autopopulate'));

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
