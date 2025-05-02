const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @description: Generate JWT Token
const generateToken = (userId) => {
   return jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// @description: Register a new user
// @route:       POST /api/auth/register
// @access:      Public
const registerUser = async (req, res) => {
   try {
      const { name, email, password, profileImageUrl } = req.body;

      // check if user already exists
      const userExists = User.findOne({ email });
      if (userExists) {
         return res.status(400).json({ success: false, message: 'User already exists with this email' });
      };

      // has password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create a new user
      const user = await User.create({
         name,
         email,
         password: hashedPassword,
         profileImageUrl
      });

      // return the User data with JWT token and success message
      res.status(200).json({
         success: true,
         message: 'User is registered successfully',
         data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
         }
      });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Something went wrong and Failed to register user', error })
   };
};

// @description: Login an existing user
// @route:       POST /api/auth/login
// @access:      Public
const loginUser = async (req, res) => {
   try {
      // send success message
      res.status(200).json({ success: true, message: 'User logged in successfully' })
   } catch (error) {
      res.status(500).json({ success: false, message: 'Somthing went wrong and Failed to login' })
   }
};

// @description: Get a user profile
// @route:       POST /api/auth/profile
// @access:      Private ( Requier JWT )
const getUserProfile = async (req, res) => {
   try {
      // send success message
      res.status(200).json({ success: true, message: 'User profile is retured successfully' });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Something went wrong and failed to retur user profile', error });
   }
}

module.exports = { registerUser, loginUser, getUserProfile };