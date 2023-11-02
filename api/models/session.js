const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
    date: { type: String, required: true },
    location: { type: String, required: true },
    users_attending: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    chosen_book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    suggested_books: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User", 
            },
            book_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            },
        },
    ],
    attending: { type: Number, default: 0 }, // Added to implement attendance count on 'Attend' button click
});

const Session = mongoose.model("Session", SessionSchema);

module.exports = Session;