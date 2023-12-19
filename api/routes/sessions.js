const express = require('express');
const router = express.Router();
const tokenChecker = require('../lib/token_checker');

const SessionsController = require('../controllers/sessions');
const NotesController = require('../controllers/notes');

router.post('/', tokenChecker, SessionsController.Create);
router.get('/', tokenChecker, SessionsController.FindAll);
router.get('/:id', tokenChecker, SessionsController.FindById);
router.delete('/:id', tokenChecker, SessionsController.DeleteById);
router.patch('/:id', tokenChecker, SessionsController.UpdateById);
router.patch('/:id/join', tokenChecker, SessionsController.JoinSession);
router.post('/:id/notes', tokenChecker, NotesController.Create, SessionsController.CreateSessionNote);
router.patch('/:id/notes/:noteId', tokenChecker, NotesController.UpdateById, SessionsController.CreateSessionNote);
router.delete('/:id/notes/:noteId', tokenChecker, NotesController.DeleteById, SessionsController.DeleteSessionNote);

module.exports = router;
