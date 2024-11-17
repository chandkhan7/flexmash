const { calculateNewRating } = require('../services/eloRatingService'); // Import Elo rating logic

// Handle vote
exports.vote = (req, res) => {
  const { winnerName, loserName } = req.body;
  const winner = players.find(player => player.name === winnerName);
  const loser = players.find(player => player.name === loserName);

  if (!winner || !loser) {
    return res.status(404).json({ message: 'Player not found' });
  }

  // Update Elo ratings
  const updatedWinnerRating = calculateNewRating(winner.rating, loser.rating, true);
  const updatedLoserRating = calculateNewRating(loser.rating, winner.rating, false);

  winner.rating = updatedWinnerRating;
  loser.rating = updatedLoserRating;

  // Update win/loss stats
  winner.wins++;
  loser.losses++;

  res.json({
    winner: { name: winner.name, rating: winner.rating, wins: winner.wins, losses: winner.losses },
    loser: { name: loser.name, rating: loser.rating, wins: loser.wins, losses: loser.losses },
  });
};
