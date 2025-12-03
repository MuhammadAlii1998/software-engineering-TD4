// src/routes/marketplace/notification.route.js
const express = require('express');
const router = express.Router();
const store = require('../../data/store');
const { verifyToken } = require('../../utils/auth.util');
const { v4: uuidv4 } = require('uuid');

// Get notifications
router.get('/', verifyToken, (req, res) => {
  const notifications = store.notifications.filter(n => n.userId === req.user.id);
  res.json(notifications);
});

// Mark as read
router.patch('/:id/read', verifyToken, (req, res) => {
  const notification = store.notifications.find(n => n.id === req.params.id && n.userId === req.user.id);
  if (!notification) return res.status(404).json({ message: 'Not found' });
  notification.read = true;
  res.json(notification);
});

module.exports = router;
