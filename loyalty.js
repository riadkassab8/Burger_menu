// Loyalty and Rewards System JavaScript

// Loyalty configuration
const LOYALTY_CONFIG = {
  pointsPerPound: 1, // 1 point for every 1 EGP spent
  pointsForReview: 10, // 10 points for leaving a review
  pointsForReferral: 50, // 50 points for referring a friend
  redemptionRate: 100, // 100 points = 1 EGP discount
  tiers: {
    bronze: { name: 'برونزي', minPoints: 0, discount: 0 },
    silver: { name: 'فضي', minPoints: 500, discount: 5 },
    gold: { name: 'ذهبي', minPoints: 1000, discount: 10 },
    platinum: { name: 'بلاتيني', minPoints: 2000, discount: 15 }
  }
};

// Customer loyalty data structure
class LoyaltySystem {
  constructor() {
    this.customers = this.loadCustomers();
    this.rewards = this.loadRewards();
  }

  // Load customers from localStorage
  loadCustomers() {
    return JSON.parse(localStorage.getItem('loyaltyCustomers') || '{}');
  }

  // Save customers to localStorage
  saveCustomers() {
    localStorage.setItem('loyaltyCustomers', JSON.stringify(this.customers));
  }

  // Load rewards from localStorage
  loadRewards() {
    return JSON.parse(localStorage.getItem('loyaltyRewards') || JSON.stringify(this.getDefaultRewards()));
  }

  // Save rewards to localStorage
  saveRewards() {
    localStorage.setItem('loyaltyRewards', JSON.stringify(this.rewards));
  }

  // Get default rewards
  getDefaultRewards() {
    return [
      { id: 1, name: 'خصم 10 ج.م', points: 1000, description: 'خصم 10 ج.م على طلبك القادم', active: true },
      { id: 2, name: 'وجبة مجانية', points: 5000, description: 'احصل على وجبة بيف برجر مجانية', active: true },
      { id: 3, name: 'مشروب مجاني', points: 300, description: 'مشروب مجاني مع أي وجبة', active: true },
      { id: 4, name: 'خصم 20%', points: 3000, description: 'خصم 20% على الطلب بالكامل', active: true },
      { id: 5, name: 'حجز VIP مجاني', points: 2000, description: 'احجز طاولة VIP مجاناً', active: true }
    ];
  }

  // Get or create customer
  getCustomer(phone) {
    if (!this.customers[phone]) {
      this.customers[phone] = {
        phone: phone,
        points: 0,
        tier: 'bronze',
        totalSpent: 0,
        totalOrders: 0,
        referralCode: this.generateReferralCode(),
        referredBy: null,
        referralCount: 0,
        joinedAt: new Date().toISOString(),
        rewardsRedeemed: []
      };
      this.saveCustomers();
    }
    return this.customers[phone];
  }

  // Generate unique referral code
  generateReferralCode() {
    return 'WB' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // Add points to customer
  addPoints(phone, points, reason) {
    const customer = this.getCustomer(phone);
    customer.points += points;
    customer.history = customer.history || [];
    customer.history.push({
      type: 'earned',
      points: points,
      reason: reason,
      date: new Date().toISOString()
    });
    this.updateTier(customer);
    this.saveCustomers();
    this.showNotification(`تم إضافة ${points} نقطة!`, reason);
  }

  // Deduct points from customer
  deductPoints(phone, points, reason) {
    const customer = this.getCustomer(phone);
    if (customer.points >= points) {
      customer.points -= points;
      customer.history = customer.history || [];
      customer.history.push({
        type: 'redeemed',
        points: -points,
        reason: reason,
        date: new Date().toISOString()
      });
      this.updateTier(customer);
      this.saveCustomers();
      return true;
    }
    return false;
  }

  // Update customer tier based on points
  updateTier(customer) {
    let newTier = 'bronze';
    for (const [tier, config] of Object.entries(LOYALTY_CONFIG.tiers)) {
      if (customer.points >= config.minPoints) {
        newTier = tier;
      }
    }
    if (newTier !== customer.tier) {
      customer.tier = newTier;
      this.showTierUpgradeNotification(newTier);
    }
  }

  // Show tier upgrade notification
  showTierUpgradeNotification(tier) {
    const tierNames = {
      'bronze': 'برونزي',
      'silver': 'فضي',
      'gold': 'ذهبي',
      'platinum': 'بلاتيني'
    };
    this.showNotification(`🎉 تهانينا!`, `لقد وصلت إلى المستوى ${tierNames[tier]}!`);
  }

  // Process order and award points
  processOrder(phone, orderTotal) {
    const pointsEarned = Math.floor(orderTotal * LOYALTY_CONFIG.pointsPerPound);
    const customer = this.getCustomer(phone);
    
    customer.totalSpent += orderTotal;
    customer.totalOrders += 1;
    customer.points += pointsEarned;
    
    customer.history = customer.history || [];
    customer.history.push({
      type: 'earned',
      points: pointsEarned,
      reason: 'شراء',
      orderTotal: orderTotal,
      date: new Date().toISOString()
    });
    
    this.updateTier(customer);
    this.saveCustomers();
    
    return pointsEarned;
  }

  // Award points for review
  awardReviewPoints(phone) {
    this.addPoints(phone, LOYALTY_CONFIG.pointsForReview, 'تقييم');
  }

  // Process referral
  processReferral(referrerPhone, referredPhone) {
    const referrer = this.getCustomer(referrerPhone);
    const referred = this.getCustomer(referredPhone);
    
    if (!referred.referredBy) {
      referred.referredBy = referrerPhone;
      referrer.referralCount += 1;
      
      this.addPoints(referrerPhone, LOYALTY_CONFIG.pointsForReferral, 'إحالة صديق');
      this.addPoints(referredPhone, LOYALTY_CONFIG.pointsForReferral, 'تمت الإحالة');
      
      return true;
    }
    return false;
  }

  // Redeem reward
  redeemReward(phone, rewardId) {
    const customer = this.getCustomer(phone);
    const reward = this.rewards.find(r => r.id === rewardId);
    
    if (!reward || !reward.active) {
      return { success: false, message: 'المكافأة غير متاحة' };
    }
    
    if (customer.points < reward.points) {
      return { success: false, message: 'ليس لديك نقاط كافية' };
    }
    
    if (this.deductPoints(phone, reward.points, reward.name)) {
      customer.rewardsRedeemed.push({
        rewardId: rewardId,
        rewardName: reward.name,
        date: new Date().toISOString()
      });
      this.saveCustomers();
      return { success: true, message: `تم استبدال ${reward.name} بنجاح!` };
    }
    
    return { success: false, message: 'فشل في استبدال المكافأة' };
  }

  // Get customer tier discount
  getTierDiscount(phone) {
    const customer = this.getCustomer(phone);
    return LOYALTY_CONFIG.tiers[customer.tier].discount;
  }

  // Show notification
  showNotification(title, message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'loyalty-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <h4>${title}</h4>
        <p>${message}</p>
        <button class="notification-close">×</button>
      </div>
    `;
    
    // Add styles
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
      z-index: 10000;
      animation: slideDown 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }

  // Get customer stats
  getCustomerStats(phone) {
    const customer = this.getCustomer(phone);
    const tierConfig = LOYALTY_CONFIG.tiers[customer.tier];
    const nextTier = this.getNextTier(customer.tier);
    
    return {
      points: customer.points,
      tier: customer.tier,
      tierName: tierConfig.name,
      tierDiscount: tierConfig.discount,
      totalSpent: customer.totalSpent,
      totalOrders: customer.totalOrders,
      referralCode: customer.referralCode,
      referralCount: customer.referralCount,
      pointsToNextTier: nextTier ? (nextTier.minPoints - customer.points) : 0,
      nextTier: nextTier ? nextTier.name : null,
      availableRewards: this.rewards.filter(r => r.active && r.points <= customer.points)
    };
  }

  // Get next tier
  getNextTier(currentTier) {
    const tiers = Object.keys(LOYALTY_CONFIG.tiers);
    const currentIndex = tiers.indexOf(currentTier);
    if (currentIndex < tiers.length - 1) {
      const nextTierKey = tiers[currentIndex + 1];
      return {
        key: nextTierKey,
        ...LOYALTY_CONFIG.tiers[nextTierKey]
      };
    }
    return null;
  }

  // Get all customers (for admin)
  getAllCustomers() {
    return Object.values(this.customers);
  }

  // Get leaderboard
  getLeaderboard(limit = 10) {
    return Object.values(this.customers)
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);
  }
}

// Initialize loyalty system
const loyaltySystem = new LoyaltySystem();

// Integration with cart system
function integrateLoyaltyWithCart() {
  // Override checkout to award points
  const originalCheckout = window.checkout;
  if (originalCheckout) {
    window.checkout = function() {
      const phone = document.getElementById('customer-phone')?.value;
      const total = parseFloat(document.getElementById('cart-total')?.textContent || 0);
      
      if (phone && total > 0) {
        const pointsEarned = loyaltySystem.processOrder(phone, total);
        console.log(`Earned ${pointsEarned} points from order`);
      }
      
      return originalCheckout.apply(this, arguments);
    };
  }
}

// Add loyalty widget to page
function addLoyaltyWidget() {
  const widget = document.createElement('div');
  widget.className = 'loyalty-widget';
  widget.innerHTML = `
    <div class="loyalty-widget-toggle" id="loyalty-toggle">
      <i class="fas fa-gift"></i>
      <span class="loyalty-points-display" id="loyalty-points-display">0 نقطة</span>
    </div>
    <div class="loyalty-widget-content" id="loyalty-widget-content">
      <div class="loyalty-header">
        <h3><i class="fas fa-crown"></i> برنامج الولاء</h3>
        <button class="loyalty-close" id="loyalty-close">×</button>
      </div>
      <div class="loyalty-body">
        <div class="loyalty-input-group">
          <input type="tel" id="loyalty-phone" placeholder="أدخل رقم هاتفك">
          <button id="loyalty-check-btn">تحقق</button>
        </div>
        <div id="loyalty-customer-info" style="display: none;">
          <div class="loyalty-tier-display">
            <div class="tier-badge" id="tier-badge">برونزي</div>
            <div class="points-display">
              <span class="points-number" id="customer-points">0</span>
              <span class="points-label">نقطة</span>
            </div>
          </div>
          <div class="loyalty-progress">
            <div class="progress-bar">
              <div class="progress-fill" id="tier-progress" style="width: 0%"></div>
            </div>
            <span class="progress-text" id="progress-text">0 نقطة للمستوى التالي</span>
          </div>
          <div class="loyalty-referral">
            <p>كود الإحالة الخاص بك:</p>
            <div class="referral-code" id="referral-code">-</div>
            <button class="copy-referral-btn" id="copy-referral-btn">
              <i class="fas fa-copy"></i> نسخ
            </button>
          </div>
          <div class="loyalty-rewards">
            <h4>المكافآت المتاحة</h4>
            <div id="available-rewards"></div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .loyalty-widget {
      position: fixed;
      bottom: 100px;
      left: 20px;
      z-index: 9998;
    }
    
    .loyalty-widget-toggle {
      background: linear-gradient(135deg, #ff6b6b 0%, #6d4c41 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 5px 20px rgba(255, 107, 107, 0.4);
      transition: all 0.3s;
    }
    
    .loyalty-widget-toggle:hover {
      transform: translateY(-3px);
    }
    
    .loyalty-widget-content {
      display: none;
      position: absolute;
      bottom: 70px;
      left: 0;
      width: 350px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      overflow: hidden;
    }
    
    .loyalty-widget-content.show {
      display: block;
      animation: slideUp 0.3s ease;
    }
    
    .loyalty-header {
      background: linear-gradient(135deg, #ff6b6b 0%, #6d4c41 100%);
      color: white;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .loyalty-header h3 {
      margin: 0;
      font-size: 1.2rem;
    }
    
    .loyalty-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
    }
    
    .loyalty-body {
      padding: 1.5rem;
    }
    
    .loyalty-input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 1rem;
    }
    
    .loyalty-input-group input {
      flex: 1;
      padding: 10px;
      border: 2px solid #ddd;
      border-radius: 10px;
    }
    
    .loyalty-input-group button {
      background: #ff6b6b;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
    }
    
    .loyalty-tier-display {
      text-align: center;
      margin-bottom: 1.5rem;
    }
    
    .tier-badge {
      display: inline-block;
      padding: 5px 15px;
      border-radius: 20px;
      background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
      color: white;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    .points-display {
      font-size: 2rem;
      font-weight: 700;
      color: #ff6b6b;
    }
    
    .points-label {
      font-size: 1rem;
      color: #666;
    }
    
    .loyalty-progress {
      margin-bottom: 1.5rem;
    }
    
    .progress-bar {
      height: 10px;
      background: #e9ecef;
      border-radius: 5px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #ff6b6b, #6d4c41);
      transition: width 0.5s ease;
    }
    
    .progress-text {
      font-size: 0.85rem;
      color: #666;
      margin-top: 5px;
      display: block;
    }
    
    .loyalty-referral {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
    }
    
    .loyalty-referral p {
      margin: 0 0 0.5rem 0;
      font-size: 0.9rem;
      color: #666;
    }
    
    .referral-code {
      font-size: 1.5rem;
      font-weight: 700;
      color: #ff6b6b;
      letter-spacing: 2px;
      margin-bottom: 0.5rem;
    }
    
    .copy-referral-btn {
      background: white;
      border: 2px solid #ff6b6b;
      color: #ff6b6b;
      padding: 5px 15px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 0.9rem;
      transition: all 0.3s;
    }
    
    .copy-referral-btn:hover {
      background: #ff6b6b;
      color: white;
    }
    
    .loyalty-rewards h4 {
      margin-bottom: 1rem;
      color: #333;
    }
    
    .reward-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 10px;
      margin-bottom: 0.5rem;
    }
    
    .reward-info h5 {
      margin: 0;
      font-size: 0.95rem;
    }
    
    .reward-info small {
      color: #666;
    }
    
    .reward-points {
      background: #ff6b6b;
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 0.85rem;
      font-weight: 600;
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
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(widget);
  
  // Initialize widget events
  initializeLoyaltyWidget();
}

// Initialize loyalty widget events
function initializeLoyaltyWidget() {
  const toggle = document.getElementById('loyalty-toggle');
  const content = document.getElementById('loyalty-widget-content');
  const closeBtn = document.getElementById('loyalty-close');
  const checkBtn = document.getElementById('loyalty-check-btn');
  const phoneInput = document.getElementById('loyalty-phone');
  
  toggle.addEventListener('click', () => {
    content.classList.toggle('show');
  });
  
  closeBtn.addEventListener('click', () => {
    content.classList.remove('show');
  });
  
  checkBtn.addEventListener('click', () => {
    const phone = phoneInput.value;
    if (phone) {
      showCustomerLoyaltyInfo(phone);
    }
  });
  
  phoneInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      checkBtn.click();
    }
  });
}

// Show customer loyalty info
function showCustomerLoyaltyInfo(phone) {
  const stats = loyaltySystem.getCustomerStats(phone);
  
  document.getElementById('loyalty-customer-info').style.display = 'block';
  document.getElementById('tier-badge').textContent = stats.tierName;
  document.getElementById('customer-points').textContent = stats.points;
  document.getElementById('referral-code').textContent = stats.referralCode;
  
  // Update progress
  if (stats.nextTier) {
    const progress = ((stats.points - (LOYALTY_CONFIG.tiers[stats.tier].minPoints)) / (stats.pointsToNextTier)) * 100;
    document.getElementById('tier-progress').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `${stats.pointsToNextTier} نقطة للمستوى ${stats.nextTier}`;
  } else {
    document.getElementById('tier-progress').style.width = '100%';
    document.getElementById('progress-text').textContent = 'لقد وصلت لأعلى مستوى!';
  }
  
  // Load available rewards
  const rewardsContainer = document.getElementById('available-rewards');
  if (stats.availableRewards.length > 0) {
    rewardsContainer.innerHTML = stats.availableRewards.map(reward => `
      <div class="reward-item">
        <div class="reward-info">
          <h5>${reward.name}</h5>
          <small>${reward.description}</small>
        </div>
        <div class="reward-points">${reward.points} نقطة</div>
        <button class="action-btn" onclick="redeemReward('${phone}', ${reward.id})">استبدال</button>
      </div>
    `).join('');
  } else {
    rewardsContainer.innerHTML = '<p class="text-muted">لا توجد مكافآت متاحة حالياً</p>';
  }
  
  // Copy referral button
  document.getElementById('copy-referral-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(stats.referralCode);
    alert('تم نسخ كود الإحالة!');
  });
}

// Redeem reward function
function redeemReward(phone, rewardId) {
  const result = loyaltySystem.redeemReward(phone, rewardId);
  if (result.success) {
    alert(result.message);
    showCustomerLoyaltyInfo(phone);
  } else {
    alert(result.message);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  addLoyaltyWidget();
  integrateLoyaltyWithCart();
});

// Export for use in other files
window.loyaltySystem = loyaltySystem;
