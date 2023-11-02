const express = require("express");
const router = express.Router();
const tokenChecker = require("../lib/token_checker");

const SessionsController = require("../controllers/sessions");

router.post("/", tokenChecker, SessionsController.Create);
router.get("/", tokenChecker, SessionsController.Index);
router.post("/:session_id/attend", tokenChecker, SessionsController.AddAttending);


module.exports = router;