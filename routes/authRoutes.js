const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { register, login, loginValidation } = authController;

router.post('/register', register);

module.exports = router