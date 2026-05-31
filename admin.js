// Admin Dashboard JavaScript

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const adminDashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const sidebarLinks = document.querySelectorAll('.sidebar-menu a[data-tab]');

// Sample data
const sampleOrders = [
  { id: 'ORD001', customer: 'أحمد محمد', phone: '+201143665727', items: 'بيف برجر x2, تشيكن برجر x1', total: 130, status: 'pending', date: '2024-05-20 14:30' },
  { id: 'ORD002', customer: 'سارة علي', phone: '+201011389401', items: 'مقبلات x3, صوصات x2', total: 95, status: 'confirmed', date: '2024-05-20 13:15' },
  { id: 'ORD003', customer: 'محمود حسن', phone: '+201009105861', items: 'بيف برجر x1, صوصات x1', total: 60, status: 'completed', date: '2024-05-20 12:00' },
  { id: 'ORD004', customer: 'نورة أحمد', phone: '+201143665727', items: 'تشيكن برجر x2', total: 80, status: 'pending', date: '2024-05-20 11:45' },
  { id: 'ORD005', customer: 'خالد عبدالله', phone: '+201011389401', items: 'بيف برجر x3, مقبلات x2', total: 185, status: 'cancelled', date: '2024-05-20 10:30' }
];

const sampleReservations = [
  { id: 'RES001', name: 'أحمد محمد', phone: '+201143665727', branch: 'nasr-city', date: '2024-05-25', time: '19:00', guests: 4, status: 'confirmed' },
  { id: 'RES002', name: 'سارة علي', phone: '+201011389401', branch: 'heliopolis', date: '2024-05-26', time: '20:00', guests: 2, status: 'pending' },
  { id: 'RES003', name: 'محمود حسن', phone: '+201009105861', branch: 'nasr-city', date: '2024-05-27', time: '18:30', guests: 6, status: 'confirmed' }
];

const sampleMenuItems = [
  { id: 'beef-burger', name: 'بيف برجر', category: 'برجر', price: 45, rating: 4.6, image: 'https://menuoprohub.top/wahedburger/332dd7f9-373e-475c-b342-2e682f8707ee/categories/1757530627508-61330e87-77a5-4af8-888f-fa85a8f78c86.webp', status: 'active' },
  { id: 'chicken-burger', name: 'تشيكن برجر', category: 'برجر', price: 40, rating: 4.4, image: 'https://menuoprohub.top/wahedburger/332dd7f9-373e-475c-b342-2e682f8707ee/categories/1757530651937-5592ef97-b8e9-4dcc-8d26-bcd807166028.webp', status: 'active' },
  { id: 'appetizers', name: 'مقبلات', category: 'مقبلات', price: 25, rating: 4.8, image: 'https://menuoprohub.top/wahedburger/332dd7f9-373e-475c-b342-2e682f8707ee/categories/1757530706639-3849fcac-d03e-4f46-9685-167b6f2314a6.webp', status: 'active' },
  { id: 'sauces', name: 'صوصات', category: 'صوصات', price: 15, rating: 4.7, image: 'https://tse4.mm.bing.net/th/id/OIP.idRWkfFwvTPlm80bUenKTQHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3', status: 'active' }
];

const sampleCustomers = [
  { name: 'أحمد محمد', phone: '+201143665727', email: 'ahmed@email.com', totalOrders: 15, totalSpent: 1275, points: 150 },
  { name: 'سارة علي', phone: '+201011389401', email: 'sara@email.com', totalOrders: 8, totalSpent: 640, points: 80 },
  { name: 'محمود حسن', phone: '+201009105861', email: 'mahmoud@email.com', totalOrders: 12, totalSpent: 960, points: 120 }
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  checkLogin();
  initializeEventListeners();
});

// Check if user is logged in
function checkLogin() {
  const isLoggedIn = localStorage.getItem('adminLoggedIn');
  if (isLoggedIn === 'true') {
    showDashboard();
  }
}

// Login handler
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem('adminLoggedIn', 'true');
    showDashboard();
  } else {
    alert('اسم المستخدم أو كلمة المرور غير صحيحة');
  }
});

// Show dashboard
function showDashboard() {
  loginScreen.style.display = 'none';
  adminDashboard.style.display = 'flex';
  loadDashboardData();
}

// Logout handler
document.getElementById('logout-btn').addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem('adminLoggedIn');
  location.reload();
});

// Initialize event listeners
function initializeEventListeners() {
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = link.dataset.tab;
      switchTab(tab);
    });
  });
}

// Switch tab
function switchTab(tabName) {
  // Update sidebar active state
  sidebarLinks.forEach(link => {
    link.classList.remove('active');
    if (link.dataset.tab === tabName) {
      link.classList.add('active');
    }
  });
  
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // Show selected tab content
  const selectedTab = document.getElementById(`${tabName}-tab`);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Update page title
  const titles = {
    'dashboard': 'لوحة التحكم',
    'orders': 'إدارة الطلبات',
    'reservations': 'إدارة الحجوزات',
    'menu': 'إدارة القائمة',
    'customers': 'إدارة العملاء',
    'reviews': 'إدارة التقييمات',
    'analytics': 'التحليلات والإحصائيات',
    'settings': 'الإعدادات'
  };
  document.getElementById('page-title').textContent = titles[tabName] || 'لوحة التحكم';
  
  // Load tab-specific data
  loadTabData(tabName);
}

// Load tab data
function loadTabData(tabName) {
  switch (tabName) {
    case 'dashboard':
      loadDashboardData();
      break;
    case 'orders':
      loadOrders();
      break;
    case 'reservations':
      loadReservations();
      break;
    case 'menu':
      loadMenuItems();
      break;
    case 'customers':
      loadCustomers();
      break;
    case 'reviews':
      loadReviews();
      break;
    case 'analytics':
      loadAnalytics();
      break;
  }
}

// Load dashboard data
function loadDashboardData() {
  const orders = JSON.parse(localStorage.getItem('orders') || JSON.stringify(sampleOrders));
  const reservations = JSON.parse(localStorage.getItem('reservations') || JSON.stringify(sampleReservations));
  const customers = JSON.parse(localStorage.getItem('customers') || JSON.stringify(sampleCustomers));
  
  // Calculate stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  document.getElementById('total-orders').textContent = orders.length;
  document.getElementById('total-revenue').textContent = totalRevenue + ' ج.م';
  document.getElementById('total-reservations').textContent = reservations.length;
  document.getElementById('total-customers').textContent = customers.length;
  
  // Load recent orders
  const recentOrders = orders.slice(0, 5);
  const recentOrdersContainer = document.getElementById('recent-orders');
  recentOrdersContainer.innerHTML = recentOrders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.total} ج.م</td>
      <td><span class="status-badge ${order.status}">${getStatusText(order.status)}</span></td>
      <td>${order.date}</td>
      <td>
        <button class="action-btn view" onclick="viewOrder('${order.id}')"><i class="fas fa-eye"></i></button>
      </td>
    </tr>
  `).join('');
}

// Load orders
function loadOrders() {
  const orders = JSON.parse(localStorage.getItem('orders') || JSON.stringify(sampleOrders));
  const container = document.getElementById('all-orders');
  
  container.innerHTML = orders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.items}</td>
      <td>${order.total} ج.م</td>
      <td><span class="status-badge ${order.status}">${getStatusText(order.status)}</span></td>
      <td>${order.date}</td>
      <td>
        <button class="action-btn view" onclick="viewOrder('${order.id}')"><i class="fas fa-eye"></i></button>
        <button class="action-btn edit" onclick="editOrder('${order.id}')"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" onclick="deleteOrder('${order.id}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// Load reservations
function loadReservations() {
  const reservations = JSON.parse(localStorage.getItem('reservations') || JSON.stringify(sampleReservations));
  const container = document.getElementById('all-reservations');
  
  const branchNames = {
    'nasr-city': 'مدينة نصر',
    'heliopolis': 'مصر الجديدة'
  };
  
  container.innerHTML = reservations.map(reservation => `
    <tr>
      <td>${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${branchNames[reservation.branch]}</td>
      <td>${reservation.date}</td>
      <td>${reservation.time}</td>
      <td>${reservation.guests}</td>
      <td><span class="status-badge ${reservation.status}">${getStatusText(reservation.status)}</span></td>
      <td>
        <button class="action-btn view" onclick="viewReservation('${reservation.id}')"><i class="fas fa-eye"></i></button>
        <button class="action-btn edit" onclick="editReservation('${reservation.id}')"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" onclick="deleteReservation('${reservation.id}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// Load menu items
function loadMenuItems() {
  const menuItems = JSON.parse(localStorage.getItem('menuItems') || JSON.stringify(sampleMenuItems));
  const container = document.getElementById('menu-items');
  
  container.innerHTML = menuItems.map(item => `
    <tr>
      <td><img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 10px; object-fit: cover;"></td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.price} ج.م</td>
      <td><i class="fas fa-star" style="color: #ffc107;"></i> ${item.rating}</td>
      <td><span class="status-badge ${item.status === 'active' ? 'confirmed' : 'cancelled'}">${item.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
      <td>
        <button class="action-btn edit" onclick="editMenuItem('${item.id}')"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" onclick="deleteMenuItem('${item.id}')"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// Load customers
function loadCustomers() {
  const customers = JSON.parse(localStorage.getItem('customers') || JSON.stringify(sampleCustomers));
  const container = document.getElementById('customers-list');
  
  container.innerHTML = customers.map(customer => `
    <tr>
      <td>${customer.name}</td>
      <td>${customer.phone}</td>
      <td>${customer.email}</td>
      <td>${customer.totalOrders}</td>
      <td>${customer.totalSpent} ج.م</td>
      <td>${customer.points}</td>
      <td>
        <button class="action-btn view" onclick="viewCustomer('${customer.phone}')"><i class="fas fa-eye"></i></button>
        <button class="action-btn edit" onclick="editCustomer('${customer.phone}')"><i class="fas fa-edit"></i></button>
      </td>
    </tr>
  `).join('');
}

// Load reviews
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const container = document.getElementById('reviews-list');
  
  if (reviews.length === 0) {
    container.innerHTML = '<tr><td colspan="6" class="text-center">لا توجد تقييمات بعد</td></tr>';
    return;
  }
  
  container.innerHTML = reviews.map(review => `
    <tr>
      <td>${review.itemName}</td>
      <td>${review.reviewerName}</td>
      <td><i class="fas fa-star" style="color: #ffc107;"></i> ${review.rating}</td>
      <td>${review.text.substring(0, 50)}...</td>
      <td>${review.date}</td>
      <td>
        <button class="action-btn delete" onclick="deleteReview(${review.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

// Load analytics
function loadAnalytics() {
  const orders = JSON.parse(localStorage.getItem('orders') || JSON.stringify(sampleOrders));
  const customers = JSON.parse(localStorage.getItem('customers') || JSON.stringify(sampleCustomers));
  
  const container = document.getElementById('analytics-content');
  
  // Calculate analytics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? (totalRevenue / orders.length).toFixed(2) : 0;
  const totalCustomers = customers.length;
  const avgCustomerSpent = totalCustomers > 0 ? (totalRevenue / totalCustomers).toFixed(2) : 0;
  
  // Status breakdown
  const statusBreakdown = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  
  container.innerHTML = `
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="stat-card">
          <div class="icon blue">
            <i class="fas fa-chart-line"></i>
          </div>
          <h3>${totalRevenue} ج.م</h3>
          <p>إجمالي الإيرادات</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="stat-card">
          <div class="icon green">
            <i class="fas fa-receipt"></i>
          </div>
          <h3>${avgOrderValue} ج.م</h3>
          <p>متوسط قيمة الطلب</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="stat-card">
          <div class="icon orange">
            <i class="fas fa-user-tie"></i>
          </div>
          <h3>${avgCustomerSpent} ج.م</h3>
          <p>متوسط إنفاق العميل</p>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="stat-card">
          <div class="icon purple">
            <i class="fas fa-percentage"></i>
          </div>
          <h3>${((statusBreakdown.completed || 0) / orders.length * 100).toFixed(1)}%</h3>
          <p>نسبة إتمام الطلبات</p>
        </div>
      </div>
    </div>
    
    <div class="row mt-4">
      <div class="col-md-6">
        <div class="content-card">
          <h4>حالة الطلبات</h4>
          <div class="mt-3">
            <div class="d-flex justify-content-between mb-2">
              <span>قيد الانتظار</span>
              <span>${statusBreakdown.pending || 0}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>مؤكد</span>
              <span>${statusBreakdown.confirmed || 0}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>مكتمل</span>
              <span>${statusBreakdown.completed || 0}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>ملغي</span>
              <span>${statusBreakdown.cancelled || 0}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="content-card">
          <h4>أكثر الأصناف مبيعاً</h4>
          <div class="mt-3">
            <div class="d-flex justify-content-between mb-2">
              <span>بيف برجر</span>
              <span>45%</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>تشيكن برجر</span>
              <span>30%</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>مقبلات</span>
              <span>15%</span>
            </div>
            <div class="d-flex justify-content-between">
              <span>صوصات</span>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Helper functions
function getStatusText(status) {
  const statusTexts = {
    'pending': 'قيد الانتظار',
    'confirmed': 'مؤكد',
    'completed': 'مكتمل',
    'cancelled': 'ملغي'
  };
  return statusTexts[status] || status;
}

// Order actions
function viewOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem('orders') || JSON.stringify(sampleOrders));
  const order = orders.find(o => o.id === orderId);
  if (order) {
    alert(`تفاصيل الطلب #${orderId}\n\nالعميل: ${order.customer}\nالهاتف: ${order.phone}\nالعناصر: ${order.items}\nالمبلغ: ${order.total} ج.م\nالحالة: ${getStatusText(order.status)}\nالتاريخ: ${order.date}`);
  }
}

function editOrder(orderId) {
  const newStatus = prompt('أدخل الحالة الجديدة (pending/confirmed/completed/cancelled):');
  if (newStatus) {
    let orders = JSON.parse(localStorage.getItem('orders') || JSON.stringify(sampleOrders));
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      localStorage.setItem('orders', JSON.stringify(orders));
      loadOrders();
    }
  }
}

function deleteOrder(orderId) {
  if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
    let orders = JSON.parse(localStorage.getItem('orders') || JSON.stringify(sampleOrders));
    orders = orders.filter(o => o.id !== orderId);
    localStorage.setItem('orders', JSON.stringify(orders));
    loadOrders();
  }
}

// Reservation actions
function viewReservation(reservationId) {
  const reservations = JSON.parse(localStorage.getItem('reservations') || JSON.stringify(sampleReservations));
  const reservation = reservations.find(r => r.id === reservationId);
  if (reservation) {
    const branchNames = { 'nasr-city': 'مدينة نصر', 'heliopolis': 'مصر الجديدة' };
    alert(`تفاصيل الحجز #${reservationId}\n\nالاسم: ${reservation.name}\nالهاتف: ${reservation.phone}\nالفرع: ${branchNames[reservation.branch]}\nالتاريخ: ${reservation.date}\nالوقت: ${reservation.time}\nعدد الضيوف: ${reservation.guests}\nالحالة: ${getStatusText(reservation.status)}`);
  }
}

function editReservation(reservationId) {
  const newStatus = prompt('أدخل الحالة الجديدة (pending/confirmed/completed/cancelled):');
  if (newStatus) {
    let reservations = JSON.parse(localStorage.getItem('reservations') || JSON.stringify(sampleReservations));
    const reservation = reservations.find(r => r.id === reservationId);
    if (reservation) {
      reservation.status = newStatus;
      localStorage.setItem('reservations', JSON.stringify(reservations));
      loadReservations();
    }
  }
}

function deleteReservation(reservationId) {
  if (confirm('هل أنت متأكد من حذف هذا الحجز؟')) {
    let reservations = JSON.parse(localStorage.getItem('reservations') || JSON.stringify(sampleReservations));
    reservations = reservations.filter(r => r.id !== reservationId);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    loadReservations();
  }
}

// Menu item actions
function editMenuItem(itemId) {
  const menuItems = JSON.parse(localStorage.getItem('menuItems') || JSON.stringify(sampleMenuItems));
  const item = menuItems.find(i => i.id === itemId);
  if (item) {
    const newPrice = prompt('أدخل السعر الجديد:', item.price);
    if (newPrice) {
      item.price = parseInt(newPrice);
      localStorage.setItem('menuItems', JSON.stringify(menuItems));
      loadMenuItems();
    }
  }
}

function deleteMenuItem(itemId) {
  if (confirm('هل أنت متأكد من حذف هذا الصنف؟')) {
    let menuItems = JSON.parse(localStorage.getItem('menuItems') || JSON.stringify(sampleMenuItems));
    menuItems = menuItems.filter(i => i.id !== itemId);
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
    loadMenuItems();
  }
}

function showAddItemModal() {
  alert('سيتم إضافة نافذة إضافة صنف جديد');
}

// Customer actions
function viewCustomer(phone) {
  const customers = JSON.parse(localStorage.getItem('customers') || JSON.stringify(sampleCustomers));
  const customer = customers.find(c => c.phone === phone);
  if (customer) {
    alert(`تفاصيل العميل\n\nالاسم: ${customer.name}\nالهاتف: ${customer.phone}\nالبريد: ${customer.email}\nإجمالي الطلبات: ${customer.totalOrders}\nإجمالي الإنفاق: ${customer.totalSpent} ج.م\nالنقاط: ${customer.points}`);
  }
}

function editCustomer(phone) {
  const customers = JSON.parse(localStorage.getItem('customers') || JSON.stringify(sampleCustomers));
  const customer = customers.find(c => c.phone === phone);
  if (customer) {
    const newPoints = prompt('أدخل النقاط الجديدة:', customer.points);
    if (newPoints) {
      customer.points = parseInt(newPoints);
      localStorage.setItem('customers', JSON.stringify(customers));
      loadCustomers();
    }
  }
}

// Review actions
function deleteReview(reviewId) {
  if (confirm('هل أنت متأكد من حذف هذا التقييم؟')) {
    let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    reviews = reviews.filter(r => r.id !== reviewId);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    loadReviews();
  }
}

// Export functions
function exportOrders() {
  const orders = JSON.parse(localStorage.getItem('orders') || JSON.stringify(sampleOrders));
  const csv = convertToCSV(orders);
  downloadCSV(csv, 'orders.csv');
}

function exportReservations() {
  const reservations = JSON.parse(localStorage.getItem('reservations') || JSON.stringify(sampleReservations));
  const csv = convertToCSV(reservations);
  downloadCSV(csv, 'reservations.csv');
}

function convertToCSV(data) {
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(obj => Object.values(obj).join(','));
  return [headers, ...rows].join('\n');
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// Settings form
document.getElementById('settings-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('تم حفظ الإعدادات بنجاح');
});
