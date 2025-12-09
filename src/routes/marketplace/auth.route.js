import { Router } from 'express';
import store from '../../data/store.js';
import { hashPassword, comparePassword, generateToken } from '../../utils/auth.util.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Register
router.post('/register', (req, res) => {
  const { name, email, password, role = 'buyer' } = req.body;
  const existingUser = store.users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
  const user = { id: uuidv4(), name, email, passwordHash: hashPassword(password), role };
  store.users.push(user);
  const token = generateToken(user);
  res.json({ token, user: { id: user.id, name, email, role } });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = store.users.find(u => u.email === email);
  if (!user || !comparePassword(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = generateToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email, role: user.role } });
});

export default router;
