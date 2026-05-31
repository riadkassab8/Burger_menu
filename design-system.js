// Design System JavaScript - Animations and Interactions

// Intersection Observer for section fade animations
document.addEventListener('DOMContentLoaded', () => {
  // Section fade animations
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections with section-fade class
  document.querySelectorAll('.section-fade').forEach(section => {
    sectionObserver.observe(section);
  });

  // Stagger animation for menu cards
  const menuCards = document.querySelectorAll('.category-card, .menu-item');
  menuCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.08}s`;
    card.classList.add('section-fade');
    sectionObserver.observe(card);
  });

  // Header scroll effect
  const header = document.querySelector('.modern-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Add to cart button animation
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const originalText = this.innerHTML;
      const originalBg = this.style.background;
      
      this.innerHTML = '<i class="fas fa-check"></i> تمت الإضافة';
      this.style.background = '#2D8A4E';
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.background = originalBg;
      }, 1500);
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Export for use in other files
window.designSystem = {
  animateSection: (element) => {
    element.classList.add('in-view');
  }
};
