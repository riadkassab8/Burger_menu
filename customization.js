// Item Customization System JavaScript

// Customization configuration
const CUSTOMIZATION_CONFIG = {
  'beef-burger': {
    name: 'بيف برجر',
    basePrice: 45,
    options: {
      extras: [
        { id: 'cheese', name: 'جبن إضافي', price: 5, icon: 'fa-cheese' },
        { id: 'bacon', name: 'بيكون', price: 10, icon: 'fa-bacon' },
        { id: 'egg', name: 'بيضة', price: 5, icon: 'fa-egg' },
        { id: 'mushrooms', name: 'فطر', price: 7, icon: 'fa-leaf' },
        { id: 'onion-rings', name: 'حلقات بصل', price: 8, icon: 'fa-circle' }
      ],
      removals: [
        { id: 'no-cheese', name: 'بدون جبن', icon: 'fa-times' },
        { id: 'no-onion', name: 'بدون بصل', icon: 'fa-times' },
        { id: 'no-tomato', name: 'بدون طماطم', icon: 'fa-times' },
        { id: 'no-lettuce', name: 'بدون خس', icon: 'fa-times' },
        { id: 'no-pickles', name: 'بدون مخلل', icon: 'fa-times' }
      ],
      cooking: [
        { id: 'rare', name: 'نيء قليلاً', icon: 'fa-fire' },
        { id: 'medium', name: 'متوسط', icon: 'fa-fire-alt' },
        { id: 'well-done', name: 'نيء جيداً', icon: 'fa-fire-extinguisher' }
      ],
      size: [
        { id: 'small', name: 'صغير', priceMultiplier: 0.8, icon: 'fa-compress' },
        { id: 'medium', name: 'متوسط', priceMultiplier: 1, icon: 'fa-equals' },
        { id: 'large', name: 'كبير', priceMultiplier: 1.3, icon: 'fa-expand' }
      ]
    }
  },
  'chicken-burger': {
    name: 'تشيكن برجر',
    basePrice: 40,
    options: {
      extras: [
        { id: 'cheese', name: 'جبن إضافي', price: 5, icon: 'fa-cheese' },
        { id: 'bacon', name: 'بيكون', price: 10, icon: 'fa-bacon' },
        { id: 'avocado', name: 'أفوكادو', price: 12, icon: 'fa-leaf' },
        { id: 'jalapenos', name: ' jalapeño', price: 5, icon: 'fa-pepper-hot' }
      ],
      removals: [
        { id: 'no-cheese', name: 'بدون جبن', icon: 'fa-times' },
        { id: 'no-onion', name: 'بدون بصل', icon: 'fa-times' },
        { id: 'no-tomato', name: 'بدون طماطم', icon: 'fa-times' },
        { id: 'no-lettuce', name: 'بدون خس', icon: 'fa-times' }
      ],
      cooking: [
        { id: 'crispy', name: 'مقرمش', icon: 'fa-fire' },
        { id: 'grilled', name: 'مشوي', icon: 'fa-fire-alt' }
      ],
      size: [
        { id: 'small', name: 'صغير', priceMultiplier: 0.8, icon: 'fa-compress' },
        { id: 'medium', name: 'متوسط', priceMultiplier: 1, icon: 'fa-equals' },
        { id: 'large', name: 'كبير', priceMultiplier: 1.3, icon: 'fa-expand' }
      ]
    }
  },
  'appetizers': {
    name: 'مقبلات',
    basePrice: 25,
    options: {
      extras: [
        { id: 'extra-hummus', name: 'حمص إضافي', price: 8, icon: 'fa-bowl-food' },
        { id: 'extra-falafel', name: 'فلافل إضافي', price: 10, icon: 'fa-cookie' },
        { id: 'extra-baba', name: 'بابا غنوج إضافي', price: 8, icon: 'fa-bowl-food' }
      ],
      removals: [],
      cooking: [],
      size: [
        { id: 'small', name: 'صغير', priceMultiplier: 0.7, icon: 'fa-compress' },
        { id: 'medium', name: 'متوسط', priceMultiplier: 1, icon: 'fa-equals' },
        { id: 'large', name: 'كبير', priceMultiplier: 1.5, icon: 'fa-expand' }
      ]
    }
  },
  'sauces': {
    name: 'صوصات',
    basePrice: 15,
    options: {
      extras: [
        { id: 'extra-ketchup', name: 'كاتشب إضافي', price: 3, icon: 'fa-bottle-droplet' },
        { id: 'extra-mayo', name: 'مايونيز إضافي', price: 3, icon: 'fa-bottle-droplet' },
        { id: 'extra-mustard', name: 'خردل إضافي', price: 3, icon: 'fa-bottle-droplet' },
        { id: 'bbq-sauce', name: 'صوص باربيكيو', price: 5, icon: 'fa-bottle-droplet' },
        { id: 'garlic-sauce', name: 'صوص ثوم', price: 5, icon: 'fa-bottle-droplet' }
      ],
      removals: [],
      cooking: [],
      size: [
        { id: 'small', name: 'صغير', priceMultiplier: 0.7, icon: 'fa-compress' },
        { id: 'medium', name: 'متوسط', priceMultiplier: 1, icon: 'fa-equals' },
        { id: 'large', name: 'كبير', priceMultiplier: 1.5, icon: 'fa-expand' }
      ]
    }
  }
};

// Current customization state
let currentCustomization = {
  itemId: null,
  extras: [],
  removals: [],
  cooking: null,
  size: null
};

// Show customization modal
function showCustomizationModal(itemId) {
  const config = CUSTOMIZATION_CONFIG[itemId];
  if (!config) {
    // If no customization available, add directly to cart
    addToCart(itemId);
    return;
  }
  
  // Reset state
  currentCustomization = {
    itemId: itemId,
    extras: [],
    removals: [],
    cooking: config.options.cooking.length > 0 ? config.options.cooking[1].id : null,
    size: 'medium'
  };
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'customization-modal';
  modal.id = 'customization-modal';
  
  modal.innerHTML = `
    <div class="modal-overlay" id="customization-overlay"></div>
    <div class="customization-content">
      <div class="customization-header">
        <h3><i class="fas fa-sliders-h"></i> تخصيص ${config.name}</h3>
        <button class="close-btn" id="close-customization">×</button>
      </div>
      
      <div class="customization-body">
        <!-- Size Selection -->
        ${config.options.size.length > 0 ? `
          <div class="customization-section">
            <h4><i class="fas fa-expand-arrows-alt"></i> الحجم</h4>
            <div class="options-grid" id="size-options">
              ${config.options.size.map(option => `
                <div class="option-card ${option.id === 'medium' ? 'selected' : ''}" data-type="size" data-value="${option.id}" data-multiplier="${option.priceMultiplier}">
                  <i class="fas ${option.icon}"></i>
                  <span>${option.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Cooking Style -->
        ${config.options.cooking.length > 0 ? `
          <div class="customization-section">
            <h4><i class="fas fa-fire"></i> طريقة الطهي</h4>
            <div class="options-grid" id="cooking-options">
              ${config.options.cooking.map(option => `
                <div class="option-card ${option.id === 'medium' || option.id === 'grilled' ? 'selected' : ''}" data-type="cooking" data-value="${option.id}">
                  <i class="fas ${option.icon}"></i>
                  <span>${option.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Extras -->
        ${config.options.extras.length > 0 ? `
          <div class="customization-section">
            <h4><i class="fas fa-plus-circle"></i> إضافات</h4>
            <div class="options-grid" id="extras-options">
              ${config.options.extras.map(option => `
                <div class="option-card" data-type="extras" data-value="${option.id}" data-price="${option.price}">
                  <i class="fas ${option.icon}"></i>
                  <span>${option.name}</span>
                  <small>+${option.price} ج.م</small>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Removals -->
        ${config.options.removals.length > 0 ? `
          <div class="customization-section">
            <h4><i class="fas fa-minus-circle"></i> إزالة</h4>
            <div class="options-grid" id="removals-options">
              ${config.options.removals.map(option => `
                <div class="option-card" data-type="removals" data-value="${option.id}">
                  <i class="fas ${option.icon}"></i>
                  <span>${option.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
        
        <!-- Price Summary -->
        <div class="price-summary">
          <div class="summary-row">
            <span>السعر الأساسي</span>
            <span id="base-price">${config.basePrice} ج.م</span>
          </div>
          <div class="summary-row">
            <span>الإضافات</span>
            <span id="extras-price">0 ج.م</span>
          </div>
          <div class="summary-row">
            <span>تعديل الحجم</span>
            <span id="size-price">0 ج.م</span>
          </div>
          <div class="summary-row total">
            <span>الإجمالي</span>
            <span id="total-price">${config.basePrice} ج.م</span>
          </div>
        </div>
      </div>
      
      <div class="customization-footer">
        <button class="cancel-btn" id="cancel-customization">إلغاء</button>
        <button class="confirm-btn" id="confirm-customization">
          <i class="fas fa-check"></i> إضافة للسلة
        </button>
      </div>
    </div>
  `;
  
  // Add styles
  addCustomizationStyles();
  
  // Add to page
  document.body.appendChild(modal);
  
  // Initialize event listeners
  initializeCustomizationEvents(config);
}

// Add customization styles
function addCustomizationStyles() {
  if (document.getElementById('customization-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'customization-styles';
  style.textContent = `
    .customization-modal {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      justify-content: center;
      align-items: center;
    }
    
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      z-index: 10001;
    }
    
    .customization-content {
      background: white;
      border-radius: 20px;
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      z-index: 10002;
      animation: slideUp 0.3s ease;
    }
    
    .customization-header {
      background: linear-gradient(135deg, #ff6b6b 0%, #6d4c41 100%);
      color: white;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 10;
    }
    
    .customization-header h3 {
      margin: 0;
      font-size: 1.3rem;
    }
    
    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.3s;
    }
    
    .close-btn:hover {
      background: rgba(255,255,255,0.2);
    }
    
    .customization-body {
      padding: 1.5rem;
    }
    
    .customization-section {
      margin-bottom: 2rem;
    }
    
    .customization-section h4 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 10px;
    }
    
    .option-card {
      border: 2px solid #ddd;
      border-radius: 10px;
      padding: 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
    }
    
    .option-card:hover {
      border-color: #ff6b6b;
      transform: translateY(-2px);
    }
    
    .option-card.selected {
      border-color: #ff6b6b;
      background: #fff5f5;
    }
    
    .option-card i {
      font-size: 1.5rem;
      color: #ff6b6b;
      margin-bottom: 0.5rem;
    }
    
    .option-card span {
      display: block;
      font-weight: 600;
      color: #333;
      font-size: 0.9rem;
    }
    
    .option-card small {
      display: block;
      color: #666;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }
    
    .price-summary {
      background: #f8f9fa;
      border-radius: 15px;
      padding: 1.5rem;
      margin-top: 2rem;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      color: #666;
    }
    
    .summary-row.total {
      border-top: 2px solid #ddd;
      padding-top: 1rem;
      margin-top: 1rem;
      margin-bottom: 0;
      font-size: 1.2rem;
      font-weight: 700;
      color: #ff6b6b;
    }
    
    .customization-footer {
      padding: 1.5rem;
      border-top: 1px solid #eee;
      display: flex;
      gap: 1rem;
      position: sticky;
      bottom: 0;
      background: white;
    }
    
    .cancel-btn {
      flex: 1;
      padding: 15px;
      border: 2px solid #ddd;
      border-radius: 10px;
      background: white;
      color: #666;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .cancel-btn:hover {
      border-color: #ff6b6b;
      color: #ff6b6b;
    }
    
    .confirm-btn {
      flex: 2;
      padding: 15px;
      border: none;
      border-radius: 10px;
      background: linear-gradient(135deg, #ff6b6b 0%, #6d4c41 100%);
      color: white;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .confirm-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Initialize customization events
function initializeCustomizationEvents(config) {
  const modal = document.getElementById('customization-modal');
  const overlay = document.getElementById('customization-overlay');
  const closeBtn = document.getElementById('close-customization');
  const cancelBtn = document.getElementById('cancel-customization');
  const confirmBtn = document.getElementById('confirm-customization');
  
  // Close modal
  const closeModal = () => {
    modal.remove();
  };
  
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  
  // Option selection
  document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      const value = card.dataset.value;
      
      if (type === 'size' || type === 'cooking') {
        // Single selection
        document.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(c => {
          c.classList.remove('selected');
        });
        card.classList.add('selected');
        currentCustomization[type] = value;
      } else if (type === 'extras') {
        // Multiple selection
        card.classList.toggle('selected');
        if (card.classList.contains('selected')) {
          currentCustomization.extras.push({
            id: value,
            price: parseFloat(card.dataset.price)
          });
        } else {
          currentCustomization.extras = currentCustomization.extras.filter(e => e.id !== value);
        }
      } else if (type === 'removals') {
        // Multiple selection
        card.classList.toggle('selected');
        if (card.classList.contains('selected')) {
          currentCustomization.removals.push(value);
        } else {
          currentCustomization.removals = currentCustomization.removals.filter(r => r !== value);
        }
      }
      
      // Update price
      updatePriceSummary(config);
    });
  });
  
  // Confirm customization
  confirmBtn.addEventListener('click', () => {
    addCustomizedItemToCart(config);
    closeModal();
  });
}

// Update price summary
function updatePriceSummary(config) {
  const basePrice = config.basePrice;
  
  // Calculate size multiplier
  const sizeCard = document.querySelector('.option-card[data-type="size"].selected');
  const sizeMultiplier = sizeCard ? parseFloat(sizeCard.dataset.multiplier) : 1;
  const sizePrice = Math.round(basePrice * (sizeMultiplier - 1));
  
  // Calculate extras price
  const extrasPrice = currentCustomization.extras.reduce((sum, extra) => sum + extra.price, 0);
  
  // Calculate total
  const totalPrice = Math.round(basePrice * sizeMultiplier + extrasPrice);
  
  // Update display
  document.getElementById('base-price').textContent = basePrice + ' ج.م';
  document.getElementById('extras-price').textContent = extrasPrice + ' ج.م';
  document.getElementById('size-price').textContent = (sizePrice >= 0 ? '+' : '') + sizePrice + ' ج.م';
  document.getElementById('total-price').textContent = totalPrice + ' ج.م';
}

// Add customized item to cart
function addCustomizedItemToCart(config) {
  const sizeCard = document.querySelector('.option-card[data-type="size"].selected');
  const cookingCard = document.querySelector('.option-card[data-type="cooking"].selected');
  
  const sizeMultiplier = sizeCard ? parseFloat(sizeCard.dataset.multiplier) : 1;
  const cooking = cookingCard ? cookingCard.dataset.value : null;
  
  const basePrice = config.basePrice;
  const extrasPrice = currentCustomization.extras.reduce((sum, extra) => sum + extra.price, 0);
  const totalPrice = Math.round(basePrice * sizeMultiplier + extrasPrice);
  
  // Build item name with customizations
  let itemName = config.name;
  const customizations = [];
  
  if (sizeCard && sizeCard.dataset.value !== 'medium') {
    customizations.push(sizeCard.querySelector('span').textContent);
  }
  
  if (cookingCard) {
    customizations.push(cookingCard.querySelector('span').textContent);
  }
  
  if (currentCustomization.extras.length > 0) {
    const extrasNames = currentCustomization.extras.map(e => {
      const card = document.querySelector(`.option-card[data-type="extras"][data-value="${e.id}"]`);
      return card ? card.querySelector('span').textContent : e.id;
    });
    customizations.push('إضافة: ' + extrasNames.join(', '));
  }
  
  if (currentCustomization.removals.length > 0) {
    const removalsNames = currentCustomization.removals.map(r => {
      const card = document.querySelector(`.option-card[data-type="removals"][data-value="${r}"]`);
      return card ? card.querySelector('span').textContent : r;
    });
    customizations.push('بدون: ' + removalsNames.join(', '));
  }
  
  if (customizations.length > 0) {
    itemName += ' (' + customizations.join(', ') + ')';
  }
  
  // Add to cart
  const cartItem = {
    id: currentCustomization.itemId + '_' + Date.now(),
    name: itemName,
    price: totalPrice,
    quantity: 1,
    customizations: currentCustomization
  };
  
  // Use existing cart system
  if (window.addToCart) {
    // Add custom item to cart
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
    
    // Show notification
    showNotification('تمت الإضافة للسلة', `${itemName} - ${totalPrice} ج.م`);
  } else {
    // Fallback
    alert(`تمت إضافة ${itemName} للسلة\nالسعر: ${totalPrice} ج.م`);
  }
}

// Show notification
function showNotification(title, message) {
  const notification = document.createElement('div');
  notification.className = 'customization-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <h4>${title}</h4>
      <p>${message}</p>
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
    z-index: 10003;
    animation: slideDown 0.5s ease;
    min-width: 300px;
  `;
  
  document.body.appendChild(notification);
  
  // Close button
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.remove();
  });
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add customization buttons to menu items
function addCustomizationButtonsToMenu() {
  const menuItems = document.querySelectorAll('.menu-item, .category-card');
  
  menuItems.forEach(item => {
    const itemId = item.dataset.itemId || item.querySelector('[onclick]')?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
    
    if (itemId && CUSTOMIZATION_CONFIG[itemId]) {
      const existingBtn = item.querySelector('.customize-btn');
      if (!existingBtn) {
        const addBtn = item.querySelector('.add-to-cart-btn');
        if (addBtn) {
          const customizeBtn = document.createElement('button');
          customizeBtn.className = 'customize-btn';
          customizeBtn.innerHTML = '<i class="fas fa-sliders-h"></i> تخصيص';
          customizeBtn.style.cssText = `
            background: #f8f9fa;
            border: 2px solid #ff6b6b;
            color: #ff6b6b;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 0.5rem;
            width: 100%;
          `;
          
          customizeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showCustomizationModal(itemId);
          });
          
          addBtn.parentNode.insertBefore(customizeBtn, addBtn.nextSibling);
        }
      }
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    addCustomizationButtonsToMenu();
  }, 2000);
});

// Export for use in other files
window.customizationSystem = {
  showCustomizationModal,
  addCustomizationButtonsToMenu
};
