const express = require('express');
const { registerUser, loginUser, getUserProfile, deleteUserByEmail } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { uploadImage } = require('../controllers/uploadImages');

const authRouter = express.Router();

// Auth related routes
authRouter.post('/register', registerUser);   // Register User
authRouter.post('/login', loginUser);          // Login user
authRouter.get('/profile', protect, getUserProfile);    // Get User Profile
authRouter.delete('/user', deleteUserByEmail); // Delete an existing User
authRouter.post('/image-upload', upload.single('image'), uploadImage); // Upload image

module.exports = authRouter;