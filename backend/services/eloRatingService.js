function calculateEloRating(playerRating, opponentRating, isWinner) {
  const K = 32;
  const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
  const score = isWinner ? 1 : 0;
  return Math.round(playerRating + K * (score - expectedScore));
}

module.exports = { calculateEloRating };
