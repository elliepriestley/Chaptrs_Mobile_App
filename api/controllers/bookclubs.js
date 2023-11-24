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
      res.status(500).json({ message: err.message });
    }
  },
  Create: async (req, res) => {
    try {
      const bookclub = Bookclub.create(req.body);
      if (!bookclub) {
        throw new Error('Bookclub could not be created');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res
        .status(201)
        .json({ message: 'Bookclub Created', token: token, book: bookclub });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = BookclubsController;
