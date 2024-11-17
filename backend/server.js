const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the root HTML page (or any other page) for direct access
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle socket connections
let players = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  // Send the current player list to the newly connected client
  socket.emit('playersUpdate', players);

  // Listen for new player image uploads
  socket.on('uploadImage', (image) => {
    players.push(image); // Add the new player image to the list

    // Emit the updated player list to all connected clients
    io.emit('playersUpdate', players);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
server.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
