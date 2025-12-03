// src/routes/marketplace/admin.route.js
const express = require('express');
const router = express.Router();
const store = require('../../data/store');
const { verifyToken, requireRole } = require('../../utils/auth.util');

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

module.exports = router;
