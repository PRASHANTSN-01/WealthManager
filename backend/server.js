const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import portfolio data
const portfolioData = require('./data/sampleData');

// API Routes
app.get('/api/portfolio/holdings', (req, res) => {
  try {
    res.json(portfolioData.holdings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
});

app.get('/api/portfolio/allocation', (req, res) => {
  try {
    res.json(portfolioData.allocation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch allocation data' });
  }
});

app.get('/api/portfolio/performance', (req, res) => {
  try {
    res.json(portfolioData.performance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch performance data' });
  }
});

app.get('/api/portfolio/summary', (req, res) => {
  try {
    res.json(portfolioData.summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary data' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const path = require('path');

// Serve static files from client/build
app.use(express.static(path.join(__dirname, '../client/build')));

// Handle frontend routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at: http://localhost:${PORT}/api/portfolio/*`);
});
