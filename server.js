const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating authentication tokens
const { connectDB } = require('./db.js');
const cors = require('cors');
const userRoutes = require('./routes/userroutes'); // Import user routes

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'HTML', 'mainPage.html'));
});

// Use user routes
app.use('/api/users', userRoutes);

// Logging incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
