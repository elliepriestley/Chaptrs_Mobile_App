const mongoose = require('mongoose');

const BookclubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  description: String,
  genre: [String],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
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

BookclubSchema.plugin(require('mongoose-autopopulate'));

const Bookclub = mongoose.model('Bookclub', BookclubSchema);

module.exports = Bookclub;
