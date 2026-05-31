// Reservation System JavaScript

// DOM Elements
const reservationForm = document.getElementById('reservation-form');
const dateInput = document.getElementById('reservation-date');
const timeSlotsContainer = document.getElementById('time-slots');
const selectedTimeInput = document.getElementById('selected-time');
const tableTypeCards = document.querySelectorAll('.table-type-card');
const selectedTableTypeInput = document.getElementById('selected-table-type');
const confirmationModal = document.getElementById('confirmation-modal');
const reservationDetails = document.getElementById('reservation-details');
const loadingScreen = document.getElementById('loading-screen');

// Time slots configuration
const timeSlots = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
];

// Initialize date input with minimum date (today)
function initializeDateInput() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const minDate = tomorrow.toISOString().split('T')[0];
  dateInput.min = minDate;
  dateInput.value = minDate;
  
  generateTimeSlots(minDate);
}

// Generate time slots based on selected date
function generateTimeSlots(date) {
  timeSlotsContainer.innerHTML = '';
  
  const selectedDate = new Date(date);
  const dayOfWeek = selectedDate.getDay();
  
  // Check if it's Friday (day 5 in JS)
  const isFriday = dayOfWeek === 5;
  
  timeSlots.forEach(time => {
    const slot = document.createElement('div');
    slot.className = 'time-slot';
    slot.textContent = time;
    
    // Disable some slots based on day
    if (isFriday) {
      slot.classList.add('disabled');
      slot.title = 'مغلق يوم الجمعة';
    } else {
      slot.addEventListener('click', () => selectTimeSlot(slot, time));
    }
    
    timeSlotsContainer.appendChild(slot);
  });
}

// Select time slot
function selectTimeSlot(slot, time) {
  // Remove selected class from all slots
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  
  // Add selected class to clicked slot
  slot.classList.add('selected');
  selectedTimeInput.value = time;
}

// Table type selection
tableTypeCards.forEach(card => {
  card.addEventListener('click', () => {
    tableTypeCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    selectedTableTypeInput.value = card.dataset.type;
  });
});

// Handle form submission
reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate all fields
  if (!validateForm()) {
    alert('يرجى ملء جميع الحقول المطلوبة');
    return;
  }
  
  // Get form data
  const reservationData = {
    name: document.getElementById('customer-name').value,
    phone: document.getElementById('customer-phone').value,
    email: document.getElementById('customer-email').value,
    branch: document.getElementById('branch-select').value,
    date: document.getElementById('reservation-date').value,
    time: selectedTimeInput.value,
    guests: document.getElementById('guests-count').value,
    tableType: selectedTableTypeInput.value,
    specialRequests: document.getElementById('special-requests').value,
    reservationId: generateReservationId()
  };
  
  // Save reservation to localStorage
  saveReservation(reservationData);
  
  // Show confirmation modal
  showConfirmation(reservationData);
  
  // Reset form
  reservationForm.reset();
  selectedTimeInput.value = '';
  selectedTableTypeInput.value = '';
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  tableTypeCards.forEach(c => c.classList.remove('selected'));
  
  // Reinitialize date
  initializeDateInput();
});

// Validate form
function validateForm() {
  const name = document.getElementById('customer-name').value;
  const phone = document.getElementById('customer-phone').value;
  const branch = document.getElementById('branch-select').value;
  const date = document.getElementById('reservation-date').value;
  const time = selectedTimeInput.value;
  const guests = document.getElementById('guests-count').value;
  const tableType = selectedTableTypeInput.value;
  
  return name && phone && branch && date && time && guests && tableType;
}

// Generate unique reservation ID
function generateReservationId() {
  return 'RES' + Date.now().toString(36).toUpperCase();
}

// Save reservation to localStorage
function saveReservation(data) {
  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  reservations.push({
    ...data,
    createdAt: new Date().toISOString(),
    status: 'confirmed'
  });
  localStorage.setItem('reservations', JSON.stringify(reservations));
}

// Show confirmation modal
function showConfirmation(data) {
  const branchNames = {
    'nasr-city': 'مدينة نصر',
    'heliopolis': 'مصر الجديدة'
  };
  
  const tableTypeNames = {
    'indoor': 'داخل المطعم',
    'outdoor': 'في الخارج',
    'vip': 'VIP'
  };
  
  reservationDetails.innerHTML = `
    <p><strong>رقم الحجز:</strong> ${data.reservationId}</p>
    <p><strong>الاسم:</strong> ${data.name}</p>
    <p><strong>الفرع:</strong> ${branchNames[data.branch]}</p>
    <p><strong>التاريخ:</strong> ${formatDate(data.date)}</p>
    <p><strong>الوقت:</strong> ${data.time}</p>
    <p><strong>عدد الضيوف:</strong> ${data.guests}</p>
    <p><strong>نوع الطاولة:</strong> ${tableTypeNames[data.tableType]}</p>
  `;
  
  confirmationModal.classList.add('show');
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('ar-EG', options);
}

// Close modal
function closeModal() {
  confirmationModal.classList.remove('show');
  window.location.href = 'index.html';
}

// Date change handler
dateInput.addEventListener('change', (e) => {
  generateTimeSlots(e.target.value);
});

// Hide loading screen
setTimeout(() => {
  loadingScreen.style.opacity = '0';
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 500);
}, 1000);

// Initialize
initializeDateInput();
