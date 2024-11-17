const Player = require('../models/playerModel'); // Import Player model (if using a database)

// Add a new player
exports.addPlayer = (req, res) => {
  const { image, name } = req.body;
  const newPlayer = { image, name, rating: 1200, wins: 0, losses: 0 };

  // You can insert the player into a database or keep it in memory
  players.push(newPlayer);

  res.status(201).json(newPlayer);
};

// Get all players
exports.getPlayers = (req, res) => {
  res.json(players); // Or fetch from database
};
