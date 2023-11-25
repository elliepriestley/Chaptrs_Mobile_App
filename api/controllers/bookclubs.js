const Bookclub = require('../models/bookclub');
const TokenGenerator = require('../lib/token_generator');

const BookclubsController = {
  FindAll: async (req, res) => {
    try {
      const bookclubs = await Bookclub.find();
      if (!bookclubs) {
        throw new Error('Bookclubs not found');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ bookclubs: bookclubs, token: token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  FindById: async (req, res) => {
    try {
      const bookclubs = await Bookclub.findById(req.params.id);
      if (!bookclubs) {
        throw new Error('Bookclubs not found');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ bookclubs: bookclubs, token: token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  Create: async (req, res) => {
    try {
      const bookclub = await Bookclub.create(req.body);
      if (!bookclub) {
        throw new Error('Bookclub could not be created');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `${bookclub.name} bookclub has been created`,
        token: token,
        bookclub: bookclub,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  DeleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const bookclub = await Bookclub.findByIdAndDelete(id);
      if (!bookclub) {
        throw new Error('Bookclub does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `${bookclub.name} bookclub has been deleted`,
        token: token,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  UpdateById: async (req, res) => {
    try {
      const { id } = req.params;
      const bookclub = await Bookclub.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!bookclub) {
        throw new Error('Bookclub does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `${bookclub.name} bookclub has been updated`,
        token: token,
        bookclub: bookclub,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = BookclubsController;
