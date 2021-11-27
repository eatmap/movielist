const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  date: { type: Date, required: true},
  info: { type: String, required: true}
});

module.exports = mongoose.model('Movie', MovieSchema);
