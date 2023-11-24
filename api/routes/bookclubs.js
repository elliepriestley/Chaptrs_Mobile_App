const express = require('express');
const router = express.Router();
const tokenChecker = require('../lib/token_checker');
const BookclubsController = require('../controllers/bookclubs');

router.get('/', tokenChecker, BookclubsController.FindAll);
router.post('/', tokenChecker, BookclubsController.Create);

module.exports = router;
