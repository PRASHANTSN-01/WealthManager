const portfolioData = {
  holdings: [
    {
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      quantity: 50,
      avgPrice: 2450.00,
      currentPrice: 2680.50,
      sector: "Energy",
      marketCap: "Large",
      value: 134025.00,
      gainLoss: 11525.00,
      gainLossPercent: 9.4
    },
    {
      symbol: "INFY",
      name: "Infosys Limited",
      quantity: 100,
      avgPrice: 1800.00,
      currentPrice: 2010.75,
      sector: "Technology",
      marketCap: "Large",
      value: 201075.00,
      gainLoss: 21075.00,
      gainLossPercent: 11.7
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy Services",
      quantity: 75,
      avgPrice: 3200.00,
      currentPrice: 3450.00,
      sector: "Technology",
      marketCap: "Large",
      value: 258750.00,
      gainLoss: 18750.00,
      gainLossPercent: 7.8
    },
    {
      symbol: "HDFC",
      name: "HDFC Bank Ltd",
      quantity: 80,
      avgPrice: 1650.00,
      currentPrice: 1615.00,
      sector: "Banking",
      marketCap: "Large",
      value: 129200.00,
      gainLoss: -2800.00,
      gainLossPercent: -2.1
    },
    {
      symbol: "ICICI",
      name: "ICICI Bank Ltd",
      quantity: 120,
      avgPrice: 950.00,
      currentPrice: 1050.00,
      sector: "Banking",
      marketCap: "Large",
      value: 126000.00,
      gainLoss: 12000.00,
      gainLossPercent: 10.5
    },
    {
      symbol: "SUNPHARMA",
      name: "Sun Pharmaceutical Industries",
      quantity: 200,
      avgPrice: 680.00,
      currentPrice: 720.00,
      sector: "Healthcare",
      marketCap: "Large",
      value: 144000.00,
      gainLoss: 8000.00,
      gainLossPercent: 5.9
    },
    {
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Ltd",
      quantity: 150,
      avgPrice: 850.00,
      currentPrice: 920.00,
      sector: "Telecom",
      marketCap: "Large",
      value: 138000.00,
      gainLoss: 10500.00,
      gainLossPercent: 8.2
    },
    {
      symbol: "ITC",
      name: "ITC Ltd",
      quantity: 300,
      avgPrice: 420.00,
      currentPrice: 445.00,
      sector: "FMCG",
      marketCap: "Large",
      value: 133500.00,
      gainLoss: 7500.00,
      gainLossPercent: 6.0
    },
    {
      symbol: "LT",
      name: "Larsen & Toubro Ltd",
      quantity: 50,
      avgPrice: 2800.00,
      currentPrice: 3100.00,
      sector: "Infrastructure",
      marketCap: "Large",
      value: 155000.00,
      gainLoss: 15000.00,
      gainLossPercent: 10.7
    },
    {
      symbol: "MARUTI",
      name: "Maruti Suzuki India Ltd",
      quantity: 25,
      avgPrice: 8500.00,
      currentPrice: 9200.00,
      sector: "Automobile",
      marketCap: "Large",
      value: 230000.00,
      gainLoss: 17500.00,
      gainLossPercent: 8.2
    },
    {
      symbol: "ASIANPAINT",
      name: "Asian Paints Ltd",
      quantity: 100,
      avgPrice: 2800.00,
      currentPrice: 2950.00,
      sector: "FMCG",
      marketCap: "Large",
      value: 295000.00,
      gainLoss: 15000.00,
      gainLossPercent: 5.4
    },
    {
      symbol: "HINDUNILVR",
      name: "Hindustan Unilever Ltd",
      quantity: 80,
      avgPrice: 2400.00,
      currentPrice: 2600.00,
      sector: "FMCG",
      marketCap: "Large",
      value: 208000.00,
      gainLoss: 16000.00,
      gainLossPercent: 8.3
    }
  ],
  
  allocation: {
    bySector: {
      "Technology": { value: 459825, percentage: 32.8 },
      "Banking": { value: 255200, percentage: 18.2 },
      "Energy": { value: 134025, percentage: 9.6 },
      "Healthcare": { value: 144000, percentage: 10.3 },
      "Telecom": { value: 138000, percentage: 9.9 },
      "FMCG": { value: 636500, percentage: 45.5 },
      "Infrastructure": { value: 155000, percentage: 11.1 },
      "Automobile": { value: 230000, percentage: 16.4 }
    },
    byMarketCap: {
      "Large": { value: 1400000, percentage: 100.0 }
    }
  },

  performance: {
    timeline: [
      { date: "2024-01-01", portfolio: 1200000, nifty50: 21000, gold: 62000 },
      { date: "2024-02-01", portfolio: 1250000, nifty50: 21500, gold: 63000 },
      { date: "2024-03-01", portfolio: 1280000, nifty50: 22100, gold: 64500 },
      { date: "2024-04-01", portfolio: 1320000, nifty50: 22800, gold: 66000 },
      { date: "2024-05-01", portfolio: 1360000, nifty50: 23200, gold: 67000 },
      { date: "2024-06-01", portfolio: 1400000, nifty50: 23500, gold: 68000 }
    ],
    returns: {
      portfolio: { "1month": 2.9, "3months": 8.3, "1year": 16.7 },
      nifty50: { "1month": 1.8, "3months": 6.2, "1year": 12.4 },
      gold: { "1month": 1.5, "3months": 4.1, "1year": 8.9 }
    }
  },

  summary: {
    totalValue: 1400000,
    totalInvested: 1200000,
    totalGainLoss: 200000,
    totalGainLossPercent: 16.67,
    topPerformer: {
      symbol: "INFY",
      name: "Infosys Limited",
      gainPercent: 28.5
    },
    worstPerformer: {
      symbol: "HDFC",
      name: "HDFC Bank Ltd",
      gainPercent: -2.1
    },
    diversificationScore: 8.2,
    riskLevel: "Moderate"
  }
};

module.exports = portfolioData;
