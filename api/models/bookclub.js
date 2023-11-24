const mongoose = require('mongoose');

const BookclubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
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

const Bookclub = mongoose.model('Bookclub', BookclubSchema);

module.exports = Bookclub;
