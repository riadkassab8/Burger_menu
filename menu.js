// DOM Elements
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");
const overlay = document.getElementById("overlay");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");
const categories = document.querySelectorAll(".category");
const menuItems = document.querySelectorAll(".menu-item");
const arBtn = document.getElementById("ar-btn");
const enBtn = document.getElementById("en-btn");
const loadingScreen = document.getElementById("loading-screen");

// Language elements with corrected English translations
const languageElements = {
  logo: { ar: "قائمة الطعام", en: "Menu" },
  "restaurant-name": { ar: "مطعم المدينة", en: "City Restaurant" },
  "restaurant-description": {
    ar: "أجود أنواع الطعام العربي والأجنبي بأيدي خبراء الطهي",
    en: "Premium Arabic and international cuisine prepared by expert chefs",
  },
  "all-category": { ar: "الكل", en: "All" },
  "main-category": { ar: "الوجبات الرئيسية", en: "Main Dishes" },
  "appetizers-category": { ar: "المقبلات", en: "Appetizers" },
  "drinks-category": { ar: "المشروبات", en: "Drinks" },
  "desserts-category": { ar: "الحلويات", en: "Desserts" },
  "main-section-title": { ar: "الوجبات الرئيسية", en: "Main Dishes" },
  "appetizers-section-title": { ar: "المقبلات", en: "Appetizers" },
  "drinks-section-title": { ar: "المشروبات", en: "Drinks" },
  "desserts-section-title": { ar: "الحلويات", en: "Desserts" },
  "cart-title": { ar: "سلة التسوق", en: "Shopping Cart" },
  "checkout-btn": { ar: "إنهاء الطلب", en: "Checkout" },
  "loading-logo": { ar: "قائمة الطعام", en: "Menu" },
};

// Menu items translations
const menuItemsTranslations = {
  "كباب مشوي": {
    name: { ar: "كباب مشوي", en: "Grilled Kebab" },
    description: { ar: "لحم ضأن مشوي مع الأرز والخضار", en: "Grilled lamb with rice and vegetables" },
  },
  "مندي دجاج": {
    name: { ar: "مندي دجاج", en: "Chicken Mandi" },
    description: { ar: "دجاج مطبوخ مع الأرز البسمتي", en: "Cooked chicken with basmati rice" },
  },
  "برجر لحم": {
    name: { ar: "برجر لحم", en: "Beef Burger" },
    description: { ar: "برجر لحم مع الجبن والخضار", en: "Beef burger with cheese and vegetables" },
  },
  حمص: {
    name: { ar: "حمص", en: "Hummus" },
    description: { ar: "حمص مع زيت الزيتون", en: "Chickpea dip with olive oil" },
  },
  فلافل: {
    name: { ar: "فلافل", en: "Falafel" },
    description: { ar: "فلافل مقرمشة مع الطحينة", en: "Crispy falafel with tahini" },
  },
  "عصير برتقال": {
    name: { ar: "عصير برتقال", en: "Orange Juice" },
    description: { ar: "عصير برتقال طازج", en: "Fresh orange juice" },
  },
  ليموناضة: {
    name: { ar: "ليموناضة", en: "Lemonade" },
    description: { ar: "ليموناضة منعشة", en: "Refreshing lemonade" },
  },
  كنافة: {
    name: { ar: "كنافة", en: "Kunafa" },
    description: { ar: "كنافة بالقشطة", en: "Kunafa with cream" },
  },
  بقلاوة: {
    name: { ar: "بقلاوة", en: "Baklava" },
    description: { ar: "بقلاوة بالفستق", en: "Baklava with pistachio" },
  },
};

// Cart Data
let cart = [];
let currentLanguage = "ar";
let lastActiveCategory = "all-category";

// Show loading screen initially
setTimeout(() => {
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 500);
}, 1500);

// Event Listeners
if (cartIcon) cartIcon.addEventListener("click", openCart);
if (closeCart) closeCart.addEventListener("click", closeCartModal);
if (overlay) overlay.addEventListener("click", closeCartModal);
if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);

// Add touch event listeners for mobile
if (closeCart) {
  closeCart.addEventListener("touchstart", closeCartModal);
}
if (overlay) {
  overlay.addEventListener("touchstart", closeCartModal);
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", addToCart);
});

// Add event listeners to categories for filtering
categories.forEach((category) => {
  category.addEventListener("click", function () {
    const categoryId = this.getAttribute("data-category");
    filterMenu(categoryId);
  });
});

// Language switcher
arBtn.addEventListener("click", () => switchLanguage("ar"));
enBtn.addEventListener("click", () => switchLanguage("en"));

// Scroll observer for category highlighting
const observerOptions = {
  root: null,
  rootMargin: "-100px 0px -50% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.id;
      const category = sectionId.replace("-section", "-category");
      highlightCategory(category);
      lastActiveCategory = category;
    }
  });

  // If no sections are intersecting (scrolled to top), highlight "All" category
  if (entries.every((entry) => !entry.isIntersecting) && window.scrollY < document.getElementById("main-section").offsetTop - 200) {
    highlightCategory("all-category");
    lastActiveCategory = "all-category";
  }
}, observerOptions);

// Observe all menu sections
document.querySelectorAll(".menu-section").forEach((section) => {
  observer.observe(section);
});

// Track scroll direction for better UX
let lastScrollPosition = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollPosition = window.scrollY;

  // If scrolling up past the first section, highlight "All" category
  if (currentScrollPosition < lastScrollPosition && currentScrollPosition < document.getElementById("main-section").offsetTop - 200) {
    highlightCategory("all-category");
    lastActiveCategory = "all-category";
  }

  lastScrollPosition = currentScrollPosition;
});

// Functions - These are now enhanced versions defined below

function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart-message">
        <div class="empty-cart-icon">🛒</div>
        <p>${currentLanguage === "ar" ? "السلة فارغة" : "Cart is empty"}</p>
        <small>${currentLanguage === "ar" ? "أضف بعض العناصر لتبدأ" : "Add some items to get started"}</small>
      </div>
    `;
    cartTotal.textContent = currentLanguage === "ar" ? "الإجمالي: 0 ج.م" : "Total: 0 SAR";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";
    cartItemElement.style.animationDelay = `${index * 0.1}s`;
    cartItemElement.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-name">${currentLanguage === "ar" ? item.name : menuItemsTranslations[item.name]?.name.en || item.name}</div>
        <div class="cart-item-price">${item.price} ${currentLanguage === "ar" ? "ج.م" : "SAR"}</div>
      </div>
      <div class="cart-item-controls">
        <div class="cart-item-quantity">
          <button class="quantity-btn minus" data-id="${item.id}">-</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn plus" data-id="${item.id}">+</button>
        </div>
        <button class="remove-item-btn" data-id="${item.id}" title="${currentLanguage === "ar" ? "حذف" : "Remove"}">
          <span>×</span>
        </button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemElement);
    total += item.price * item.quantity;

    // Add event listeners to quantity buttons
    cartItemElement.querySelector(".minus").addEventListener("click", (e) => {
      e.target.classList.add('button-pressed');
      setTimeout(() => e.target.classList.remove('button-pressed'), 150);
      updateQuantity(item.id, -1);
    });

    cartItemElement.querySelector(".plus").addEventListener("click", (e) => {
      e.target.classList.add('button-pressed');
      setTimeout(() => e.target.classList.remove('button-pressed'), 150);
      updateQuantity(item.id, 1);
    });

    // Add remove button functionality
    cartItemElement.querySelector(".remove-item-btn").addEventListener("click", (e) => {
      e.target.closest('.cart-item').classList.add('removing');
      setTimeout(() => {
        updateQuantity(item.id, -item.quantity);
      }, 200);
    });
  });

  cartTotal.textContent = currentLanguage === "ar" ? `الإجمالي: ${total} ج.م` : `Total: ${total} SAR`;
}

function updateQuantity(id, change) {
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += change;

    // Remove item if quantity reaches 0
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
    }

    updateCartCount();
    renderCartItems();
  }
}

function checkout() {
  if (cart.length === 0) {
    showNotification(currentLanguage === "ar" ? "السلة فارغة، الرجاء إضافة عناصر قبل إنهاء الطلب" : "Cart is empty, please add items before checkout");
    return;
  }

  // Create WhatsApp message
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let message = currentLanguage === "ar" ? "مرحباً، أريد طلب:\n\n" : "Hello, I want to order:\n\n";

  cart.forEach(item => {
    const itemName = currentLanguage === "ar" ? item.name : menuItemsTranslations[item.name]?.name.en || item.name;
    message += `${itemName} x${item.quantity} = ${item.price * item.quantity} ${currentLanguage === "ar" ? "ج.م" : "SAR"}\n`;
  });

  message += `\n${currentLanguage === "ar" ? "المجموع:" : "Total:"} ${total} ${currentLanguage === "ar" ? "ج.م" : "SAR"}`;

  // WhatsApp number (you can change this)
  const whatsappNumber = "201011389401";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // Open WhatsApp
  window.open(whatsappUrl, '_blank');

  // Clear cart after successful order
  setTimeout(() => {
    cart = [];
    updateCartCount();
    renderCartItems();
    closeCartModal();
    showNotification(currentLanguage === "ar" ? "تم إرسال الطلب عبر واتساب!" : "Order sent via WhatsApp!");
  }, 1000);
}

function showNotification(message, type = 'success') {
  // Remove existing notifications
  document.querySelectorAll('.notification').forEach(n => n.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${icon}</span>
      <span class="notification-text">${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  // Trigger animation
  setTimeout(() => {
    notification.classList.add('notification-show');
  }, 10);

  setTimeout(() => {
    notification.classList.remove('notification-show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

function filterMenu(category) {
  // Update active category
  highlightCategory(`${category}-category`);

  // Scroll to section
  if (category !== "all") {
    const section = document.getElementById(`${category}-section`);
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function highlightCategory(categoryId) {
  categories.forEach((cat) => cat.classList.remove("active"));
  document.getElementById(categoryId).classList.add("active");
}

function updateMenuItemsLanguage(lang) {
  document.querySelectorAll(".menu-item").forEach((item) => {
    const nameElement = item.querySelector(".item-name");
    const descriptionElement = item.querySelector(".item-description");
    const originalName = nameElement.textContent;

    if (menuItemsTranslations[originalName]) {
      nameElement.textContent = menuItemsTranslations[originalName].name[lang];
      descriptionElement.textContent = menuItemsTranslations[originalName].description[lang];
    }
  });
}

function switchLanguage(lang) {
  if (lang === currentLanguage) return;

  currentLanguage = lang;

  // Update UI direction
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;

  // Update language buttons
  arBtn.classList.toggle("active", lang === "ar");
  enBtn.classList.toggle("active", lang === "en");

  // Update all text elements
  for (const [id, translations] of Object.entries(languageElements)) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = translations[lang];
    }
  }

  // Update menu items text
  updateMenuItemsLanguage(lang);

  // Update cart items and total
  renderCartItems();

  // Re-highlight the last active category
  highlightCategory(lastActiveCategory);
}

// Initialize
updateCartCount();

// Floating cart button for mobile
const floatingCartBtn = document.getElementById('floating-cart-btn');
const floatingCartCount = document.getElementById('floating-cart-count');

if (floatingCartBtn) {
  floatingCartBtn.addEventListener('click', openCart);

  // Update floating cart count
  function updateFloatingCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    floatingCartCount.textContent = totalItems;
    floatingCartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    if (totalItems > 0) {
      floatingCartBtn.classList.add('has-items');
    } else {
      floatingCartBtn.classList.remove('has-items');
    }
  }

  // Override updateCartCount to also update floating button
  const originalUpdateCartCount = updateCartCount;
  updateCartCount = function () {
    originalUpdateCartCount();
    updateFloatingCartCount();
  };
}

//header
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Mobile-specific improvements
document.addEventListener("DOMContentLoaded", function () {
  // Close mobile menu when clicking on a nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('show');
    }
  });

  // Enhanced cart modal event listeners for mobile
  const cartCloseBtn = document.getElementById('close-cart');
  const cartOverlay = document.getElementById('overlay');

  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCartModal();
    });

    cartCloseBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCartModal();
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        closeCartModal();
      }
    });

    cartOverlay.addEventListener('touchend', (e) => {
      if (e.target === cartOverlay) {
        e.preventDefault();
        closeCartModal();
      }
    });
  }

  // Prevent cart modal from closing when clicking inside it
  const cartModalElement = document.getElementById('cart-modal');
  if (cartModalElement) {
    cartModalElement.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    cartModalElement.addEventListener('touchend', (e) => {
      e.stopPropagation();
    });
  }

  // Close cart with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal && cartModal.style.display === 'block') {
      closeCartModal();
    }
  });

  // Handle swipe down to close on mobile
  let startY = 0;
  let currentY = 0;

  if (cartModalElement) {
    cartModalElement.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });

    cartModalElement.addEventListener('touchmove', (e) => {
      currentY = e.touches[0].clientY;
      const diff = currentY - startY;

      // Only allow swipe down from the top of the modal
      if (diff > 0 && cartModalElement.scrollTop === 0) {
        e.preventDefault();
        const opacity = Math.max(0.3, 1 - (diff / 200));
        cartOverlay.style.opacity = opacity;
        cartModalElement.style.transform = `translateY(${Math.min(diff, 100)}px)`;
      }
    });

    cartModalElement.addEventListener('touchend', (e) => {
      const diff = currentY - startY;

      if (diff > 100) {
        closeCartModal();
      } else {
        // Reset position
        cartOverlay.style.opacity = '';
        cartModalElement.style.transform = '';
      }
    });
  }

  // Prevent zoom on double tap for iOS
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // Smooth scrolling for category navigation on mobile
  categories.forEach(category => {
    category.addEventListener('click', function () {
      // Add visual feedback
      this.classList.add('category-pressed');
      setTimeout(() => {
        this.classList.remove('category-pressed');
      }, 200);
    });
  });

  // Add animation classes to menu items on scroll
  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all menu items for animation
  document.querySelectorAll('.menu-item').forEach(item => {
    animateOnScroll.observe(item);
  });

  // Add stagger animation to menu items in each section
  document.querySelectorAll('.menu-section').forEach(section => {
    const items = section.querySelectorAll('.menu-item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
    });
  });
});

// Enhanced cart functions for mobile
function openCart() {
  if (!cartModal) return;

  cartModal.classList.add('cart-opening');
  cartModal.style.display = "block";
  if (overlay) overlay.style.display = "block";

  // Prevent body scroll on mobile
  if (window.innerWidth <= 768) {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }

  // Add animation classes
  setTimeout(() => {
    cartModal.classList.add('cart-open');
    if (overlay) overlay.classList.add('overlay-open');
  }, 10);

  renderCartItems();
}

function closeCartModal() {
  if (!cartModal) return;

  // Add closing animation class
  cartModal.classList.add('cart-closing');
  cartModal.classList.remove('cart-open');
  if (overlay) overlay.classList.remove('overlay-open');

  // Restore body scroll and position
  document.body.style.overflow = 'auto';
  document.body.style.position = 'static';
  document.body.style.width = 'auto';

  // Reset any transform from swipe gesture
  cartModal.style.transform = '';
  if (overlay) overlay.style.opacity = '';

  setTimeout(() => {
    cartModal.style.display = "none";
    if (overlay) overlay.style.display = "none";
    cartModal.classList.remove('cart-opening', 'cart-closing');
  }, 300);
}

// Enhanced add to cart with animation
function addToCart(e) {
  const button = e.target;
  const id = button.getAttribute("data-id");
  const name = button.getAttribute("data-name");
  const price = parseFloat(button.getAttribute("data-price"));

  // Add button animation
  button.classList.add('button-pressed');
  setTimeout(() => {
    button.classList.remove('button-pressed');
  }, 200);

  // Check if item already exists in cart
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1,
    });
  }

  updateCartCount();
  renderCartItems();

  // Show enhanced notification
  showNotification(currentLanguage === "ar" ? `${name} تمت إضافته إلى السلة` : `${name} added to cart`);

  // Animate cart icon
  cartIcon.classList.add('cart-bounce');
  setTimeout(() => {
    cartIcon.classList.remove('cart-bounce');
  }, 600);
}
