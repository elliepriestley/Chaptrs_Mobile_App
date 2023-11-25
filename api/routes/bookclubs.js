const express = require('express');
const router = express.Router();
const tokenChecker = require('../lib/token_checker');
const BookclubsController = require('../controllers/bookclubs');

router.post('/', tokenChecker, BookclubsController.Create);
router.get('/', tokenChecker, BookclubsController.FindAll);
router.get('/:id', tokenChecker, BookclubsController.FindById);
router.delete('/:id', tokenChecker, BookclubsController.DeleteById);
router.patch('/:id', tokenChecker, BookclubsController.UpdateById);

module.exports = router;
