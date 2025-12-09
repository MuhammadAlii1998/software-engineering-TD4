// src/data/store.js
export default {
  users: [],          // {id, name, email, role, passwordHash}
  products: [],       // {id, sellerId, name, price, approved}
  orders: [],         // {id, buyerId, productId, status}
  messages: [],       // {id, senderId, receiverId, text, timestamp}
  notifications: []   // {id, userId, text, read}
};
