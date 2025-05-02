require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

// Middlewares
app.use(cors({
   origin: process.env.CLIENT_URL || '*',
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
   res.send("WELCOME TO THE RESUME BUILDER SERVER...")
})


// Start server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`)
})
