import React, { useState } from 'react';
import RoomComponent from './RoomComponent';

const ParentComponent = () => {
  const [players, setPlayers] = useState([]); // Track players state

  // Function to add player to the list
  const onAddPlayer = (updatedPlayers) => {
    setPlayers(updatedPlayers); // Update players list in the state
  };

  const onGameStart = () => {
    if (players.length >= 6) {
      // Handle the game start logic
      console.log("Game Started!");
    }
  };

  return (
    <div>
      <RoomComponent players={players} onAddPlayer={onAddPlayer} onGameStart={onGameStart} />
    </div>
  );
};

export default ParentComponent;
