const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: false },
    date_joined: { type: String, required: false },
    profile_picture: { type: String, required: false }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;