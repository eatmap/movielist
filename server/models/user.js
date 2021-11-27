const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchLists: { type: Array, required: true },
});

module.exports = mongoose.model('User', UserSchema);
