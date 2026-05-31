// Reviews and Ratings System JavaScript

// DOM Elements
const reviewsSection = document.createElement('section');
reviewsSection.className = 'reviews-section';
reviewsSection.id = 'reviews-section';

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    itemName: 'بيف برجر',
    rating: 5,
    reviewerName: 'أحمد محمد',
    reviewerInitial: 'أ',
    date: '2024-05-20',
    text: 'أفضل برجر تذوقته في حياتي! اللحم طازج جداً والخضروات طازجة. بالتأكيد سأعود مرة أخرى.',
    likes: 24,
    helpful: 18
  },
  {
    id: 2,
    itemName: 'تشيكن برجر',
    rating: 4,
    reviewerName: 'سارة علي',
    reviewerInitial: 'س',
    date: '2024-05-18',
    text: 'برجر الدجاج لذيذ جداً ومقرمش. الخدمة ممتازة والأسعار معقولة.',
    likes: 15,
    helpful: 12
  },
  {
    id: 3,
    itemName: 'مقبلات',
    rating: 5,
    reviewerName: 'محمود حسن',
    reviewerInitial: 'م',
    date: '2024-05-15',
    text: 'المقبلات رائعة! خاصة الحمص والفلافل. الأجواء ممتازة والفرق ودود.',
    likes: 32,
    helpful: 28
  },
  {
    id: 4,
    itemName: 'بيف برجر',
    rating: 4,
    reviewerName: 'نورة أحمد',
    reviewerInitial: 'ن',
    date: '2024-05-12',
    text: 'تجربة رائعة بشكل عام. البرجر لذيذ لكن كان يمكن أن يكون أكبر قليلاً.',
    likes: 8,
    helpful: 5
  },
  {
    id: 5,
    itemName: 'صوصات',
    rating: 5,
    reviewerName: 'خالد عبدالله',
    reviewerInitial: 'خ',
    date: '2024-05-10',
    text: 'الصوصات مذهلة! تنوع كبير وأذواق ممتازة. أنصح الجميع بتجربتها.',
    likes: 19,
    helpful: 16
  }
];

// Item ratings storage
const itemRatings = {
  'beef-burger': { totalRating: 4.6, reviewCount: 128 },
  'chicken-burger': { totalRating: 4.4, reviewCount: 95 },
  'appetizers': { totalRating: 4.8, reviewCount: 67 },
  'sauces': { totalRating: 4.7, reviewCount: 43 }
};

// Initialize reviews section
function initializeReviews() {
  // Load reviews from localStorage or use sample data
  let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  if (reviews.length === 0) {
    reviews = sampleReviews;
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }
  
  renderReviewsSection(reviews);
}

// Render reviews section
function renderReviewsSection(reviews) {
  const overallRating = calculateOverallRating(reviews);
  
  reviewsSection.innerHTML = `
    <div class="container">
      <div class="reviews-header">
        <h2><i class="fas fa-star"></i> تقييمات العملاء</h2>
        <div class="overall-rating">
          <div class="rating-number">${overallRating.average}</div>
          <div class="stars">${generateStars(overallRating.average)}</div>
          <div class="total-reviews">(${overallRating.total} تقييم)</div>
        </div>
        <div class="rating-breakdown">
          ${renderRatingBreakdown(reviews)}
        </div>
      </div>
      
      <div class="reviews-filter">
        <button class="filter-btn active" data-filter="all">الكل</button>
        <button class="filter-btn" data-filter="5">5 نجوم</button>
        <button class="filter-btn" data-filter="4">4 نجوم</button>
        <button class="filter-btn" data-filter="3">3 نجوم</button>
        <button class="filter-btn" data-filter="2">نجمتان</button>
        <button class="filter-btn" data-filter="1">نجمة واحدة</button>
      </div>
      
      <div class="reviews-sort">
        <select id="sort-reviews">
          <option value="recent">الأحدث</option>
          <option value="highest">الأعلى تقييماً</option>
          <option value="lowest">الأقل تقييماً</option>
          <option value="helpful">الأكثر فائدة</option>
        </select>
      </div>
      
      <div id="reviews-container">
        ${reviews.map(review => renderReviewCard(review)).join('')}
      </div>
      
      <button class="add-review-btn" id="add-review-btn">
        <i class="fas fa-plus"></i>
        أضف تقييمك
      </button>
    </div>
  `;
  
  // Add to page
  const menuContainer = document.querySelector('.menu-container') || document.body;
  menuContainer.appendChild(reviewsSection);
  
  // Initialize event listeners
  initializeReviewEventListeners(reviews);
}

// Calculate overall rating
function calculateOverallRating(reviews) {
  if (reviews.length === 0) return { average: 0, total: 0 };
  
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = (total / reviews.length).toFixed(1);
  
  return { average, total: reviews.length };
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHTML = '';
  
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

// Render rating breakdown
function renderRatingBreakdown(reviews) {
  const breakdown = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, percentage };
  });
  
  return breakdown.map(item => `
    <div class="rating-bar">
      <span class="star-label">${item.star} <i class="fas fa-star" style="font-size: 0.8rem; color: #ffc107;"></i></span>
      <div class="progress">
        <div class="progress-bar" style="width: ${item.percentage}%; background: #ffc107;"></div>
      </div>
      <span class="count">${item.count}</span>
    </div>
  `).join('');
}

// Render review card
function renderReviewCard(review) {
  return `
    <div class="review-card" data-rating="${review.rating}">
      <div class="review-header">
        <div class="reviewer-info">
          <div class="reviewer-avatar">${review.reviewerInitial}</div>
          <div>
            <div class="reviewer-name">${review.reviewerName}</div>
            <div class="review-date">${formatDate(review.date)}</div>
          </div>
        </div>
        <div class="review-rating">${generateStars(review.rating)}</div>
      </div>
      <div class="review-item-name">${review.itemName}</div>
      <div class="review-text">${review.text}</div>
      <div class="review-actions">
        <button class="review-action-btn like-btn" data-review-id="${review.id}">
          <i class="far fa-thumbs-up"></i>
          <span>${review.likes}</span>
        </button>
        <button class="review-action-btn helpful-btn" data-review-id="${review.id}">
          <i class="far fa-check-circle"></i>
          <span>مفيد (${review.helpful})</span>
        </button>
        <button class="review-action-btn report-btn" data-review-id="${review.id}">
          <i class="far fa-flag"></i>
          <span>إبلاغ</span>
        </button>
      </div>
    </div>
  `;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('ar-EG', options);
}

// Initialize review event listeners
function initializeReviewEventListeners(reviews) {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('change', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      filterReviews(e.target.dataset.filter, reviews);
    });
  });
  
  // Sort dropdown
  document.getElementById('sort-reviews').addEventListener('change', (e) => {
    sortReviews(e.target.value, reviews);
  });
  
  // Like buttons
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const reviewId = parseInt(e.currentTarget.dataset.reviewId);
      likeReview(reviewId);
    });
  });
  
  // Helpful buttons
  document.querySelectorAll('.helpful-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const reviewId = parseInt(e.currentTarget.dataset.reviewId);
      markHelpful(reviewId);
    });
  });
  
  // Add review button
  document.getElementById('add-review-btn').addEventListener('click', showReviewModal);
}

// Filter reviews
function filterReviews(filter, reviews) {
  const container = document.getElementById('reviews-container');
  let filteredReviews = reviews;
  
  if (filter !== 'all') {
    filteredReviews = reviews.filter(r => r.rating === parseInt(filter));
  }
  
  container.innerHTML = filteredReviews.map(review => renderReviewCard(review)).join('');
}

// Sort reviews
function sortReviews(sortBy, reviews) {
  const container = document.getElementById('reviews-container');
  let sortedReviews = [...reviews];
  
  switch (sortBy) {
    case 'recent':
      sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'highest':
      sortedReviews.sort((a, b) => b.rating - a.rating);
      break;
    case 'lowest':
      sortedReviews.sort((a, b) => a.rating - b.rating);
      break;
    case 'helpful':
      sortedReviews.sort((a, b) => b.helpful - a.helpful);
      break;
  }
  
  container.innerHTML = sortedReviews.map(review => renderReviewCard(review)).join('');
}

// Like review
function likeReview(reviewId) {
  let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const review = reviews.find(r => r.id === reviewId);
  
  if (review) {
    review.likes++;
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    // Update UI
    const btn = document.querySelector(`.like-btn[data-review-id="${reviewId}"]`);
    btn.querySelector('span').textContent = review.likes;
    btn.classList.add('active');
  }
}

// Mark review as helpful
function markHelpful(reviewId) {
  let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  const review = reviews.find(r => r.id === reviewId);
  
  if (review) {
    review.helpful++;
    localStorage.setItem('reviews', JSON.stringify(reviews));
    
    // Update UI
    const btn = document.querySelector(`.helpful-btn[data-review-id="${reviewId}"]`);
    btn.querySelector('span').textContent = `مفيد (${review.helpful})`;
    btn.classList.add('active');
  }
}

// Show review modal
function showReviewModal() {
  const modal = document.createElement('div');
  modal.className = 'review-modal show';
  modal.id = 'review-modal';
  
  modal.innerHTML = `
    <div class="review-modal-content">
      <div class="review-modal-header">
        <h3><i class="fas fa-star"></i> أضف تقييمك</h3>
        <button class="close-modal-btn" id="close-review-modal">×</button>
      </div>
      
      <form id="review-form">
        <div class="form-group">
          <label>اختر الصنف</label>
          <select id="review-item" required>
            <option value="">اختر الصنف</option>
            <option value="beef-burger">بيف برجر</option>
            <option value="chicken-burger">تشيكن برجر</option>
            <option value="appetizers">مقبلات</option>
            <option value="sauces">صوصات</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>التقييم</label>
          <div class="star-rating-input" id="star-rating-input">
            <i class="fas fa-star" data-rating="1"></i>
            <i class="fas fa-star" data-rating="2"></i>
            <i class="fas fa-star" data-rating="3"></i>
            <i class="fas fa-star" data-rating="4"></i>
            <i class="fas fa-star" data-rating="5"></i>
          </div>
          <input type="hidden" id="selected-rating" required>
        </div>
        
        <div class="form-group">
          <label>اسمك</label>
          <input type="text" id="reviewer-name" required>
        </div>
        
        <div class="form-group">
          <label>تقييمك</label>
          <textarea id="review-text" required placeholder="شاركنا رأيك..."></textarea>
        </div>
        
        <button type="submit" class="submit-review-btn">
          <i class="fas fa-paper-plane"></i> إرسال التقييم
        </button>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Initialize modal event listeners
  initializeModalEventListeners();
}

// Initialize modal event listeners
function initializeModalEventListeners() {
  // Close modal
  document.getElementById('close-review-modal').addEventListener('click', () => {
    document.getElementById('review-modal').remove();
  });
  
  // Star rating
  const stars = document.querySelectorAll('#star-rating-input i');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.dataset.rating);
      document.getElementById('selected-rating').value = rating;
      
      stars.forEach((s, index) => {
        if (index < rating) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });
  
  // Form submission
  document.getElementById('review-form').addEventListener('submit', (e) => {
    e.preventDefault();
    submitReview();
  });
}

// Submit review
function submitReview() {
  const itemName = document.getElementById('review-item').value;
  const rating = parseInt(document.getElementById('selected-rating').value);
  const name = document.getElementById('reviewer-name').value;
  const text = document.getElementById('review-text').value;
  
  const itemNames = {
    'beef-burger': 'بيف برجر',
    'chicken-burger': 'تشيكن برجر',
    'appetizers': 'مقبلات',
    'sauces': 'صوصات'
  };
  
  const newReview = {
    id: Date.now(),
    itemName: itemNames[itemName],
    rating: rating,
    reviewerName: name,
    reviewerInitial: name.charAt(0),
    date: new Date().toISOString().split('T')[0],
    text: text,
    likes: 0,
    helpful: 0
  };
  
  // Save review
  let reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
  reviews.unshift(newReview);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  
  // Update item ratings
  if (itemRatings[itemName]) {
    const currentTotal = itemRatings[itemName].totalRating * itemRatings[itemName].reviewCount;
    const newTotal = currentTotal + rating;
    const newCount = itemRatings[itemName].reviewCount + 1;
    itemRatings[itemName].totalRating = (newTotal / newCount).toFixed(1);
    itemRatings[itemName].reviewCount = newCount;
  }
  
  // Close modal
  document.getElementById('review-modal').remove();
  
  // Re-render reviews section
  initializeReviews();
  
  // Show success message
  alert('شكراً لك! تم إرسال تقييمك بنجاح');
}

// Add rating display to menu items
function addItemRatingsToMenu() {
  const menuItems = document.querySelectorAll('.menu-item');
  
  menuItems.forEach(item => {
    const itemId = item.dataset.itemId;
    if (itemRatings[itemId]) {
      const rating = itemRatings[itemId];
      const ratingHTML = `
        <div class="item-rating">
          <span class="stars">${generateStars(rating.totalRating)}</span>
          <span class="rating-count">(${rating.reviewCount})</span>
        </div>
        <button class="rate-item-btn" data-item-id="${itemId}">
          <i class="fas fa-star"></i> قيم هذا الصنف
        </button>
      `;
      
      item.querySelector('.item-details').insertAdjacentHTML('beforeend', ratingHTML);
    }
  });
  
  // Add event listeners to rate buttons
  document.querySelectorAll('.rate-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showReviewModal();
      document.getElementById('review-item').value = btn.dataset.itemId;
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeReviews();
  addItemRatingsToMenu();
});
