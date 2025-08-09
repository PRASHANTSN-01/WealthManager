// API Configuration - Updated to use Render URL
const API_BASE_URL = 'https://wealthmanager-d6ve.onrender.com/api/portfolio';

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
            return null;
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
        document.getElementById('holdingsCount').textContent = document.querySelectorAll('#holdingsTableBody tr').length;
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

    static showError(message) {
        let errorDiv = document.getElementById('errorDiv');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'errorDiv';
            errorDiv.style.color = 'red';
            errorDiv.style.fontWeight = 'bold';
            errorDiv.style.margin = '10px';
            document.body.insertBefore(errorDiv, document.body.firstChild);
        }
        errorDiv.textContent = message;
    }

    static async loadAllData() {
        console.log('Loading portfolio data from backend...');
        
        // Show loading state
        document.getElementById('loading').style.display = 'block';
        
        try {
            // Fetch all data from backend
            const [holdings, allocation, performance, summary] = await Promise.all([
                PortfolioService.getHoldings(),
                PortfolioService.getAllocation(),
                PortfolioService.getPerformance(),
                PortfolioService.getSummary()
            ]);

            if (!holdings || !allocation || !performance || !summary) {
                throw new Error('Failed to fetch some data');
            }

            // Store data globally
            window.portfolioData = { holdings, allocation, performance, summary };
            
            // Update UI
            UIController.updateOverviewCards(summary);
            UIController.renderHoldingsTable(holdings);
            UIController.renderTopPerformers(summary);

            // Create charts
            ChartController.createSectorChart(allocation);
            ChartController.createMarketCapChart(allocation);
            ChartController.createPerformanceChart(performance);

            // Hide loading state
            document.getElementById('loading').style.display = 'none';
            
            console.log('All data loaded successfully from backend');
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load portfolio data. Please check your connection.');
            document.getElementById('loading').style.display = 'none';
        }
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
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
