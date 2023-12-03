const express = require("express");
const router = express.Router();
const tokenChecker = require("../lib/token_checker");

const SessionsController = require("../controllers/sessions");

router.post('/', tokenChecker, SessionsController.Create);
router.get('/', tokenChecker, SessionsController.FindAll);
router.get('/:id', tokenChecker, SessionsController.FindById);
router.delete('/:id', tokenChecker, SessionsController.DeleteById);
router.patch('/:id', tokenChecker, SessionsController.UpdateById);
router.patch('/:id/join', tokenChecker, SessionsController.joinSession);
// router.post("/:session_id/attend", tokenChecker, SessionsController.AddAttending);


module.exports = router;