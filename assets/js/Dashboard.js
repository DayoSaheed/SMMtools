// Dashboard.js

// Chart configurations
document.addEventListener('DOMContentLoaded', function() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [15000, 18000, 16000, 19000, 24000, 24563],
                borderColor: '#2563eb',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Expense Chart
    const expenseCtx = document.getElementById('expenseChart').getContext('2d');
    new Chart(expenseCtx, {
        type: 'doughnut',
        data: {
            labels: ['Office', 'Marketing', 'Utilities', 'Travel', 'Other'],
            datasets: [{
                data: [4000, 3000, 2000, 1500, 1963],
                backgroundColor: [
                    '#2563eb',
                    '#3b82f6',
                    '#60a5fa',
                    '#93c5fd',
                    '#bfdbfe'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
});

// Handle sidebar toggle for mobile
const toggleSidebar = () => {
    const sidebar = document.querySelector('aside');
    sidebar.classList.toggle('hidden');
};

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Handle notification updates
const updateNotifications = () => {
    // Fetch and update notifications
    // This would typically connect to a backend API
};

// Update dashboard stats
const updateStats = () => {
    // Fetch and update dashboard statistics
    // This would typically connect to a backend API
};

// Initialize dashboard
const initDashboard = () => {
    updateStats();
    updateNotifications();
    
    // Set up refresh interval
    setInterval(updateStats, 300000); // Update every 5 minutes
    setInterval(updateNotifications, 60000); // Update every minute
};

// Run initialization
initDashboard();