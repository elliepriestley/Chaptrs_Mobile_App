const express = require("express");
const router = express.Router();
const tokenChecker = require('../lib/token_checker');

const NotesController = require("../controllers/notes");

router.post('/', tokenChecker, NotesController.Create);
router.get('/', tokenChecker, NotesController.FindAll);
router.get('/:id', tokenChecker, NotesController.FindById);
router.delete('/:id', tokenChecker, NotesController.DeleteById);
router.patch('/:id', tokenChecker, NotesController.UpdateById);

module.exports = router;