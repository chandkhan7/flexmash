import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './RoomComponent.css'; // Make sure the path is correct


// Connect to the backend socket server
const socket = io('http://localhost:4000');

const RoomComponent = ({ players, onAddPlayer }) => {
  const [image, setImage] = useState(null);
  const [hasUploaded, setHasUploaded] = useState(false);

  useEffect(() => {
    // Listen for real-time updates to the players list
    socket.on('playersUpdate', (updatedPlayers) => {
      onAddPlayer(updatedPlayers); // Update the players in the parent component
    });

    // Check if the user has already uploaded an image via localStorage
    const uploadedImage = localStorage.getItem('uploadedImage');
    if (uploadedImage) {
      setHasUploaded(true); // Mark the user as having uploaded an image
    }

    return () => {
      socket.off('playersUpdate');
    };
  }, [onAddPlayer]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (image && !hasUploaded) {
      // Save the uploaded image to localStorage
      localStorage.setItem('uploadedImage', image);

      // Emit the image to the server to update the players list
      socket.emit('uploadImage', image);

      setImage(null); // Reset the image input
      setHasUploaded(true); // Mark as uploaded
    }
  };

  return (
    <div className="container mt-4 p-4 rounded shadow-lg bg-light">
      <h3 className="text-center text-primary">
        {players.length}/6 Players in the Room
      </h3>
      <p className="text-center text-muted">
        Upload your image to fill the room. Once six players are added, voting will begin!
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
        <div className="d-flex flex-wrap gap-3">
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
