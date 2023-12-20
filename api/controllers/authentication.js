const bcrypt = require('bcrypt');
const User = require('../models/user');
const TokenGenerator = require('../lib/token_generator');

const AuthenticationController = {
  Authenticate: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({ email: email });
      if (!user) {
        console.log('auth error: user not found');
        res.status(401).json({ message: 'Login details incorrect' });
      } else {
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          console.log('auth error: passwords do not match');
          res.status(401).json({ message: 'Login details incorrect' });
        } else {
          const token = TokenGenerator.jsonwebtoken(user.id);
          res
            .status(201)
            .json({ token: token, message: 'User authorised', user: user });
        }
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = AuthenticationController;
