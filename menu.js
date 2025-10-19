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
cartIcon.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartModal);
overlay.addEventListener("click", closeCartModal);
checkoutBtn.addEventListener("click", checkout);

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

// Functions
function openCart() {
  cartModal.style.display = "block";
  overlay.style.display = "block";
  renderCartItems();
}

function closeCartModal() {
  cartModal.style.display = "none";
  overlay.style.display = "none";
}

function addToCart(e) {
  const button = e.target;
  const id = button.getAttribute("data-id");
  const name = button.getAttribute("data-name");
  const price = parseFloat(button.getAttribute("data-price"));

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

  // Show a quick notification
  showNotification(currentLanguage === "ar" ? `${name} تمت إضافته إلى السلة` : `${name} added to cart`);
}

function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p>${currentLanguage === "ar" ? "السلة فارغة" : "Cart is empty"}</p>`;
    cartTotal.textContent = currentLanguage === "ar" ? "الإجمالي: 0 ر.س" : "Total: 0 SAR";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";
    cartItemElement.innerHTML = `
               <div class="cart-item-name">${currentLanguage === "ar" ? item.name : menuItemsTranslations[item.name]?.name.en || item.name}</div>
               <div class="cart-item-price">${item.price} ${currentLanguage === "ar" ? "ر.س" : "SAR"}</div>
               <div class="cart-item-quantity">
                   <button class="quantity-btn minus" data-id="${item.id}">-</button>
                   <span class="quantity-value">${item.quantity}</span>
                   <button class="quantity-btn plus" data-id="${item.id}">+</button>
               </div>
           `;

    cartItemsContainer.appendChild(cartItemElement);
    total += item.price * item.quantity;

    // Add event listeners to quantity buttons
    cartItemElement.querySelector(".minus").addEventListener("click", () => {
      updateQuantity(item.id, -1);
    });

    cartItemElement.querySelector(".plus").addEventListener("click", () => {
      updateQuantity(item.id, 1);
    });
  });

  cartTotal.textContent = currentLanguage === "ar" ? `الإجمالي: ${total} ر.س` : `Total: ${total} SAR`;
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
    alert(currentLanguage === "ar" ? "السلة فارغة، الرجاء إضافة عناصر قبل إنهاء الطلب" : "Cart is empty, please add items before checkout");
    return;
  }

  alert(currentLanguage === "ar" ? "تم إنهاء الطلب بنجاح! شكراً لكم." : "Order placed successfully! Thank you.");
  cart = [];
  updateCartCount();
  renderCartItems();
  closeCartModal();
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.right = "20px";
  notification.style.backgroundColor = "#4CAF50";
  notification.style.color = "white";
  notification.style.padding = "10px 20px";
  notification.style.borderRadius = "4px";
  notification.style.zIndex = "1000";
  notification.style.animation = "fadeIn 0.5s, fadeOut 0.5s 2.5s";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
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
//header
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});
