// Invoice management functionality

// Sample data - In a real application, this would come from a backend
const sampleInvoices = [
    {
        id: 'INV-2025-001',
        customer: 'Tech Solutions Inc.',
        amount: 1500.00,
        date: '2025-01-15',
        status: 'paid'
    },
    {
        id: 'INV-2025-002',
        customer: 'Design Studios Co.',
        amount: 2750.00,
        date: '2025-01-20',
        status: 'pending'
    },
    {
        id: 'INV-2025-003',
        customer: 'Marketing Experts LLC',
        amount: 3200.00,
        date: '2025-01-25',
        status: 'overdue'
    }
];

// DOM Elements
const invoicesList = document.getElementById('invoicesList');
const createInvoiceBtn = document.getElementById('createInvoiceBtn');
const invoiceModal = document.getElementById('invoiceModal');
const closeModal = document.getElementById('closeModal');
const invoiceForm = document.getElementById('invoiceForm');
const addItemBtn = document.getElementById('addItemBtn');

// Initialize invoice list
function initializeInvoices() {
    invoicesList.innerHTML = '';
    sampleInvoices.forEach(invoice => {
        const row = createInvoiceRow(invoice);
        invoicesList.appendChild(row);
    });
}

// Create invoice row
function createInvoiceRow(invoice) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">${invoice.id}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${invoice.customer}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">$${invoice.amount.toFixed(2)}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">${formatDate(invoice.date)}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            ${getStatusBadge(invoice.status)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button class="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
            <button class="text-red-600 hover:text-red-900">Delete</button>
        </td>
    `;
    return tr;
}

// Get status badge HTML
function getStatusBadge(status) {
    const colors = {
        paid: 'bg-green-100 text-green-800',
        pending: 'bg-yellow-100 text-yellow-800',
        overdue: 'bg-red-100 text-red-800'
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

// Add invoice item row
function addInvoiceItem() {
    const itemsContainer = document.getElementById('invoiceItems');
    const itemDiv = document.createElement('div');
    itemDiv.className = 'grid grid-cols-1 md:grid-cols-4 gap-4';
    itemDiv.innerHTML = `
        <div>
            <input type="text" placeholder="Item description" 
                   class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        </div>
        <div>
            <input type="number" placeholder="Quantity" 
                   class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        </div>
        <div>
            <input type="number" placeholder="Price" 
                   class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
        </div>
        <div class="flex items-center">
            <button type="button" class="text-red-600 hover:text-red-700" onclick="removeInvoiceItem(this)">
                Remove
            </button>
        </div>
    `;
    itemsContainer.appendChild(itemDiv);
}

// Remove invoice item
function removeInvoiceItem(button) {
    button.closest('div.grid').remove();
}

// Event Listeners
createInvoiceBtn.addEventListener('click', () => {
    invoiceModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    invoiceModal.classList.add('hidden');
});

addItemBtn.addEventListener('click', addInvoiceItem);

invoiceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle form submission
    // This would typically send data to a backend
    invoiceModal.classList.add('hidden');
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeInvoices();
    // Add initial invoice item row
    addInvoiceItem();
});

// Handle invoice filtering
function filterInvoices(filters) {
    // Implementation for filtering invoices
    // This would typically filter the displayed invoices based on the selected criteria
}

// Handle invoice export
function exportInvoices(format) {
    // Implementation for exporting invoices
    // This would typically generate PDF or CSV exports
}

// Handle invoice deletion
function deleteInvoice(invoiceId) {
    // Implementation for deleting invoices
    // This would typically send a delete request to the backend
}

// Handle invoice editing
function editInvoice(invoiceId) {
    // Implementation for editing invoices
    // This would typically populate the form with existing invoice data
}

