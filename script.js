let currentLang = "ar";

// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sample menu items for cart functionality
const menuItems = {
  "beef-burger": {
    id: "beef-burger",
    name: { ar: "بيف برجر", en: "Beef Burger" },
    price: 45,
    image:
      "https://menuoprohub.top/wahedburger/332dd7f9-373e-475c-b342-2e682f8707ee/categories/1757530627508-61330e87-77a5-4af8-888f-fa85a8f78c86.webp",
  },
  "chicken-burger": {
    id: "chicken-burger",
    name: { ar: "تشيكن برجر", en: "Chicken Burger" },
    price: 40,
    image:
      "https://menuoprohub.top/wahedburger/332dd7f9-373e-475c-b342-2e682f8707ee/categories/1757530651937-5592ef97-b8e9-4dcc-8d26-bcd807166028.webp",
  },
  appetizers: {
    id: "appetizers",
    name: { ar: "مقبلات", en: "Appetizers" },
    price: 25,
    image:
      "https://menuoprohub.top/wahedburger/332dd7f9-373e-475c-b342-2e682f8707ee/categories/1757530706639-3849fcac-d03e-4f46-9685-167b6f2314a6.webp",
  },
  sauces: {
    id: "sauces",
    name: { ar: "صوصات", en: "Sauces" },
    price: 15,
    image:
      "https://menuoprohub.top/wahedburger/332dd7f9-373e-475c-b342-2e682f8707ee/categories/1757530794434-8031938c-e961-4b13-b626-e0af98f91c07.webp",
  },
};

function addToCart(itemId) {
  const item = menuItems[itemId];
  if (!item) return;

  const existingItem = cart.find((cartItem) => cartItem.id === itemId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: itemId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  }

  updateCartDisplay();
  saveCart();
  showCartNotification();
}

function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  updateCartDisplay();
  saveCart();
}

function updateQuantity(itemId, change) {
  const item = cart.find((cartItem) => cartItem.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartDisplay();
      saveCart();
    }
  }
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "flex" : "none";
  }

  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p><span data-ar="سلة التسوق فارغة" data-en="Your cart is empty">سلة التسوق فارغة</span></p>
                </div>
            `;
    } else {
      cartItems.innerHTML = cart
        .map(
          (item) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name[currentLang]}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name[currentLang]}</div>
                        <div class="cart-item-price">${item.price} <span data-ar="جنيه" data-en="EGP">جنيه</span></div>
                    </div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                        <button class="remove-item" onclick="removeFromCart('${item.id}')" title="Remove">×</button>
                    </div>
                </div>
            `
        )
        .join("");
    }
  }

  if (cartTotal) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = total;
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function showCartNotification() {
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.style.animation = "cartBounce 0.3s ease";
    setTimeout(() => {
      cartBtn.style.animation = "";
    }, 300);
  }
}

function toggleCart() {
  const cartDropdown = document.getElementById("cartDropdown");
  if (cartDropdown) {
    cartDropdown.classList.toggle("show");
  }
}

function closeCart() {
  const cartDropdown = document.getElementById("cartDropdown");
  if (cartDropdown) {
    cartDropdown.classList.remove("show");
  }
}

function checkout() {
  if (cart.length === 0) return;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderText = cart.map((item) => `${item.name[currentLang]} x${item.quantity} = ${item.price * item.quantity} جنيه`).join("\n");

  const message = `${currentLang === "ar" ? "مرحبا، أريد طلب:" : "Hello, I want to order:"}\n\n${orderText}\n\n${
    currentLang === "ar" ? "المجموع:" : "Total:"
  } ${total} ${currentLang === "ar" ? "جنيه" : "EGP"}`;

  const whatsappNumber = "201011389401"; // Replace with actual WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("foodCarousel");
  if (carousel) {
    const bsCarousel = new bootstrap.Carousel(carousel, {
      interval: 3000,
      ride: "carousel",
      wrap: true,
    });
  }

  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", toggleLanguage);
  }

  // Cart event listeners
  const cartBtn = document.getElementById("cartBtn");
  if (cartBtn) {
    cartBtn.addEventListener("click", toggleCart);
  }

  const closeCartBtn = document.getElementById("closeCart");
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCart);
  }

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkout);
  }

  // Close cart when clicking outside
  document.addEventListener("click", function (e) {
    const cartDropdown = document.getElementById("cartDropdown");
    const cartSection = document.querySelector(".cart-section");
    if (cartDropdown && cartSection && !cartSection.contains(e.target)) {
      closeCart();
    }
  });

  // Initialize cart display
  updateCartDisplay();

  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.classList.add("clicked");
      setTimeout(() => {
        this.classList.remove("clicked");
      }, 300);
    });
  });

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  categoryCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });

  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateX(30px)";
    card.style.transition = "all 0.8s ease";
    observer.observe(card);
  });

  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "scale(0.9)";
    item.style.transition = `all 0.5s ease ${index * 0.1}s`;
    observer.observe(item);
  });
});

function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";

  const langOptions = document.querySelectorAll(".lang-option");
  langOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.lang === currentLang);
  });

  const htmlElement = document.documentElement;
  if (currentLang === "en") {
    htmlElement.setAttribute("lang", "en");
    htmlElement.setAttribute("dir", "ltr");
  } else {
    htmlElement.setAttribute("lang", "ar");
    htmlElement.setAttribute("dir", "rtl");
  }

  const translatableElements = document.querySelectorAll("[data-ar][data-en]");
  translatableElements.forEach((element) => {
    element.style.transition = "opacity 0.3s ease";
    element.style.opacity = "0";

    setTimeout(() => {
      element.textContent = element.dataset[currentLang];
      element.style.opacity = "1";
    }, 150);
  });

  localStorage.setItem("preferredLang", currentLang);
}

window.addEventListener("load", function () {
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang && savedLang !== currentLang) {
    toggleLanguage();
  }
});
//// menu
