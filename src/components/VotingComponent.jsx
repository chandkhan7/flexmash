import React, { useState, useEffect } from "react";
import axios from "axios";

const VotingComponent = () => {
  const [players, setPlayers] = useState([]); // Array to hold player data
  const [player1, setPlayer1] = useState(null); // Player 1 for voting
  const [player2, setPlayer2] = useState(null); // Player 2 for voting
  const [eliminatedPlayers, setEliminatedPlayers] = useState([]); // Track eliminated players
  const [uploading, setUploading] = useState(false); // Handle upload state

  // Upload handler
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (players.length >= 6) {
      alert("The room is full. Wait for the next session.");
      return;
    }

    if (file) {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        // Simulate adding a player
        setPlayers((prevPlayers) => [
          ...prevPlayers,
          { id: prevPlayers.length + 1, name: `Player ${prevPlayers.length + 1}`, image: reader.result, rating: 1000 },
        ]);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Randomly select two players for voting when 6 players are available
  useEffect(() => {
    if (players.length === 6 && players.length > eliminatedPlayers.length) {
      const availablePlayers = players.filter(
        (player) => !eliminatedPlayers.includes(player.id)
      );
      if (availablePlayers.length >= 2) {
        const randomIndex1 = Math.floor(Math.random() * availablePlayers.length);
        let randomIndex2 = Math.floor(Math.random() * availablePlayers.length);

        while (randomIndex2 === randomIndex1) {
          randomIndex2 = Math.floor(Math.random() * availablePlayers.length);
        }

        setPlayer1(availablePlayers[randomIndex1]);
        setPlayer2(availablePlayers[randomIndex2]);
      }
    }
  }, [players, eliminatedPlayers]);

  // Handle voting logic
  const handleVote = (winner) => {
    const loser = winner === player1 ? player2 : player1;
    setEliminatedPlayers((prev) => [...prev, loser.id]);

    if (players.length - eliminatedPlayers.length === 1) {
      alert(`The final winner is ${winner.name}!`);
      return;
    }

    // Set next match
    setPlayer1(winner);
    const remainingPlayers = players.filter(
      (player) =>
        player.id !== loser.id &&
        !eliminatedPlayers.includes(player.id) &&
        player.id !== winner.id
    );
    if (remainingPlayers.length > 0) {
      setPlayer2(remainingPlayers[Math.floor(Math.random() * remainingPlayers.length)]);
    } else {
      setPlayer2(null);
    }
  };

  return (
    <div className="container mt-4">
      {players.length < 6 ? (
        <div className="text-center">
          <h4>Upload Your Image to Join the Room</h4>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
          {uploading && <p>Uploading...</p>}
          <p>{players.length}/6 Players Joined</p>
        </div>
      ) : (
        <>
          {player1 && player2 ? (
            <div className="row text-center">
              {[player1, player2].map((player, index) => (
                <div key={player.id} className="col-6 d-flex flex-column align-items-center">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="img-fluid rounded-circle"
                    style={{
                      width: "200px",
                      height: "200px",
                      cursor: "pointer",
                      maxWidth: "100%",
                    }}
                    onClick={() => handleVote(player)}
                  />
                  <button className="btn btn-primary mt-2" onClick={() => handleVote(player)}>
                    Vote for {player.name}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Waiting for players...</p>
          )}
        </>
      )}
    </div>
  );
};

export default VotingComponent;
