const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

router.post('/', playerController.addPlayer);  // Add a player
router.get('/', playerController.getPlayers); // Get all players

module.exports = router;
