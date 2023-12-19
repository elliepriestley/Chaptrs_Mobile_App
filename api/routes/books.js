const express = require("express");
const router = express.Router();
const tokenChecker = require('../lib/token_checker');

const BooksController = require("../controllers/books");

router.post('/', tokenChecker, BooksController.Create);
router.get('/', tokenChecker, BooksController.FindAll);
router.get('/:id', tokenChecker, BooksController.FindById);
router.delete('/:id', tokenChecker, BooksController.DeleteById);
router.patch('/:id', tokenChecker, BooksController.UpdateById);

module.exports = router;