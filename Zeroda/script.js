// Sample data for demonstration
const stocks = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 2.3, changePercent: 0.94 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3234.50, change: -15.25, changePercent: -0.47 },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1543.20, change: 8.90, changePercent: 0.58 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.45, change: 12.75, changePercent: 0.77 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 987.30, change: -5.60, changePercent: -0.56 },
    { symbol: 'WIPRO', name: 'Wipro Limited', price: 432.85, change: 3.15, changePercent: 0.73 },
    { symbol: 'ADANIPORTS', name: 'Adani Ports', price: 876.20, change: -8.45, changePercent: -0.96 },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: 6543.30, change: 45.60, changePercent: 0.70 }
];

const portfolio = [
    { symbol: 'RELIANCE', qty: 10, avgPrice: 2400.00, ltp: 2456.75, pnl: 567.50 },
    { symbol: 'TCS', qty: 5, avgPrice: 3250.00, ltp: 3234.50, pnl: -77.50 },
    { symbol: 'INFY', qty: 15, avgPrice: 1520.00, ltp: 1543.20, pnl: 348.00 },
    { symbol: 'HDFCBANK', qty: 8, avgPrice: 1650.00, ltp: 1678.45, pnl: 227.60 }
];

const orders = [
    { symbol: 'HDFCBANK', type: 'BUY', qty: 5, price: 1678.45, status: 'EXECUTED', time: '10:30 AM' },
    { symbol: 'WIPRO', type: 'SELL', qty: 10, price: 432.85, status: 'PENDING', time: '11:15 AM' },
    { symbol: 'ICICIBANK', type: 'BUY', qty: 8, price: 987.30, status: 'EXECUTED', time: '09:45 AM' },
    { symbol: 'RELIANCE', type: 'SELL', qty: 5, price: 2456.75, status: 'PENDING', time: '12:00 PM' }
];

let currentOrderType = 'BUY';
let filteredStocks = stocks;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init();
});

// Main initialization function
function init() {
    renderWatchlist();
    renderPortfolio();
    renderOrders();
    updatePricesLive();
    
    // Set default order type styling
    setOrderType('BUY');
    
    console.log('Zerodha Trading Platform Initialized Successfully');
}

// Render watchlist with current stock data
function renderWatchlist() {
    const watchlist = document.getElementById('watchlist');
    
    if (!watchlist) return;
    
    watchlist.innerHTML = filteredStocks.map(stock => `
        <div class="stock-item" onclick="selectStock('${stock.symbol}')">
            <div class="stock-info">
                <h4>${stock.symbol}</h4>
                <p>${stock.name}</p>
            </div>
            <div class="stock-price">
                <div class="price">₹${stock.price.toFixed(2)}</div>
                <div class="change ${stock.change >= 0 ? 'positive' : 'negative'}">
                    ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)
                </div>
            </div>
        </div>
    `).join('');
}

// Render portfolio holdings
function renderPortfolio() {
    const portfolioList = document.getElementById('portfolio-list');
    
    if (!portfolioList) return;
    
    portfolioList.innerHTML = portfolio.map(item => {
        const currentValue = item.qty * item.ltp;
        const totalInvestment = item.qty * item.avgPrice;
        const pnl = currentValue - totalInvestment;
        const pnlPercent = ((pnl / totalInvestment) * 100).toFixed(2);
        
        return `
            <div class="portfolio-item">
                <div>
                    <strong>${item.symbol}</strong>
                    <div style="font-size: 12px; color: #666;">${item.qty} shares @ ₹${item.avgPrice.toFixed(2)}</div>
                    <div style="font-size: 11px; color: #999;">Investment: ₹${totalInvestment.toFixed(2)}</div>
                </div>
                <div style="text-align: right;">
                    <div>₹${item.ltp.toFixed(2)}</div>
                    <div class="${pnl >= 0 ? 'positive' : 'negative'}" style="font-size: 12px;">
                        ${pnl >= 0 ? '+' : ''}₹${pnl.toFixed(2)}
                    </div>
                    <div class="${pnl >= 0 ? 'positive' : 'negative'}" style="font-size: 10px;">
                        (${pnlPercent}%)
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Render recent orders
function renderOrders() {
    const ordersList = document.getElementById('orders-list');
    
    if (!ordersList) return;
    
    ordersList.innerHTML = orders.map(order => `
        <div class="order-item">
            <div>
                <strong>${order.symbol}</strong>
                <div style="font-size: 12px; color: #666;">
                    ${order.type} ${order.qty} @ ${typeof order.price === 'number' ? '₹' + order.price.toFixed(2) : order.price}
                </div>
                <div style="font-size: 11px; color: #999;">${order.time}</div>
            </div>
            <div style="text-align: right;">
                <div class="status ${order.status.toLowerCase()}">${order.status}</div>
            </div>
        </div>
    `).join('');
}

// Handle stock selection from watchlist
function selectStock(symbol) {
    const stockSearchInput = document.getElementById('stock-search');
    const priceInput = document.getElementById('price');
    
    if (stockSearchInput) {
        stockSearchInput.value = symbol;
    }
    
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock && priceInput) {
        priceInput.value = stock.price.toFixed(2);
    }
    
    console.log(`Selected stock: ${symbol}`);
}

// Search functionality for stocks
function searchStocks() {
    const searchInput = document.getElementById('stock-search');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredStocks = stocks;
    } else {
        filteredStocks = stocks.filter(stock => 
            stock.symbol.toLowerCase().includes(searchTerm) || 
            stock.name.toLowerCase().includes(searchTerm)
        );
    }
    
    renderWatchlist();
}

// Toggle price field based on order type
function togglePriceField() {
    const orderTypeSelect = document.getElementById('order-type');
    const priceField = document.getElementById('price');
    
    if (!orderTypeSelect || !priceField) return;
    
    const orderType = orderTypeSelect.value;
    
    if (orderType === 'MARKET') {
        priceField.disabled = true;
        priceField.value = '';
        priceField.placeholder = 'Market Price';
    } else {
        priceField.disabled = false;
        priceField.placeholder = '0.00';
    }
}

// Set order type (BUY/SELL) with visual feedback
function setOrderType(type) {
    currentOrderType = type;
    
    const buyBtn = document.querySelector('.buy-btn');
    const sellBtn = document.querySelector('.sell-btn');
    
    if (!buyBtn || !sellBtn) return;
    
    // Reset both buttons
    buyBtn.style.transform = 'scale(1)';
    sellBtn.style.transform = 'scale(1)';
    buyBtn.style.boxShadow = '';
    sellBtn.style.boxShadow = '';
    
    // Highlight selected button
    if (type === 'BUY') {
        buyBtn.style.transform = 'scale(1.05)';
        buyBtn.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.4)';
    } else {
        sellBtn.style.transform = 'scale(1.05)';
        sellBtn.style.boxShadow = '0 5px 15px rgba(244, 67, 54, 0.4)';
    }
    
    console.log(`Order type set to: ${type}`);
}

// Handle order form submission
function placeOrder(event) {
    event.preventDefault();
    
    // Get form values
    const stockSymbol = document.getElementById('stock-search')?.value.trim();
    const exchange = document.getElementById('exchange')?.value;
    const product = document.getElementById('product')?.value;
    const orderType = document.getElementById('order-type')?.value;
    const quantity = document.getElementById('quantity')?.value;
    const price = document.getElementById('price')?.value;
    const validity = document.getElementById('validity')?.value;
    
    // Validation
    if (!stockSymbol) {
        alert('Please enter a stock symbol');
        return;
    }
    
    if (!quantity || quantity <= 0) {
        alert('Please enter a valid quantity');
        return;
    }
    
    if (orderType !== 'MARKET' && (!price || price <= 0)) {
        alert('Please enter a valid price for limit orders');
        return;
    }
    
    // Check if stock exists
    const stockExists = stocks.some(stock => stock.symbol.toUpperCase() === stockSymbol.toUpperCase());
    if (!stockExists) {
        alert('Stock not found in our database');
        return;
    }
    
    // Create new order
    const newOrder = {
        symbol: stockSymbol.toUpperCase(),
        type: currentOrderType,
        qty: parseInt(quantity),
        price: orderType === 'MARKET' ? 'Market Price' : parseFloat(price),
        status: 'PENDING',
        time: new Date().toLocaleTimeString('en-US', { 
            hour12: true, 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        exchange: exchange,
        product: product,
        validity: validity
    };
    
    // Add to orders array
    orders.unshift(newOrder);
    
    // Re-render orders
    renderOrders();
    
    // Reset form
    resetOrderForm();
    
    // Success message
    const orderDetails = `${currentOrderType} ${quantity} shares of ${stockSymbol.toUpperCase()}`;
    const priceDetails = orderType === 'MARKET' ? 'at Market Price' : `at ₹${price}`;
    
    alert(`Order placed successfully!\n${orderDetails} ${priceDetails}\nExchange: ${exchange}\nProduct: ${product}`);
    
    console.log('Order placed:', newOrder);
}

// Reset order form after successful submission
function resetOrderForm() {
    const form = docume