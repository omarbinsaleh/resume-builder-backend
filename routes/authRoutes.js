const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const authRouter = express.Router();

// Auth related routes
authRouter.post('/register', registerUser);   // Register User
authRouter.post('login', loginUser);          // Login user
authRouter.get('profile', protect, getUserProfile);    // Get User Profile

module.exports = authRouter;