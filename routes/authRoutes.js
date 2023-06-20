const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { registerController } = authController;

router.post('/register', registerController);

module.exports = router