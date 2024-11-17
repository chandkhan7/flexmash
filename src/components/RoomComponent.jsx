import React, { useState } from 'react';

const RoomComponent = ({ players, onAddPlayer }) => {
  const [image, setImage] = useState(null);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Update the image preview
    }
  };

  const handleUpload = () => {
    if (image && !hasUploaded) {
      // Emit the image to the parent component to update the players list
      onAddPlayer(image);
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
