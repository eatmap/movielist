const mongoose = require('mongoose');

const WatchListSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  description: { type: String, required: true},
  movies: {type: Array, required: true}
});

module.exports = mongoose.model('Movie', MovieSchema);
