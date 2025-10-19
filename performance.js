// Performance Optimization Script

// Debounce function for performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Lazy load images when they come into view
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    }
};

// Optimize scroll performance
const optimizeScroll = () => {
    let ticking = false;

    const updateScrollPosition = () => {
        // Add scroll-based optimizations here
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
};

// Preload critical resources
const preloadCriticalResources = () => {
    // Preload first few images
    const criticalImages = document.querySelectorAll('.menu-item:nth-child(-n+3) img');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
};

// Optimize animations
const optimizeAnimations = () => {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduce-animations');
    }

    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.body.classList.add('paused-animations');
        } else {
            document.body.classList.remove('paused-animations');
        }
    });
};

// Memory management
const cleanupUnusedElements = () => {
    // Remove hidden elements from DOM after animation
    const hiddenElements = document.querySelectorAll('.menu-section[style*="display: none"]');
    hiddenElements.forEach(element => {
        if (element.style.display === 'none') {
            element.style.visibility = 'hidden';
            element.style.position = 'absolute';
            element.style.left = '-9999px';
        }
    });
};

// Initialize performance optimizations
const initPerformanceOptimizations = () => {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            lazyLoadImages();
            optimizeScroll();
            preloadCriticalResources();
            optimizeAnimations();
        });
    } else {
        lazyLoadImages();
        optimizeScroll();
        preloadCriticalResources();
        optimizeAnimations();
    }

    // Cleanup after page load
    window.addEventListener('load', () => {
        setTimeout(cleanupUnusedElements, 1000);
    });
};

// Start optimizations
initPerformanceOptimizations();