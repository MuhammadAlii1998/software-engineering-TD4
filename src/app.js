import express from 'express';
import { errorHandler } from './utils/errorHandler.js';
import authRoute from './routes/marketplace/auth.route.js';
import productRoute from './routes/marketplace/product.route.js';
import paymentRoute from './routes/marketplace/payment.route.js';
import chatRoute from './routes/marketplace/chat.route.js';
import notificationRoute from './routes/marketplace/notification.route.js';
import adminRoute from './routes/marketplace/admin.route.js';
import boomRoute from './routes/auto/boom.route.js';
import infoRoute from './routes/auto/info.route.js';
import versionRoute from './routes/auto/version.route.js';

const app = express();

app.use(express.json());

// Root route
app.get('/', (_req, res) => {
  res.json({ message: 'Welcome to DevOps Lab API' });
});

// Health check route
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Auto routes
app.use(boomRoute);
app.use(infoRoute);
app.use(versionRoute);

// Marketplace routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/chat', chatRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/admin', adminRoute);

// Error handler (must be last)
app.use(errorHandler);

export default app;
