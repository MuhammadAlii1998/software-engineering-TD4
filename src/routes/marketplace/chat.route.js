// src/routes/marketplace/chat.route.js
const express = require('express');
const router = express.Router();
const store = require('../../data/store');
const { verifyToken } = require('../../utils/auth.util');
const { v4: uuidv4 } = require('uuid');

// Send message
router.post('/', verifyToken, (req, res) => {
  const { receiverId, text } = req.body;
  const message = { id: uuidv4(), senderId: req.user.id, receiverId, text, timestamp: new Date() };
  store.messages.push(message);
  res.json(message);
});

// Get messages with a user
router.get('/:userId', verifyToken, (req, res) => {
  const messages = store.messages.filter(
    m => (m.senderId === req.user.id && m.receiverId === req.params.userId) ||
         (m.receiverId === req.user.id && m.senderId === req.params.userId)
  );
  res.json(messages);
});

module.exports = router;
