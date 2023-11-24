const Session = require('../models/session');
const TokenGenerator = require('../lib/token_generator');
const User = require('../models/user');
const session = require('express-session');

const SessionsController = {
  FindAll: async (req, res) => {
    try {
      const sessions = await Session.find();
      if (!sessions) {
        throw new Error('Sessions not found');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ sessions: sessions, token: token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  FindById: async (req, res) => {
    try {
      const sessions = await Session.findById(req.params.id);
      if (!sessions) {
        throw new Error('Sessions not found');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ sessions: sessions, token: token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  Create: async (req, res) => {
    try {
      const session = await Session.create(req.body);
      if (!session) {
        throw new Error('Session could not be created');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `Session has been created at ${
          session.location
        } on ${session.date.toLocaleDateString()} at ${session.date.toLocaleTimeString()}`,
        token: token,
        session: session,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  DeleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const session = await Session.findByIdAndDelete(id);
      if (!session) {
        throw new Error('Session does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `Session has been deleted at ${
          session.location
        } on ${session.date.toLocaleDateString()} at ${session.date.toLocaleTimeString()}`,
        token: token,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  UpdateById: async (req, res) => {
    try {
      const { id } = req.params;
      const session = await Session.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!session) {
        throw new Error('Session does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `Session has been updated at ${
          session.location
        } on ${session.date.toLocaleDateString()} at ${session.date.toLocaleTimeString()}`,
        token: token,
        session: session,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = SessionsController;
