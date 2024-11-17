import React, { useState, useEffect } from 'react';

const RoomComponent = ({ onAddPlayer }) => {
  const [players, setPlayers] = useState([]);
  const [image, setImage] = useState(null);
  const [hasUploaded, setHasUploaded] = useState(false);

  // Sync players from localStorage when the component mounts
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    setPlayers(storedPlayers);

    // Listen for storage changes in other tabs and update players state
    const handleStorageChange = () => {
      const updatedPlayers = JSON.parse(localStorage.getItem('players')) || [];
      setPlayers(updatedPlayers);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to add a player and update localStorage
  const handleUpload = () => {
    if (image && !hasUploaded) {
      const newPlayerList = [...players, image];
      setPlayers(newPlayerList);
      localStorage.setItem('players', JSON.stringify(newPlayerList)); // Store players in localStorage

      onAddPlayer(image); // Emit the image to parent component
      setImage(null); // Reset image input
      setHasUploaded(true); // Mark as uploaded
    }
  };

  // Handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Update the image preview
    }
  };

  return (
    <div className="container mt-4 p-4 rounded shadow-lg bg-light">
      <h3 className="text-center text-primary">
        {players.length}/6 Players in the Room
      </h3>
      <p className="text-center text-muted">
        Upload your image to join the game!
      </p>

      <div className="mt-4">
        {!hasUploaded ? (
          <>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && (
              <div className="mt-3 text-center">
                <img
                  src={image}
                  alt="Uploaded"
                  className="img-thumbnail"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                />
                <div className="mt-3">
                  <button
                    className="btn btn-success btn-lg px-4"
                    onClick={handleUpload}
                  >
                    <i className="bi bi-cloud-upload-fill me-2"></i>Upload Image
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="mt-3 text-center">
            <p>You have already uploaded your image!</p>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h5 className="text-secondary">Players in the Room:</h5>
        <div className="d-flex justify-content-start gap-3">
          {players.map((player, index) => (
            <div
              key={index}
              className="rounded-circle bg-secondary d-flex justify-content-center align-items-center"
              style={{
                width: '75px',
                height: '75px',
                overflow: 'hidden',
              }}
            >
              <img
                src={player}
                alt={`Player ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomComponent;
