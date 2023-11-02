const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
    Create: async (req, res) => {
        try {
            const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
            if (existingUser) {
                if (existingUser.username === req.body.username) {
                    res.status(409).json({ message: 'User already exists' });
                } else if (existingUser.email === req.body.email) {
                    res.status(409).json({ message: 'User already exists' });
                }
            } else {
                const user = new User(req.body);
                await user.save();
                res.status(201).json({ message: 'OK' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    Index: async (req, res) => {
        try {
            const users = await User.find();
            // Assuming req.user_id contains the user's ID
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            console.log("Generated Token:", token);
            res.status(200).json({ users: users, token: token });
        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

module.exports = UsersController;