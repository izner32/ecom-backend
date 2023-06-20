const express = require('express');
const router = express.Router();

const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');

const { register, login } = authController;
const { createOrder, getAllOrders, getUserOrders } = orderController;
const { authenticate } = require('./middleware/authenticate');

// Auth
router.post('/register', register);
router.post('/login', login);

// Orders
router.post('/order', authenticate, createOrder);
router.get('/orders', authenticate,  getAllOrders);
router.get('/my-orders', authenticate, getUserOrders);

// Products

module.exports = router;