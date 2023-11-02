const Book = require("../models/book");
const TokenGenerator = require("../lib/token_generator");

const BooksController = {
    Index: (req, res) => {
        Book.find((err, books) => {
            if (err) {
                throw err;
            }
            const token = TokenGenerator.jsonwebtoken(req.book_id)
            console.log("Generated Token:", token);
            res.status(200).json({ books: books, token: token });
        });
    },
    Create: (req, res) => {
        const book = new Book(req.body);
        console.log(book)
        book.save((err, savedBook) => {
            if (err) {
                throw err;
            }

            const token = TokenGenerator.jsonwebtoken(req.book_id)
            console.log("Generated Token:", token); // DEBUGGING
            res.status(201).json({ message: 'O', token: token, book: savedBook });
        });
    },
};

module.exports = BooksController;