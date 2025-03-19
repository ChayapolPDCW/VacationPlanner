const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

// Register route
router.post('/register', register);

export default router;
