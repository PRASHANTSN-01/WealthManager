const express = require('express');
const router = express.Router();
const portfolioData = require('../data/sampleData');

// GET /api/portfolio/holdings
router.get('/holdings', (req, res) => {
  try {
    res.json(portfolioData.holdings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch holdings' });
  }
});

// GET /api/portfolio/allocation
router.get('/allocation', (req, res) => {
  try {
    res.json(portfolioData.allocation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch allocation data' });
  }
});

// GET /api/portfolio/performance
router.get('/performance', (req, res) => {
  try {
    res.json(portfolioData.performance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch performance data' });
  }
});

// GET /api/portfolio/summary
router.get('/summary', (req, res) => {
  try {
    res.json(portfolioData.summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary data' });
  }
});

module.exports = router;
