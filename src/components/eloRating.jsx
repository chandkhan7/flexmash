const K = 32;

export function calculateNewRating(playerRating, opponentRating, playerWon) {
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const actualScore = playerWon ? 1 : 0;
    const newRating = playerRating + K * (actualScore - expectedScore);
    return newRating;
}
