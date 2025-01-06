// Expense tracking functionality

// Sample data
const sampleExpenses = [
    {
        id: 1,
        date: '2025-01-15',
        category: 'Office Supplies',
        description: 'Printer paper and ink cartridges',
        amount: 234.56,
        status: 'approved'
    },
    {
        id: 2,
        date: '2025-01-16',
        category: 'Travel',
        description: 'Client meeting - flight tickets',
        amount: 543.21,
        status: 'pending'
    },
    {
        id: 3,
        date: '2025-01-17',
        category: 'Marketing',
        description: 'Social media campaign',
        amount: 1200.00,
        status: 'approved'
    }
];

// Chart configurations
let categoryChart;
let trendChart;

// Initialize charts
function initializeCharts() {
    // Category distribution chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    categoryChart = new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Office Supplies', 'Travel', 'Marketing', 'Utilities'],
            datasets: [{
                data: [30, 25, 25, 20],
                backgroundColor: [
                    '#2563eb',
                    '#3b82f6',
                    '#60a5fa',
                    '#93c5fd'
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

    // Monthly trend chart
    const trendCtx = document.getElementById('trendChart').getContext('2d');
    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Expenses',
                data: [12000, 11000, 13000, 12500, 11500, 12463],
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
}

// Initialize expense list
function initializeExpenses() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';
    
    sampleExpenses.forEach(expense => {
        const row = createExpenseRow(expense);
        expensesList.appendChild(row);
    });
}

// Create expense row
function createExpenseRow(expense) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${formatDate(expense.date)}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${expense.category}</div>
        </td>
        <td class="px-6 py-4">
            <div class="text-sm text-gray-900">${expense.description}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">$${expense.amount.toFixed(2)}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            ${getStatusBadge(expense.status)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button onclick="editExpense(${expense.id})" class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
            <button onclick="deleteExpense(${expense.id})" class="text-red-600 hover:text-red-900">Delete</button>
        </td>
    `;
    return tr;
}

// Continuing from previous JavaScript...

// Get status badge HTML
function getStatusBadge(status) {
    const colors = {
        approved: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        rejected: 'bg-red-100 text-red-800'
    };
    return `
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}">
            ${status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    `;
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Modal handling
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseModal = document.getElementById('expenseModal');
const closeExpenseModal = document.getElementById('closeExpenseModal');
const expenseForm = document.getElementById('expenseForm');

addExpenseBtn.addEventListener('click', () => {
    expenseModal.classList.remove('hidden');
});

closeExpenseModal.addEventListener('click', () => {
    expenseModal.classList.add('hidden');
});

// Form submission
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(expenseForm);
    const expenseData = {
        category: formData.get('category'),
        amount: parseFloat(formData.get('amount')),
        date: formData.get('date'),
        description: formData.get('description'),
        status: 'pending'
    };
    
    // Add to expenses list (in real app, this would be an API call)
    sampleExpenses.push({
        id: sampleExpenses.length + 1,
        ...expenseData
    });
    
    // Update UI
    initializeExpenses();
    updateCharts();
    expenseModal.classList.add('hidden');
    expenseForm.reset();
});

// Filter expenses
function filterExpenses(filters) {
    let filteredExpenses = [...sampleExpenses];
    
    if (filters.category) {
        filteredExpenses = filteredExpenses.filter(exp => exp.category === filters.category);
    }
    
    if (filters.status) {
        filteredExpenses = filteredExpenses.filter(exp => exp.status === filters.status);
    }
    
    if (filters.dateRange) {
        filteredExpenses = filteredExpenses.filter(exp => {
            const expDate = new Date(exp.date);
            return expDate >= filters.dateRange.start && expDate <= filters.dateRange.end;
        });
    }
    
    return filteredExpenses;
}

// Update charts with new data
function updateCharts() {
    // Update category distribution
    const categoryData = calculateCategoryDistribution();
    categoryChart.data.datasets[0].data = Object.values(categoryData);
    categoryChart.update();
    
    // Update trend chart
    const trendData = calculateMonthlyTrend();
    trendChart.data.datasets[0].data = trendData;
    trendChart.update();
}

// Calculate category distribution
function calculateCategoryDistribution() {
    const distribution = {};
    sampleExpenses.forEach(expense => {
        if (!distribution[expense.category]) {
            distribution[expense.category] = 0;
        }
        distribution[expense.category] += expense.amount;
    });
    return distribution;
}

// Calculate monthly trend
function calculateMonthlyTrend() {
    const monthlyTotals = Array(6).fill(0); // Last 6 months
    sampleExpenses.forEach(expense => {
        const expDate = new Date(expense.date);
        const monthIndex = expDate.getMonth();
        monthlyTotals[monthIndex] += expense.amount;
    });
    return monthlyTotals;
}

// Export expenses
function exportExpenses(format = 'csv') {
    const data = sampleExpenses.map(exp => ({
        Date: formatDate(exp.date),
        Category: exp.category,
        Description: exp.description,
        Amount: `$${exp.amount.toFixed(2)}`,
        Status: exp.status
    }));
    
    if (format === 'csv') {
        const csvContent = convertToCSV(data);
        downloadFile(csvContent, 'expenses.csv', 'text/csv');
    }
}

// Convert data to CSV
function convertToCSV(data) {
    const headers = Object.keys(data[0]);
    const rows = data.map(row => headers.map(header => row[header]));
    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

// Download file
function downloadFile(content, fileName, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    initializeExpenses();
});