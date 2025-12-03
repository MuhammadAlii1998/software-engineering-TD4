const express = require('express');
const app = express();

app.use(express.json());

// Marketplace routes
app.use('/api/auth', require('./routes/marketplace/auth.route'));
app.use('/api/products', require('./routes/marketplace/product.route'));
app.use('/api/payments', require('./routes/marketplace/payment.route'));
app.use('/api/chat', require('./routes/marketplace/chat.route'));
app.use('/api/notifications', require('./routes/marketplace/notification.route'));
app.use('/api/admin', require('./routes/marketplace/admin.route'));

module.exports = app;
