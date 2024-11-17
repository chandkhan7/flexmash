import React, { useState } from 'react';
import RoomComponent from './components/RoomComponent';
import VotingComponent from './components/VotingComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [roomFull, setRoomFull] = useState(false);
  const [playerStats, setPlayerStats] = useState({}); // Track win/loss counts

  // Add a player to the room
  const handleAddPlayer = (image) => {
    if (players.length < 6) {
      const newPlayer = { image, rating: 1200, name: `Player ${players.length + 1}` };

      // Update the players list and check if the room is full
      setPlayers(prevPlayers => {
        const updatedPlayers = [...prevPlayers, newPlayer];

        // Check if the room is full (after the new player is added)
        if (updatedPlayers.length === 6) {
          setRoomFull(true); // Set the room as full
        }

        return updatedPlayers;
      });
    }
  };

  // Update player stats (win/loss)
  const updatePlayerStats = (winner, loser) => {
    const updatedStats = { ...playerStats };

    // Update winner's stats
    updatedStats[winner.name] = {
      wins: (updatedStats[winner.name]?.wins || 0) + 1,
      losses: updatedStats[winner.name]?.losses || 0,
    };

    // Update loser's stats
    updatedStats[loser.name] = {
      wins: updatedStats[loser.name]?.wins || 0,
      losses: (updatedStats[loser.name]?.losses || 0) + 1,
    };

    // Update the state and localStorage
    setPlayerStats(updatedStats);
    localStorage.setItem(winner.name, JSON.stringify(updatedStats[winner.name]));
    localStorage.setItem(loser.name, JSON.stringify(updatedStats[loser.name]));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">FlexMash</h1>

      {/* Show RoomComponent until the room is full */}
      {!roomFull ? (
        <RoomComponent players={players} onAddPlayer={handleAddPlayer} />
      ) : (
        <VotingComponent
          players={players}
          setPlayers={setPlayers}
          playerStats={playerStats}
          updatePlayerStats={updatePlayerStats} // Pass the function to update stats
        />
      )}
    </div>
  );
};

export default App;
