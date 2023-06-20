const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const { createOrder, getUserOrders, getAllOrders } = orderController;

router.post('/order', createOrder);
router.get('/orders', getAllOrders);
router.get('/my-orders', getUserOrders);

module.exports = router