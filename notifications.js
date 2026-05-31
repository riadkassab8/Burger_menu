// Notifications System JavaScript

// Notification configuration
const NOTIFICATION_CONFIG = {
  enabled: true,
  sound: true,
  vibration: true,
  duration: 5000,
  position: 'top-right'
};

// Notification types
const NOTIFICATION_TYPES = {
  ORDER: 'order',
  PROMOTION: 'promotion',
  RESERVATION: 'reservation',
  LOYALTY: 'loyalty',
  REVIEW: 'review',
  SYSTEM: 'system'
};

// Notification storage
let notifications = JSON.parse(localStorage.getItem('notifications') || '[]');

// Sample notifications
const sampleNotifications = [
  {
    id: 1,
    type: NOTIFICATION_TYPES.PROMOTION,
    title: 'عرض خاص!',
    message: 'خصم 20% على جميع البرجر اليوم فقط!',
    icon: 'fa-percentage',
    color: '#ff6b6b',
    timestamp: new Date().toISOString(),
    read: false,
    action: 'menu.html'
  },
  {
    id: 2,
    type: NOTIFICATION_TYPES.LOYALTY,
    title: 'مبروك!',
    message: 'لقد حصلت على 50 نقطة جديدة من طلبك الأخير',
    icon: 'fa-gift',
    color: '#4caf50',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    action: null
  },
  {
    id: 3,
    type: NOTIFICATION_TYPES.ORDER,
    title: 'تم تأكيد طلبك',
    message: 'طلبك #ORD001 قيد التحضير',
    icon: 'fa-check-circle',
    color: '#2196f3',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true,
    action: 'order-tracking.html'
  }
];

// Initialize notifications
function initializeNotifications() {
  if (notifications.length === 0) {
    notifications = sampleNotifications;
    saveNotifications();
  }
  
  // Request notification permission
  requestNotificationPermission();
  
  // Add notification bell to header
  addNotificationBell();
  
  // Check for new notifications periodically
  setInterval(checkForNewNotifications, 60000);
}

// Request browser notification permission
function requestNotificationPermission() {
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
      }
    });
  }
}

// Add notification bell to header
function addNotificationBell() {
  const header = document.querySelector('header') || document.querySelector('.modern-header');
  if (!header) return;
  
  // Check if bell already exists
  if (document.getElementById('notification-bell')) return;
  
  const bellContainer = document.createElement('div');
  bellContainer.className = 'notification-bell-container';
  bellContainer.innerHTML = `
    <button class="notification-bell" id="notification-bell">
      <i class="fas fa-bell"></i>
      <span class="notification-badge" id="notification-badge">0</span>
    </button>
    <div class="notification-dropdown" id="notification-dropdown">
      <div class="notification-header">
        <h4><i class="fas fa-bell"></i> الإشعارات</h4>
        <button class="mark-all-read" id="mark-all-read">تحديد الكل كمقروء</button>
      </div>
      <div class="notification-list" id="notification-list">
        <!-- Notifications will be loaded here -->
      </div>
      <div class="notification-footer">
        <a href="#" class="view-all-notifications">عرض الكل</a>
      </div>
    </div>
  `;
  
  // Add styles
  addNotificationStyles();
  
  // Add to header
  header.appendChild(bellContainer);
  
  // Initialize event listeners
  initializeNotificationEvents();
  
  // Update badge
  updateNotificationBadge();
}

// Add notification styles
function addNotificationStyles() {
  if (document.getElementById('notification-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'notification-styles';
  style.textContent = `
    .notification-bell-container {
      position: relative;
      margin-left: 1rem;
    }
    
    [dir="rtl"] .notification-bell-container {
      margin-left: 0;
      margin-right: 1rem;
    }
    
    .notification-bell {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 0.75rem;
      border-radius: 50%;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .notification-bell:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }
    
    .notification-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #ff4444;
      color: white;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 50%;
      min-width: 20px;
      text-align: center;
      display: none;
    }
    
    [dir="rtl"] .notification-badge {
      right: auto;
      left: -5px;
    }
    
    .notification-badge.show {
      display: block;
      animation: pulse 2s infinite;
    }
    
    .notification-dropdown {
      display: none;
      position: absolute;
      top: 60px;
      left: 0;
      width: 350px;
      max-height: 500px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      overflow: hidden;
      z-index: 10000;
    }
    
    [dir="rtl"] .notification-dropdown {
      left: auto;
      right: 0;
    }
    
    .notification-dropdown.show {
      display: block;
      animation: slideDown 0.3s ease;
    }
    
    .notification-header {
      background: linear-gradient(135deg, #ff6b6b 0%, #6d4c41 100%);
      color: white;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .notification-header h4 {
      margin: 0;
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .mark-all-read {
      background: rgba(255,255,255,0.2);
      border: none;
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .mark-all-read:hover {
      background: rgba(255,255,255,0.3);
    }
    
    .notification-list {
      max-height: 350px;
      overflow-y: auto;
    }
    
    .notification-item {
      padding: 1rem;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
    }
    
    .notification-item:hover {
      background: #f8f9fa;
    }
    
    .notification-item.unread {
      background: #fff5f5;
    }
    
    .notification-item.unread::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: #ff6b6b;
      border-radius: 50%;
    }
    
    [dir="rtl"] .notification-item.unread::before {
      right: auto;
      left: 10px;
    }
    
    .notification-item-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }
    
    .notification-icon {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.9rem;
    }
    
    .notification-title {
      font-weight: 600;
      color: #333;
      font-size: 0.95rem;
      flex: 1;
    }
    
    .notification-time {
      font-size: 0.75rem;
      color: #999;
    }
    
    .notification-message {
      color: #666;
      font-size: 0.85rem;
      line-height: 1.4;
      padding-right: 45px;
    }
    
    [dir="rtl"] .notification-message {
      padding-right: 0;
      padding-left: 45px;
    }
    
    .notification-footer {
      padding: 1rem;
      text-align: center;
      border-top: 1px solid #eee;
    }
    
    .view-all-notifications {
      color: #ff6b6b;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .view-all-notifications:hover {
      text-decoration: underline;
    }
    
    .empty-notifications {
      padding: 2rem;
      text-align: center;
      color: #999;
    }
    
    .empty-notifications i {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #ddd;
    }
    
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.2);
      }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @media (max-width: 768px) {
      .notification-dropdown {
        width: 300px;
        right: -100px;
      }
      
      [dir="rtl"] .notification-dropdown {
        right: auto;
        left: -100px;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Initialize notification events
function initializeNotificationEvents() {
  const bell = document.getElementById('notification-bell');
  const dropdown = document.getElementById('notification-dropdown');
  const markAllRead = document.getElementById('mark-all-read');
  
  // Toggle dropdown
  bell.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
    loadNotifications();
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !bell.contains(e.target)) {
      dropdown.classList.remove('show');
    }
  });
  
  // Mark all as read
  markAllRead.addEventListener('click', (e) => {
    e.stopPropagation();
    markAllNotificationsAsRead();
  });
  
  // Load notifications
  loadNotifications();
}

// Load notifications
function loadNotifications() {
  const container = document.getElementById('notification-list');
  
  if (notifications.length === 0) {
    container.innerHTML = `
      <div class="empty-notifications">
        <i class="fas fa-bell-slash"></i>
        <p>لا توجد إشعارات</p>
      </div>
    `;
    return;
  }
  
  // Sort by timestamp (newest first)
  const sortedNotifications = [...notifications].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  
  container.innerHTML = sortedNotifications.map(notification => `
    <div class="notification-item ${notification.read ? '' : 'unread'}" data-id="${notification.id}">
      <div class="notification-item-header">
        <div class="notification-icon" style="background: ${notification.color}">
          <i class="fas ${notification.icon}"></i>
        </div>
        <span class="notification-title">${notification.title}</span>
        <span class="notification-time">${formatNotificationTime(notification.timestamp)}</span>
      </div>
      <div class="notification-message">${notification.message}</div>
    </div>
  `).join('');
  
  // Add click events to notification items
  container.querySelectorAll('.notification-item').forEach(item => {
    item.addEventListener('click', () => {
      const notificationId = parseInt(item.dataset.id);
      markNotificationAsRead(notificationId);
      
      // Navigate to action if exists
      const notification = notifications.find(n => n.id === notificationId);
      if (notification && notification.action) {
        window.location.href = notification.action;
      }
    });
  });
}

// Update notification badge
function updateNotificationBadge() {
  const badge = document.getElementById('notification-badge');
  const unreadCount = notifications.filter(n => !n.read).length;
  
  if (unreadCount > 0) {
    badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
    badge.classList.add('show');
  } else {
    badge.classList.remove('show');
  }
}

// Mark notification as read
function markNotificationAsRead(notificationId) {
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    saveNotifications();
    updateNotificationBadge();
    loadNotifications();
  }
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
  notifications.forEach(n => n.read = true);
  saveNotifications();
  updateNotificationBadge();
  loadNotifications();
}

// Add new notification
function addNotification(type, title, message, action = null) {
  const typeConfig = {
    [NOTIFICATION_TYPES.ORDER]: { icon: 'fa-shopping-cart', color: '#2196f3' },
    [NOTIFICATION_TYPES.PROMOTION]: { icon: 'fa-percentage', color: '#ff6b6b' },
    [NOTIFICATION_TYPES.RESERVATION]: { icon: 'fa-calendar-alt', color: '#ff9800' },
    [NOTIFICATION_TYPES.LOYALTY]: { icon: 'fa-gift', color: '#4caf50' },
    [NOTIFICATION_TYPES.REVIEW]: { icon: 'fa-star', color: '#ffc107' },
    [NOTIFICATION_TYPES.SYSTEM]: { icon: 'fa-cog', color: '#9e9e9e' }
  };
  
  const config = typeConfig[type] || typeConfig[NOTIFICATION_TYPES.SYSTEM];
  
  const newNotification = {
    id: Date.now(),
    type: type,
    title: title,
    message: message,
    icon: config.icon,
    color: config.color,
    timestamp: new Date().toISOString(),
    read: false,
    action: action
  };
  
  notifications.unshift(newNotification);
  saveNotifications();
  updateNotificationBadge();
  
  // Show browser notification if permitted
  showBrowserNotification(title, message, config.icon);
  
  // Show in-app notification
  showInAppNotification(newNotification);
  
  return newNotification;
}

// Show browser notification
function showBrowserNotification(title, message, icon) {
  if ('Notification' in window && Notification.permission === 'granted' && NOTIFICATION_CONFIG.enabled) {
    new Notification(title, {
      body: message,
      icon: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/sprites/${icon}.svg`,
      badge: 'https://menuoprohub.top/alex1/logo/1758024242433_793.webp'
    });
  }
}

// Show in-app notification
function showInAppNotification(notification) {
  const toast = document.createElement('div');
  toast.className = 'notification-toast';
  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-icon" style="background: ${notification.color}">
        <i class="fas ${notification.icon}"></i>
      </div>
      <div class="toast-message">
        <h5>${notification.title}</h5>
        <p>${notification.message}</p>
      </div>
      <button class="toast-close">×</button>
    </div>
  `;
  
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    padding: 1rem;
    z-index: 10001;
    min-width: 300px;
    animation: slideInRight 0.5s ease;
    display: flex;
    gap: 1rem;
  `;
  
  [dir="rtl"] = toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    padding: 1rem;
    z-index: 10001;
    min-width: 300px;
    animation: slideInLeft 0.5s ease;
    display: flex;
    gap: 1rem;
  `;
  
  document.body.appendChild(toast);
  
  // Add toast styles
  if (!document.getElementById('toast-styles')) {
    const toastStyle = document.createElement('style');
    toastStyle.id = 'toast-styles';
    toastStyle.textContent = `
      .toast-content {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
      }
      
      .toast-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
      }
      
      .toast-message h5 {
        margin: 0 0 0.25rem 0;
        font-size: 1rem;
        color: #333;
      }
      
      .toast-message p {
        margin: 0;
        font-size: 0.85rem;
        color: #666;
      }
      
      .toast-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: #999;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .toast-close:hover {
        color: #333;
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(toastStyle);
  }
  
  // Close button
  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.remove();
  });
  
  // Auto remove
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, NOTIFICATION_CONFIG.duration);
}

// Format notification time
function formatNotificationTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'الآن';
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  if (days < 7) return `منذ ${days} يوم`;
  
  return date.toLocaleDateString('ar-EG');
}

// Save notifications
function saveNotifications() {
  localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Check for new notifications (simulated)
function checkForNewNotifications() {
  // This would typically check with a server
  // For demo purposes, we'll randomly add promotional notifications
  if (Math.random() < 0.1) {
    const promotions = [
      { title: 'عرض خاص!', message: 'خصم 15% على جميع المشروبات' },
      { title: 'جديد!', message: 'أضفنا أصناف جديدة للقائمة' },
      { title: 'سعيد!', message: 'احصل على وجبة مجانية مع كل 5 طلبات' }
    ];
    
    const promo = promotions[Math.floor(Math.random() * promotions.length)];
    addNotification(NOTIFICATION_TYPES.PROMOTION, promo.title, promo.message);
  }
}

// Integration with other systems
function notifyOrderUpdate(orderId, status) {
  const statusMessages = {
    'confirmed': 'تم تأكيد طلبك',
    'preparing': 'طلبك قيد التحضير',
    'delivering': 'طلبك جاري التوصيل',
    'completed': 'تم توصيل طلبك بنجاح'
  };
  
  addNotification(
    NOTIFICATION_TYPES.ORDER,
    statusMessages[status] || 'تحديث الطلب',
    `طلبك #${orderId} - ${statusMessages[status]}`,
    'order-tracking.html'
  );
}

function notifyReservationConfirmed(reservationId) {
  addNotification(
    NOTIFICATION_TYPES.RESERVATION,
    'تم تأكيد الحجز',
    `حجزك #${reservationId} تم تأكيده بنجاح`,
    null
  );
}

function notifyLoyaltyPointsEarned(points) {
  addNotification(
    NOTIFICATION_TYPES.LOYALTY,
    'مبروك!',
    `لقد حصلت على ${points} نقطة جديدة`,
    null
  );
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeNotifications();
});

// Export for use in other files
window.notificationSystem = {
  addNotification,
  notifyOrderUpdate,
  notifyReservationConfirmed,
  notifyLoyaltyPointsEarned,
  NOTIFICATION_TYPES
};
