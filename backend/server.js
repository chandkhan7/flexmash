// server.js (Node.js backend)

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = []; // This will store players' image data

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send the current list of players when a new user connects
  socket.emit('playersUpdate', players);

  // Listen for image upload events and broadcast to other users
  socket.on('uploadImage', (image) => {
    if (players.length < 6) {
      players.push(image);
      io.emit('playersUpdate', players); // Broadcast the updated players to all clients
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
