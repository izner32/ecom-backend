const express = require('express');
const router = express.Router();

const authController = require('./controllers/authController');
const orderController = require('./controllers/orderController');
const productController = require('./controllers/productController');

const { register, login } = authController;
const { createOrder, getAllOrders, getUserOrders } = orderController;
const { createProduct, getAllProducts, getAllActiveProducts, getSingleProduct, updateProduct, archiveProduct } = productController;
const { authenticate } = require('./middleware/authenticate');

// Auth
router.post('/register', register);
router.post('/login', login);

// Orders
router.post('/order', authenticate, createOrder);
router.get('/orders', authenticate,  getAllOrders);
router.get('/my-orders', authenticate, getUserOrders);

// Products
router.post('/product', authenticate, createProduct);
router.get('/products', getAllProducts);
router.get('/products/active', getAllActiveProducts);
router.get('/products/:productId', getSingleProduct);
router.put('/products/:productId', authenticate, updateProduct);
router.patch('/products/:productId', authenticate, archiveProduct);

module.exports = router;