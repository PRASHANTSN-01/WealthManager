// API Configuration
const API_BASE_URL = 'http://localhost:5000/api/portfolio';

// Chart instances
let sectorChart, marketCapChart, performanceChart;

// Utility functions
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};

// API Service
class PortfolioService {
    static async fetchData(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}/${endpoint}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            throw error;
        }
    }

    static async getHoldings() {
        return this.fetchData('holdings');
    }

    static async getAllocation() {
        return this.fetchData('allocation');
    }

    static async getPerformance() {
        return this.fetchData('performance');
    }

    static async getSummary() {
        return this.fetchData('summary');
    }
}

// UI Controller
class UIController {
    static updateOverviewCards(summary) {
        document.getElementById('totalValue').textContent = formatCurrency(summary.totalValue);
        document.getElementById('totalGainLoss').textContent = formatCurrency(summary.totalGainLoss);
        document.getElementById('totalGainLossPercent').textContent = formatPercentage(summary.totalGainLossPercent);
        document.getElementById('performance').textContent = formatPercentage(summary.totalGainLossPercent);
        document.getElementById('holdingsCount').textContent = portfolioData.holdings.length;
    }

    static renderHoldingsTable(holdings) {
        const tbody = document.getElementById('holdingsTableBody');
        tbody.innerHTML = '';

        holdings.forEach(holding => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${holding.symbol}</strong></td>
                <td>${holding.name}</td>
                <td>${holding.quantity}</td>
                <td>${formatCurrency(holding.avgPrice)}</td>
                <td>${formatCurrency(holding.currentPrice)}</td>
                <td>${formatCurrency(holding.value)}</td>
                <td class="${holding.gainLoss >= 0 ? 'positive' : 'negative'}">
                    ${formatCurrency(holding.gainLoss)}
                </td>
                <td class="${holding.gainLossPercent >= 0 ? 'positive' : 'negative'}">
                    ${formatPercentage(holding.gainLossPercent)}
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    static renderTopPerformers(summary) {
        document.getElementById('bestPerformer').innerHTML = `
            <strong>${summary.topPerformer.symbol}</strong><br>
            ${summary.topPerformer.name}<br>
            <span class="positive">${formatPercentage(summary.topPerformer.gainPercent)}</span>
        `;
        
        document.getElementById('worstPerformer').innerHTML = `
            <strong>${summary.worstPerformer.symbol}</strong><br>
            ${summary.worstPerformer.name}<br>
            <span class="negative">${formatPercentage(summary.worstPerformer.gainPercent)}</span>
        `;
    }
}

// Chart Controller
class ChartController {
    static createSectorChart(allocation) {
        const ctx = document.getElementById('sectorChart').getContext('2d');
        const sectors = Object.keys(allocation.bySector);
        const values = sectors.map(sector => allocation.bySector[sector].value);
        
        sectorChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: sectors,
                datasets: [{
                    data: values,
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#f5576c',
                        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    static createMarketCapChart(allocation) {
        const ctx = document.getElementById('marketCapChart').getContext('2d');
        const marketCaps = Object.keys(allocation.byMarketCap);
        const values = marketCaps.map(cap => allocation.byMarketCap[cap].value);
        
        marketCapChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: marketCaps,
                datasets: [{
                    data: values,
                    backgroundColor: ['#667eea', '#764ba2', '#f093fb'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    static createPerformanceChart(performance) {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        const timeline = performance.timeline;
        const labels = timeline.map(item => new Date(item.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }));
        
        performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Portfolio',
                        data: timeline.map(item => item.portfolio),
                        borderColor: '#667eea',
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Nifty 50',
                        data: timeline.map(item => item.nifty50),
                        borderColor: '#764ba2',
                        backgroundColor: 'rgba(118, 75, 162, 0.1)',
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Gold',
                        data: timeline.map(item => item.gold),
                        borderColor: '#f093fb',
                        backgroundColor: 'rgba(240, 147, 251, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return '₹' + (value / 1000) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Main Application Controller
class App {
    static async init() {
        try {
            await this.loadAllData();
            this.setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            this.showError('Failed to load portfolio data. Please refresh the page.');
        }
    }

    static async loadAllData() {
        const [holdings, allocation, performance, summary] = await Promise.all([
            PortfolioService.getHoldings(),
            PortfolioService.getAllocation(),
            PortfolioService.getPerformance(),
            PortfolioService.getSummary()
        ]);

        // Store data globally for access
        window.portfolioData = { holdings, allocation, performance, summary };
        
        // Use sample data if API fails
        if (!holdings || holdings.length === 0) {
            console.warn('Using sample data due to API failure');
            window.portfolioData = portfolioData;
            holdings = portfolioData.holdings;
            allocation = portfolioData.allocation;
            performance = portfolioData.performance;
            summary = portfolioData.summary;
        }

        // Update UI
        UIController.updateOverviewCards(summary);
        UIController.renderHoldingsTable(holdings);
        UIController.renderTopPerformers(summary);

        // Create charts
        ChartController.createSectorChart(allocation);
        ChartController.createMarketCapChart(allocation);
        ChartController.createPerformanceChart(performance);
    }

    static setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const clearSearchBtn = document.getElementById('clearSearch');
        
        // Search functionality
        searchInput.addEventListener('input', (e) => {
            this.filterHoldings(e.target.value);
        });

        // Clear search
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            this.filterHoldings('');
            searchInput.focus();
        });

        console.log('Event listeners setup complete');
    }

    static filterHoldings(searchTerm) {
        const holdings = window.portfolioData?.holdings || [];
        const filteredHoldings = holdings.filter(holding => {
            const searchLower = searchTerm.toLowerCase();
            return (
                holding.symbol.toLowerCase().includes(searchLower) ||
                holding.name.toLowerCase().includes(searchLower) ||
                holding.sector.toLowerCase().includes(searchLower)
            );
        });

        UIController.renderHoldingsTable(filteredHoldings);
        
        // Show/hide no results message
        const noResultsDiv = document.getElementById('noResults');
        const tableContainer = document.querySelector('.table-container');
        
        if (filteredHoldings.length === 0 && searchTerm.trim() !== '') {
            noResultsDiv.style.display = 'block';
            tableContainer.style.display = 'none';
        } else {
            noResultsDiv.style.display = 'none';
            tableContainer.style.display = 'block';
        }

        // Update holdings count
        document.getElementById('holdingsCount').textContent = filteredHoldings.length;
    }

    static showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Sample data for development (fallback if API fails)
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
        }
    ],
    allocation: {
        bySector: {
            "Technology": { value: 201075, percentage: 60 },
            "Energy": { value: 134025, percentage: 40 }
        },
        byMarketCap: {
            "Large": { value: 335100, percentage: 100 }
        }
    },
    performance: {
        timeline: [
            { date: "2024-01-01", portfolio: 300000, nifty50: 21000, gold: 62000 },
            { date: "2024-03-01", portfolio: 320000, nifty50: 22100, gold: 64500 },
            { date: "2024-06-01", portfolio: 335100, nifty50: 23500, gold: 68000 }
    ],
    returns: {
        portfolio: { "1month": 2.9, "3months": 8.3, "1year": 16.7 }
    }
    },
    summary: {
        totalValue: 335100,
        totalInvested: 300000,
        totalGainLoss: 35100,
        totalGainLossPercent: 11.7,
        topPerformer: {
            symbol: "INFY",
            name: "Infosys Limited",
            gainPercent: 11.7
        },
        worstPerformer: {
            symbol: "RELIANCE",
            name: "Reliance Industries Ltd",
            gainPercent: 9.4
        },
        diversificationScore: 7.5,
        riskLevel: "Moderate"
    }
};
