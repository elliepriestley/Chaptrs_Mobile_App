const Session = require("../models/session");
const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");
const session = require("express-session");

const SessionsController = {
    Index: (req, res) => {
        Session.find((err, sessions) => {
            if (err) {
                throw err;
            }
            const token = TokenGenerator.jsonwebtoken(req.session_id)
            res.status(200).json({ sessions: sessions, token: token});
        });
    },


    Create: (req, res) => {
        const session = new Session(req.body);
        session.save((err) => {
            if (err) {
                throw err;
            };
            const token = TokenGenerator.jsonwebtoken(req.session_id)
            res.status(201).json({ message: 'OK', token: token});
        });
    },

    /**
     * Handles user attendance for a session.
     * Increments the attendance count for the specified session and updates the database.
     *
     * @param {Object} req - The HTTP request object
     * @param {Object} res - The HTTP response object
     */
    AddAttending: async (req, res) => {
        const sessionId = req.params.session_id;
        const userId = req.body.user_id;
    
        try {
            const session = await Session.findOne({ _id: sessionId });
            if (!session) {
                console.log("Session not found:", sessionId);
                return res.status(404).json({ error: "Session not found" });
            }

            session.attending += 1;

            console.log("Updated attending count:", session.attending);

            await session.save();

            res.status(200).json({ success: true, attending: session.attending }); // Include attending count in the response
            } catch (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = SessionsController;