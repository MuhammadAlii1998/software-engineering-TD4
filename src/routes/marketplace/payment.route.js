// src/routes/marketplace/payment.route.js
import { Router } from 'express';
import store from '../../data/store.js';
import { verifyToken, requireRole } from '../../utils/auth.util.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Create order
router.post('/', verifyToken, requireRole('buyer'), (req, res) => {
  const { productId } = req.body;
  const product = store.products.find(p => p.id === productId && p.approved);
  if (!product) return res.status(404).json({ message: 'Product not available' });
  const order = { id: uuidv4(), buyerId: req.user.id, productId, status: 'pending' };
  store.orders.push(order);
  res.json(order);
});

// List user's orders
router.get('/', verifyToken, (req, res) => {
  const orders = store.orders.filter(o => o.buyerId === req.user.id || req.user.role === 'admin');
  res.json(orders);
});

// Update order status (admin)
router.patch('/:id/status', verifyToken, requireRole('admin'), (req, res) => {
  const order = store.orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ message: 'Not found' });
  order.status = req.body.status;
  res.json(order);
});

export default router;
