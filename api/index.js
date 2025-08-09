const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const portfolioRoutes = require('../routes/portfolio');

// Routes
app.use('/api/portfolio', portfolioRoutes);

// Export for Vercel
module.exports = app;
