const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @description: Generate JWT Token
// @payload: User Id
const generateToken = (userId) => {
   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @description: Register a new user
// @route:       POST /api/auth/register
// @access:      Public
const registerUser = async (req, res) => {
   try {
      const { name, email, password, profileImageUrl } = req.body;

      // check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(400).json({ success: false, message: 'User already exists with this email' });
      };

      // hash password
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
         user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
         }
      });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Something went wrong and Failed to register user', error });
   };
};

// @description: Login an existing user
// @route:       POST /api/auth/login
// @access:      Public
const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;

      // check if user exists with this email
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(500).json({ success: false, message: 'Invalid email or password' });
      };

      // check if the password is currect
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
         return res.status(500).json({ success: false, message: 'Invalid email or password' });
      };

      // send success message with user data
      res.status(200).json({
         success: true,
         message: 'User logged in successfully',
         user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
         }
      });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Somthing went wrong and Failed to login' });
   };
};

// @description: Get a user profile
// @route:       POST /api/auth/profile
// @access:      Private ( Requier JWT )
const getUserProfile = async (req, res) => {
   try {
      const user = await User.findById(req.user.id).select('-password');

      if (!user) {
         return res.status(404).json({success: false, message: 'User not found!'});
      };

      // send success message
      res.status(200).json({ success: true, message: 'User profile is retured successfully', user });
   } catch (error) {
      res.status(500).json({ success: false, message: 'Something went wrong and failed to retur user profile', error });
   };
};

// @description:  Delete an existing User
// @route:        DELETE /api/auth/user
// access:        Public
const deleteUserByEmail = async (req, res) => {
   try {
      const { email } = req.body;

      if (!email) {
         return res.status(400).json({ success: false, message: 'Please provide valid user email' });
      };

      const existingUser = await User.findOne({ email });
      if (!existingUser) {
         return res.status(400).json({ success: false, message: 'Sorry, User does not exist with this email' });
      };

      const deletedUser = await User.deleteOne({ email });
      res.status(200).json({ success: true, message: 'User has been deleted successfully', deletedUser });

   } catch (error) {
      res.status(500).json({ success: false, message: 'Something went wrong. Failed to delete user' });
   };
};

module.exports = { registerUser, loginUser, getUserProfile, deleteUserByEmail };