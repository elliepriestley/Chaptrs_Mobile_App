const bcrypt = require('bcrypt');
const User = require('../models/user');
const TokenGenerator = require('../lib/token_generator');

const UsersController = {
  Create: async (req, res) => {
    try {
      const existingUser = await User.findOne({
        $or: [{ username: req.body.username }, { email: req.body.email }],
      });
      if (existingUser) {
        if (existingUser.username === req.body.username) {
          res.status(409).json({ message: 'Username already exists' });
        } else if (existingUser.email === req.body.email) {
          res.status(409).json({ message: 'Email already exists' });
        }
      } else {
        const saltRounds = 10;
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        if (!hash) {
          res.status(401).json({ message: "Password encryption error" });
        }
        req.body.password = hash;
        const user = new User(req.body);
        const newUser = await user.save();
        res.status(201).json({
          message: `User ${user.username} has been created`,
          user: newUser,
        });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  FindAll: async (req, res) => {
    try {
      const users = await User.find().select('-password');
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ users: users, token: token });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  FindMe: async (req, res) => {
    try {
      const user = await User.findById(req.user_id).select('-password');
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ user: user, token: token });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  UpdateById: async (req, res) => {
    try {
      const { id } = req.params;
      if (id !== req.user_id) {
        throw new Error('You are not authorised to update this user');
      }
      // maybe remove password from req.body in case user tries to update it?
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      }).select('-password');
      if (!user) {
        throw new Error('User does not exist');
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({
        message: `${user.username} has been updated`,
        token: token,
        user: user,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = UsersController;
