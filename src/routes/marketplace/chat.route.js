// src/routes/marketplace/chat.route.js
import { Router } from 'express';
import store from '../../data/store.js';
import { verifyToken } from '../../utils/auth.util.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

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

export default router;
