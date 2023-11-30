const Session = require('../models/session');
const TokenGenerator = require('../lib/token_generator');
const User = require('../models/user');
const session = require('express-session');

const SessionsController = {
  FindAll: async (req, res) => {
    try {
      const sessions = await Session.find()
        .populate('chosen_book')
        .populate('users_attending')
        .populate('suggested_books.user_id')
        .populate('suggested_books.book_id')
        .populate('bookclub');
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
      const sessions = await Session.findById(req.params.id)
        .populate('chosen_book')
        .populate('users_attending')
        .populate('suggested_books.user_id')
        .populate('suggested_books.book_id')
        .populate('bookclub');
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
    console.log(req.body);
    try {
      const session = await Session.create(req.body)
      await session.populate([
        'chosen_book',
        'bookclub',
      ]);
      if (!session) {
        throw new Error('Session could not be created');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `Session has been created at ${session.location} on ${session.datetime.toLocaleDateString()} at ${session.datetime.toLocaleTimeString()}`,
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
        } on ${session.datetime.toLocaleDateString()} at ${session.datetime.toLocaleTimeString()}`,
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
      })
        .populate('chosen_book')
        .populate('users_attending')
        .populate('suggested_books.user_id')
        .populate('suggested_books.book_id')
        .populate('bookclub');
      if (!session) {
        throw new Error('Session does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `Session has been updated at ${
          session.location
        } on ${session.datetime.toLocaleDateString()} at ${session.datetime.toLocaleTimeString()}`,
        token: token,
        session: session,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = SessionsController;
