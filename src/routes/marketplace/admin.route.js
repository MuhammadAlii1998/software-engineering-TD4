// src/routes/marketplace/admin.route.js
import { Router } from 'express';
import store from '../../data/store.js';
import { verifyToken, requireRole } from '../../utils/auth.util.js';

const router = Router();

// List users
router.get('/users', verifyToken, requireRole('admin'), (req, res) => {
  res.json(store.users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role })));
});

// Update user role
router.patch('/users/:id/role', verifyToken, requireRole('admin'), (req, res) => {
  const user = store.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  user.role = req.body.role;
  res.json(user);
});

// View pending products
router.get('/products/pending', verifyToken, requireRole('admin'), (req, res) => {
  const pending = store.products.filter(p => !p.approved);
  res.json(pending);
});

export default router;
