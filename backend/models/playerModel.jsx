const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: { type: Number, default: 1200 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
