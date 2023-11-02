const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({

    authors: { type: Array, required: true },
    title: { type: String, required: true },
    year_published: { type: String, required: true },
    // TODO: session_id may be unnecessary. Remove?
    session: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: false,
        },
    ],
    cover_photo: { type: String, required: false },
    
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;