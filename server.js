require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middlewares
app.use(cors({
   origin: process.env.CLIENT_URL || '*',
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.get('/', (req, res) => {
   res.send("WELCOME TO THE RESUME BUILDER SERVER...")
})
app.use('/api/auth', authRouter);

// Server the upload folder
app.use(
   '/uploads',
   express.static(path.join(__dirname, 'uploads'), {
      setHeaders: (res, path) => {
         res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
      }
   })
)


// Start server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`)
})
