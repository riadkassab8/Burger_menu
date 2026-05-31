// Order Tracking System JavaScript

// DOM Elements
const orderIdInput = document.getElementById('order-id-input');
const searchBtn = document.getElementById('search-btn');
const orderDetails = document.getElementById('order-details');
const loadingScreen = document.getElementById('loading-screen');

// Sample orders data with tracking
const sampleOrdersWithTracking = [
  {
    id: 'ORD001',
    customer: 'أحمد محمد',
    phone: '+201143665727',
    address: 'مدينة نصر، شارع عباس العقاد، مبنى 15، شقة 3',
    items: [
      { name: 'بيف برجر', quantity: 2, price: 45 },
      { name: 'تشيكن برجر', quantity: 1, price: 40 }
    ],
    total: 130,
    status: 'delivering',
    statusHistory: [
      { status: 'pending', time: '2024-05-20 14:30', completed: true },
      { status: 'confirmed', time: '2024-05-20 14:35', completed: true },
      { status: 'preparing', time: '2024-05-20 14:40', completed: true },
      { status: 'delivering', time: '2024-05-20 15:00', completed: true, current: true },
      { status: 'completed', time: '', completed: false }
    ],
    eta: '15 دقيقة',
    estimatedDelivery: '2024-05-20 15:15'
  },
  {
    id: 'ORD002',
    customer: 'سارة علي',
    phone: '+201011389401',
    address: 'مصر الجديدة، شارع الاهرام، مبنى 8، شقة 12',
    items: [
      { name: 'مقبلات', quantity: 3, price: 25 },
      { name: 'صوصات', quantity: 2, price: 15 }
    ],
    total: 95,
    status: 'preparing',
    statusHistory: [
      { status: 'pending', time: '2024-05-20 15:30', completed: true },
      { status: 'confirmed', time: '2024-05-20 15:35', completed: true },
      { status: 'preparing', time: '2024-05-20 15:40', completed: true, current: true },
      { status: 'delivering', time: '', completed: false },
      { status: 'completed', time: '', completed: false }
    ],
    eta: '25 دقيقة',
    estimatedDelivery: '2024-05-20 16:05'
  },
  {
    id: 'ORD003',
    customer: 'محمود حسن',
    phone: '+201009105861',
    address: 'مدينة نصر، شارع المكرم، مبنى 22، شقة 5',
    items: [
      { name: 'بيف برجر', quantity: 1, price: 45 },
      { name: 'صوصات', quantity: 1, price: 15 }
    ],
    total: 60,
    status: 'completed',
    statusHistory: [
      { status: 'pending', time: '2024-05-20 13:00', completed: true },
      { status: 'confirmed', time: '2024-05-20 13:05', completed: true },
      { status: 'preparing', time: '2024-05-20 13:10', completed: true },
      { status: 'delivering', time: '2024-05-20 13:30', completed: true },
      { status: 'completed', time: '2024-05-20 13:45', completed: true, current: true }
    ],
    eta: 'تم التوصيل',
    estimatedDelivery: '2024-05-20 13:45'
  }
];

// Status configuration
const statusConfig = {
  'pending': { name: 'قيد الانتظار', icon: 'fa-clock', color: 'pending' },
  'confirmed': { name: 'مؤكد', icon: 'fa-check', color: 'confirmed' },
  'preparing': { name: 'قيد التحضير', icon: 'fa-fire', color: 'preparing' },
  'delivering': { name: 'جاري التوصيل', icon: 'fa-motorcycle', color: 'delivering' },
  'completed': { name: 'تم التوصيل', icon: 'fa-check-circle', color: 'completed' }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  hideLoadingScreen();
  initializeEventListeners();
});

// Hide loading screen
function hideLoadingScreen() {
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 1000);
}

// Initialize event listeners
function initializeEventListeners() {
  searchBtn.addEventListener('click', searchOrder);
  orderIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchOrder();
    }
  });
}

// Search order
function searchOrder() {
  const orderId = orderIdInput.value.trim().toUpperCase();
  
  if (!orderId) {
    alert('يرجى إدخال رقم الطلب');
    return;
  }
  
  // Load orders from localStorage or use sample data
  let orders = JSON.parse(localStorage.getItem('ordersWithTracking') || '[]');
  if (orders.length === 0) {
    orders = sampleOrdersWithTracking;
  }
  
  // Find order
  const order = orders.find(o => o.id === orderId);
  
  if (order) {
    displayOrderDetails(order);
  } else {
    alert('لم يتم العثور على الطلب. يرجى التحقق من رقم الطلب.');
    orderDetails.classList.remove('show');
  }
}

// Display order details
function displayOrderDetails(order) {
  // Update order info
  document.getElementById('display-order-id').textContent = order.id;
  const statusElement = document.getElementById('order-status');
  statusElement.textContent = statusConfig[order.status].name;
  statusElement.className = 'order-status ' + statusConfig[order.status].color;
  
  // Update timeline
  renderTimeline(order.statusHistory);
  
  // Update order items
  renderOrderItems(order.items);
  
  // Update total
  document.getElementById('order-total').textContent = order.total + ' ج.م';
  
  // Update delivery info
  document.getElementById('customer-name').textContent = order.customer;
  document.getElementById('customer-phone').textContent = order.phone;
  document.getElementById('delivery-address').textContent = order.address;
  
  // Update ETA
  document.getElementById('eta-time').textContent = order.eta;
  
  // Show order details
  orderDetails.classList.add('show');
  
  // Start real-time updates if order is not completed
  if (order.status !== 'completed') {
    startRealTimeUpdates(order.id);
  }
}

// Render timeline
function renderTimeline(statusHistory) {
  const timeline = document.getElementById('tracking-timeline');
  
  timeline.innerHTML = statusHistory.map((item, index) => {
    const config = statusConfig[item.status];
    const statusClass = item.completed ? 'completed' : (item.current ? 'current' : 'pending');
    
    return `
      <div class="timeline-item ${statusClass}">
        <div class="timeline-content">
          <h5><i class="fas ${config.icon}"></i> ${config.name}</h5>
          <p>${item.time ? formatTime(item.time) : 'في انتظار التحديث'}</p>
          ${item.time ? `<div class="time">${item.time}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// Render order items
function renderOrderItems(items) {
  const container = document.getElementById('order-items-list');
  
  container.innerHTML = items.map(item => `
    <div class="order-item">
      <span class="order-item-name">${item.name}</span>
      <span class="order-item-quantity">x${item.quantity}</span>
      <span class="order-item-price">${item.price * item.quantity} ج.م</span>
    </div>
  `).join('');
}

// Format time
function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
}

// Start real-time updates
function startRealTimeUpdates(orderId) {
  // Simulate real-time updates every 30 seconds
  const updateInterval = setInterval(() => {
    updateOrderStatus(orderId);
  }, 30000);
  
  // Store interval ID to clear it later
  window.currentUpdateInterval = updateInterval;
}

// Update order status (simulated)
function updateOrderStatus(orderId) {
  let orders = JSON.parse(localStorage.getItem('ordersWithTracking') || JSON.stringify(sampleOrdersWithTracking));
  const order = orders.find(o => o.id === orderId);
  
  if (!order || order.status === 'completed') {
    clearInterval(window.currentUpdateInterval);
    return;
  }
  
  // Simulate status progression
  const statusOrder = ['pending', 'confirmed', 'preparing', 'delivering', 'completed'];
  const currentIndex = statusOrder.indexOf(order.status);
  
  if (currentIndex < statusOrder.length - 1) {
    // Random chance to progress (30% chance each update)
    if (Math.random() < 0.3) {
      const newStatus = statusOrder[currentIndex + 1];
      order.status = newStatus;
      
      // Update status history
      const historyItem = order.statusHistory.find(h => h.status === newStatus);
      if (historyItem) {
        historyItem.completed = true;
        historyItem.time = new Date().toISOString().slice(0, 16);
        historyItem.current = true;
      }
      
      // Mark previous as not current
      const prevHistoryItem = order.statusHistory.find(h => h.status === statusOrder[currentIndex]);
      if (prevHistoryItem) {
        prevHistoryItem.current = false;
      }
      
      // Update ETA
      if (newStatus === 'delivering') {
        order.eta = '15 دقيقة';
      } else if (newStatus === 'completed') {
        order.eta = 'تم التوصيل';
      }
      
      // Save to localStorage
      localStorage.setItem('ordersWithTracking', JSON.stringify(orders));
      
      // Update display
      displayOrderDetails(order);
      
      // Show notification
      showStatusUpdateNotification(statusConfig[newStatus].name);
    }
  }
}

// Show status update notification
function showStatusUpdateNotification(status) {
  const notification = document.createElement('div');
  notification.className = 'tracking-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-bell"></i>
      <span>تم تحديث حالة الطلب: ${status}</span>
      <button class="notification-close">×</button>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ff6b6b 0%, #6d4c41 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideDown 0.5s ease;
    display: flex;
    align-items: center;
    gap: 1rem;
  `;
  
  document.body.appendChild(notification);
  
  // Close button
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.remove();
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.remove();
  }, 5000);
}

// Add tracking link to cart checkout
function integrateTrackingWithCart() {
  // This would be called when an order is placed
  // to generate a tracking ID and save the order
}

// Export for use in other files
window.orderTrackingSystem = {
  searchOrder,
  displayOrderDetails
};
