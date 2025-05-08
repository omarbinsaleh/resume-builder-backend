const jwt = require('jsonwebtoken');
const User = require("../models/User");

// Middleware for protected route
const protect = async (req, res, next) => {
   try {
      const tokenStr = req.headers.authorization;
      if (tokenStr && tokenStr.startsWith('Bearer')) {
         const token = tokenStr.split(' ')[1]; // here the token was originally generated to store the User Id only.
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = await User.findById(decoded.id).select("-password");
         next();
      } else {
         res.status(401).json({ success: false, message: 'Not Authorized, no token found' });
      }
   } catch (error) {
      res.status(401).json({ success: false, message: "Failed to parse the token", error });
   }
}

module.exports = { protect };