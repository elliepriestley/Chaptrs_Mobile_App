const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: String,
  date_joined: { type: Date, default: Date.now },
  profile_picture: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
