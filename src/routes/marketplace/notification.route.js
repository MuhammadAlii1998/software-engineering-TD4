// src/routes/marketplace/notification.route.js
import { Router } from 'express';
import store from '../../data/store.js';
import { verifyToken } from '../../utils/auth.util.js';

const router = Router();

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

export default router;
