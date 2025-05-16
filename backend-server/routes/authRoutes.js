// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../auth/authController');
const authMiddleware = require('../auth/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

module.exports = router;
