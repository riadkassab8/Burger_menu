// Simple Cart System
let cart = [];
let cartCount = 0;

// Update cart counters
function updateCartCounters() {
    const headerCount = document.getElementById('cart-count');
    const floatingCount = document.getElementById('floating-cart-count');

    if (headerCount) headerCount.textContent = cartCount;
    if (floatingCount) floatingCount.textContent = cartCount;
}

// Add item to cart
function addToCart(id, name, price) {
    console.log('Adding to cart:', { id, name, price });

    // Add item to cart array
    cart.push({
        id: id,
        name: name,
        price: parseFloat(price),
        quantity: 1
    });

    cartCount++;
    updateCartCounters();

    // Show success message
    showMessage(`تم إضافة "${name}" للسلة!`);

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCount', cartCount);

    console.log('Cart contents:', cart);
}

// Show cart contents
function showCart() {
    if (cart.length === 0) {
        alert('السلة فارغة! أضف بعض المنتجات أولاً.');
        return;
    }

    let total = 0;
    let message = 'محتويات السلة:\n\n';

    cart.forEach((item, i) => {
        message += `${i + 1}. ${item.name} - ${item.price} ج.م\n`;
        total += item.price;
    });

    message += `\nالمجموع الكلي: ${total} ج.م`;

    if (confirm(message + '\n\nهل تريد إتمام الشراء؟')) {
        alert(`شكراً لك! تم تأكيد طلبك بقيمة ${total} ج.م\nسيتم التواصل معك قريباً.`);

        // Clear cart
        cart = [];
        cartCount = 0;
        updateCartCounters();

        // Clear localStorage
        localStorage.removeItem('cart');
        localStorage.removeItem('cartCount');
    }
}

// Show success message
function showMessage(text) {
    const message = document.createElement('div');
    message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    padding: 15px 25px;
    border-radius: 25px;
    z-index: 99999;
    font-weight: 600;
    font-size: 14px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
  `;
    message.textContent = text;

    document.body.appendChild(message);

    // Show message
    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);

    // Hide message after 3 seconds
    setTimeout(() => {
        message.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// Load saved cart
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    const savedCount = localStorage.getItem('cartCount');

    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    if (savedCount) {
        cartCount = parseInt(savedCount);
        updateCartCounters();
    }
}

// Initialize cart system
document.addEventListener('DOMContentLoaded', function () {
    console.log('🛒 Initializing cart system...');

    // Load saved cart
    loadCart();

    // Add event listeners to add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log(`Found ${addToCartButtons.length} add-to-cart buttons`);

    addToCartButtons.forEach((button, index) => {
        button.onclick = function (e) {
            e.preventDefault();

            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');

            console.log(`Button ${index + 1} clicked:`, { id, name, price });

            // Visual feedback
            this.style.background = '#28a745';
            this.style.color = 'white';
            this.textContent = 'تم الإضافة! ✅';

            // Add to cart
            addToCart(id, name, price);

            // Reset button after 2 seconds
            setTimeout(() => {
                this.style.background = '';
                this.style.color = '';
                this.textContent = 'إضافة إلى السلة';
            }, 2000);
        };
    });

    // Add event listeners to cart icons
    const headerCartIcon = document.getElementById('cart-icon');
    const floatingCartBtn = document.getElementById('floating-cart-btn');

    if (headerCartIcon) {
        headerCartIcon.onclick = function (e) {
            e.preventDefault();
            console.log('Header cart clicked');
            showCart();
        };
    }

    if (floatingCartBtn) {
        floatingCartBtn.onclick = function (e) {
            e.preventDefault();
            console.log('Floating cart clicked');
            showCart();
        };
    }

    console.log('✅ Cart system initialized successfully!');
});

// Backup initialization after 2 seconds
setTimeout(() => {
    console.log('🔧 Backup cart initialization...');

    // Ensure buttons work
    document.querySelectorAll('.add-to-cart').forEach((btn, i) => {
        if (!btn.onclick) {
            btn.onclick = function () {
                const id = this.getAttribute('data-id') || i + 1;
                const name = this.getAttribute('data-name') || `Product ${i + 1}`;
                const price = this.getAttribute('data-price') || '10';

                this.style.background = '#ffc107';
                this.textContent = 'تم الإضافة!';

                addToCart(id, name, price);

                setTimeout(() => {
                    this.style.background = '';
                    this.textContent = 'إضافة إلى السلة';
                }, 2000);
            };
        }
    });

    // Ensure cart icons work
    const headerCart = document.getElementById('cart-icon');
    const floatingCart = document.getElementById('floating-cart-btn');

    if (headerCart && !headerCart.onclick) {
        headerCart.onclick = showCart;
    }

    if (floatingCart && !floatingCart.onclick) {
        floatingCart.onclick = showCart;
    }

    console.log('✅ Backup initialization complete!');
}, 2000);