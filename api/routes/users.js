const express = require('express');
const router = express.Router();
const tokenChecker = require('../lib/token_checker');

const UsersController = require('../controllers/users');

router.post('/', UsersController.Create);
router.get('/', tokenChecker, UsersController.FindAll);
router.get('/me', tokenChecker, UsersController.FindMe);

module.exports = router;
