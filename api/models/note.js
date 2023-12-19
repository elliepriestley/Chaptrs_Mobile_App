const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    page: Number,
    chapter: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      autopopulate: true,
    },
  },
  {
    timestamps: true,
  },
);

NoteSchema.plugin(require('mongoose-autopopulate'));

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
