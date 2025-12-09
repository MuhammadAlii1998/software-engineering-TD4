// src/routes/marketplace/product.route.js
const express = require('express');
const router = express.Router();
const store = require('../../data/store');
const { verifyToken, requireRole } = require('../../utils/auth.util');
const { v4: uuidv4 } = require('uuid');

// Create product (seller only)
router.post('/', verifyToken, requireRole('seller'), (req, res) => {
  const { name, price } = req.body;
  const product = { id: uuidv4(), sellerId: req.user.id, name, price, approved: false };
  store.products.push(product);
  res.json(product);
});

// Get all approved products
router.get('/', (req, res) => {
  const products = store.products.filter(p => p.approved);
  res.json(products);
});

// Edit product (seller)
router.put('/:id', verifyToken, requireRole('seller'), (req, res) => {
  const product = store.products.find(p => p.id === req.params.id && p.sellerId === req.user.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  Object.assign(product, req.body);
  res.json(product);
});

// Delete product (seller)
router.delete('/:id', verifyToken, requireRole('seller'), (req, res) => {
  const index = store.products.findIndex(p => p.id === req.params.id && p.sellerId === req.user.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  store.products.splice(index, 1);
  res.json({ message: 'Deleted' });
});

// Admin approve product
router.patch('/:id/approve', verifyToken, requireRole('admin'), (req, res) => {
  const product = store.products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  product.approved = true;
  res.json(product);
});

module.exports = router;
