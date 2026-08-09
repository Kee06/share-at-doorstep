document.addEventListener('DOMContentLoaded', () => {
 
  // Global State
  const state = {
    location: '',
    selectedService: {
      id: 'courier',
      title: 'Light Pickup (via Courier)',
      price: 1249
    },
    items: [
      { id: 'clothes', name: 'Clothes', icon: 'fa-shirt', subtext: '', qty: 0, weightPerUnit: 20 },
      { id: 'footwear', name: 'Footwear', icon: 'fa-shoe-prints', subtext: '', qty: 0, weightPerUnit: 20 },
      { id: 'stationery', name: 'Stationery', icon: 'fa-pencil', subtext: '', qty: 0, weightPerUnit: 15 },
      { id: 'toys', name: 'Toys', icon: 'fa-robot', subtext: '', qty: 0, weightPerUnit: 15 },
      { id: 'books', name: 'Books', icon: 'fa-book', subtext: 'Fiction, Non-fiction, Self-help, Educational', qty: 0, weightPerUnit: 20 },
      { id: 'groceries', name: '1KG Of Dry Groceries', icon: 'fa-bowl-rice', subtext: 'Must be well stored, bug free and not expired', qty: 0, weightPerUnit: 10 }
    ],
    selectedDate: '10th Aug - 13th Aug',
    notes: '',
    donor: {
      name: '',
      email: '',
      flat: '',
      address: '',
      city: '',
      pincode: '',
      mobile: ''
    },
    promoApplied: false,
    discount: 0,
    generatedOtp: ''
  };
 
  let itemToApprove = null;
 
  // DOM Elements
  const locationForm = document.getElementById('locationForm');
  const locationInput = document.getElementById('locationInput');
  const autoDetectBtn = document.getElementById('autoDetectBtn');
  const userLocDisplay = document.getElementById('userLocDisplay');
  const changeLocLink = document.getElementById('changeLocLink');
 
  const itemsContainer = document.getElementById('itemsContainer');
  const capacityValue = document.getElementById('capacityValue');
 
  const datePillsContainer = document.getElementById('datePillsContainer');
  const pickupNotes = document.getElementById('pickupNotes');
 
  const donorName = document.getElementById('donorName');
  const donorEmail = document.getElementById('donorEmail');
  const donorFlat = document.getElementById('donorFlat');
  const donorAddress = document.getElementById('donorAddress');
  const donorCity = document.getElementById('donorCity');
  const donorPincode = document.getElementById('donorPincode');
  const termsCheck = document.getElementById('termsCheck');
 
  const promoInput = document.getElementById('promoInput');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoMessage = document.getElementById('promoMessage');
 
  const summaryItemsList = document.getElementById('summaryItemsList');
  const selectedServiceTitle = document.getElementById('selectedServiceTitle');
  const selectedServicePrice = document.getElementById('selectedServicePrice');
 
  const mobileNumberInput = document.getElementById('mobileNumberInput');
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const otpSection = document.getElementById('otpSection');
  const otpInput = document.getElementById('otpInput');
  const otpSentHint = document.getElementById('otpSentHint');
  const verifyAndPayBtn = document.getElementById('verifyAndPayBtn');
 
  const packagingModal = document.getElementById('packagingModal');
  const agreeChecklistBtn = document.getElementById('agreeChecklistBtn');
  const closeChecklistBtn = document.getElementById('closeChecklistBtn');
 
  const razorpayModal = document.getElementById('razorpayModal');
  const closeRzpBtn = document.getElementById('closeRzpBtn');
  const simulatePaymentTrigger = document.getElementById('simulatePaymentTrigger');
  const directPlaceOrderBtn = document.getElementById('directPlaceOrderBtn');
  const confirmOrderBypassBtn = document.getElementById('confirmOrderBypassBtn');
  const rzpPriceSummary = document.getElementById('rzpPriceSummary');
 
  // --- STEP NAVIGATION ---
  window.goToStep = function(stepNum) {
    document.querySelectorAll('.step-page').forEach(page => page.classList.remove('active-page'));
 
    for (let i = 1; i <= 5; i++) {
      const tab = document.getElementById(`step-tab-${i}`);
      if (!tab) continue;
      tab.classList.remove('active', 'completed');
      if (i < stepNum) {
        tab.classList.add('completed');
      } else if (i === stepNum) {
        tab.classList.add('active');
      }
    }
 
    if (stepNum === 1) {
      if (!state.location) {
        document.getElementById('page-location').classList.add('active-page');
      } else {
        document.getElementById('page-service').classList.add('active-page');
      }
    } else if (stepNum === 2) {
      renderItemsList();
      document.getElementById('page-donation-details').classList.add('active-page');
    } else if (stepNum === 3) {
      renderScheduleSummary();
      document.getElementById('page-schedule').classList.add('active-page');
    } else if (stepNum === 4) {
      document.getElementById('page-verification').classList.add('active-page');
    } else if (stepNum === 5) {
      renderSuccessScreen();
      document.getElementById('page-success').classList.add('active-page');
    }
  };
 
  // --- STEP 1: LOCATION HANDLERS ---
  locationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = locationInput.value.trim();
    if (val) {
      setLocation(val);
    }
  });
 
  autoDetectBtn.addEventListener('click', () => {
    setLocation('Trivandrum, Kerala, India');
  });
 
  function setLocation(loc) {
    state.location = loc;
    userLocDisplay.textContent = loc;
    donorCity.value = loc.split(',')[0] || '';
    goToStep(1);
  }
 
  changeLocLink.addEventListener('click', (e) => {
    e.preventDefault();
    state.location = '';
    document.querySelectorAll('.step-page').forEach(p => p.classList.remove('active-page'));
    document.getElementById('page-location').classList.add('active-page');
  });
 
  // Service Selection Radio Event
  document.querySelectorAll('input[name="pickupService"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const target = e.target;
      state.selectedService.id = target.value;
      state.selectedService.title = target.getAttribute('data-title');
      state.selectedService.price = parseInt(target.getAttribute('data-price'), 10);
    });
  });
 
  document.getElementById('proceedToDetailsBtn').addEventListener('click', () => {
    goToStep(2);
  });
 
  // --- STEP 2: DYNAMIC ITEMS & BAG CAPACITY ---
  function calculateCapacity() {
    const totalCap = state.items.reduce((sum, item) => sum + (item.qty * item.weightPerUnit), 0);
    return Math.min(totalCap, 100);
  }
 
  function renderItemsList() {
    itemsContainer.innerHTML = '';
 
    state.items.forEach(item => {
      const row = document.createElement('div');
      row.className = `item-row ${item.qty > 0 ? 'has-qty' : ''}`;
 
      const actionHTML = item.qty > 0
        ? `<div class="qty-controls">
            <button type="button" class="qty-btn" onclick="updateItemQty('${item.id}', -1)">-</button>
            <span class="qty-count">${item.qty}</span>
            <button type="button" class="qty-btn" onclick="updateItemQty('${item.id}', 1)">+</button>
           </div>`
        : `<button type="button" class="add-btn" onclick="promptAddItem('${item.id}')">ADD +</button>`;
 
      row.innerHTML = `
        <div class="item-info">
          <i class="fa-solid ${item.icon} item-icon"></i>
          <div>
            <span>${item.name}</span>
            ${item.subtext ? `<p class="subtext">${item.subtext}</p>` : ''}
          </div>
        </div>
        ${actionHTML}
      `;
      itemsContainer.appendChild(row);
    });
 
    const cap = calculateCapacity();
    capacityValue.textContent = `${cap}%`;
  }
 
  window.promptAddItem = function(itemId) {
    if (calculateCapacity() >= 100) {
      alert('Maximum capacity reached (8 Kgs / 100%). Please proceed to the next step.');
      return;
    }
    itemToApprove = itemId;
    packagingModal.classList.add('active');
  };
 
  window.updateItemQty = function(itemId, delta) {
    const item = state.items.find(i => i.id === itemId);
    if (!item) return;
 
    if (delta > 0 && calculateCapacity() >= 100) {
      alert('Bag capacity is already full (100%).');
      return;
    }
 
    item.qty = Math.max(0, item.qty + delta);
    renderItemsList();
  };
 
  agreeChecklistBtn.addEventListener('click', () => {
    packagingModal.classList.remove('active');
    if (itemToApprove) {
      const item = state.items.find(i => i.id === itemToApprove);
      if (item) {
        item.qty += 1;
        renderItemsList();
      }
      itemToApprove = null;
    }
  });
 
  closeChecklistBtn.addEventListener('click', () => {
    packagingModal.classList.remove('active');
    itemToApprove = null;
  });
 
  document.getElementById('proceedToScheduleBtn').addEventListener('click', () => {
    const totalItems = state.items.reduce((acc, i) => acc + i.qty, 0);
    if (totalItems === 0) {
      alert('Please add at least one donation item to proceed!');
      return;
    }
    goToStep(3);
  });
 
  // --- STEP 3: SCHEDULE & DONOR FORM ---
  datePillsContainer.querySelectorAll('.date-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      datePillsContainer.querySelectorAll('.date-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.selectedDate = pill.getAttribute('data-date');
    });
  });
 
  applyPromoBtn.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();
    if (code === 'SADS50' || code === 'DONATE50') {
      state.promoApplied = true;
      state.discount = 50;
      promoMessage.className = 'promo-msg success';
      promoMessage.textContent = 'Promo code applied! ₹50 discount added.';
    } else {
      state.promoApplied = false;
      state.discount = 0;
      promoMessage.className = 'promo-msg error';
      promoMessage.textContent = 'Invalid promo code. Try "SADS50".';
    }
    renderScheduleSummary();
  });
 
  function renderScheduleSummary() {
    summaryItemsList.innerHTML = '';
    const selectedItems = state.items.filter(i => i.qty > 0);
 
    selectedItems.forEach(i => {
      const row = document.createElement('div');
      row.className = 'summary-row';
      row.innerHTML = `<span>${i.name}</span><span>x${i.qty}</span>`;
      summaryItemsList.appendChild(row);
    });
 
    const finalPrice = Math.max(0, state.selectedService.price - state.discount);
    selectedServiceTitle.innerHTML = `<i class="fa-solid fa-cube"></i> ${state.selectedService.title} - Fee<br><small>(Incl. all Taxes)</small>`;
    selectedServicePrice.textContent = `₹${finalPrice}/-`;
  }
 
  document.getElementById('proceedToVerifyBtn').addEventListener('click', () => {
    state.donor.name = donorName.value.trim();
    state.donor.email = donorEmail.value.trim();
    state.donor.flat = donorFlat.value.trim();
    state.donor.address = donorAddress.value.trim();
    state.donor.city = donorCity.value.trim();
    state.donor.pincode = donorPincode.value.trim();
    state.notes = pickupNotes.value.trim();
 
    if (!state.donor.name || !state.donor.email || !state.donor.flat || !state.donor.address || !state.donor.city || !state.donor.pincode) {
      alert('Please fill out all mandatory donor details.');
      return;
    }
 
    if (!termsCheck.checked) {
      alert('Please agree to the Terms of Use.');
      return;
    }
 
    goToStep(4);
  });
 
  // --- STEP 4: VERIFICATION & OTP ---
  sendOtpBtn.addEventListener('click', () => {
    const num = mobileNumberInput.value.trim();
    if (!/^\d{10}$/.test(num)) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
 
    state.donor.mobile = num;
    state.generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
 
    otpSection.classList.remove('disabled-section');
    otpInput.disabled = false;
    otpInput.value = '';
    otpSentHint.textContent = `OTP sent to +91 ${num}. (Test OTP: ${state.generatedOtp})`;
 
    verifyAndPayBtn.disabled = true;
    verifyAndPayBtn.classList.remove('ready');
  });
 
  otpInput.addEventListener('input', () => {
    if (otpInput.value.trim() === state.generatedOtp) {
      verifyAndPayBtn.disabled = false;
      verifyAndPayBtn.classList.add('ready');
    } else {
      verifyAndPayBtn.disabled = true;
      verifyAndPayBtn.classList.remove('ready');
    }
  });
 
  verifyAndPayBtn.addEventListener('click', () => {
    const finalPrice = Math.max(0, state.selectedService.price - state.discount);
    rzpPriceSummary.textContent = `₹${finalPrice.toLocaleString()}`;
    razorpayModal.classList.add('active');
  });
 
  // --- ORDER PLACEMENT TRIGGERS ---
  closeRzpBtn.addEventListener('click', () => {
    razorpayModal.classList.remove('active');
  });
 
  // Trigger 1: Direct Sidebar Order Button
  if (directPlaceOrderBtn) {
    directPlaceOrderBtn.addEventListener('click', () => {
      razorpayModal.classList.remove('active');
      goToStep(5);
    });
  }
 
  // Trigger 2: Direct Green Confirmation Button
  if (confirmOrderBypassBtn) {
    confirmOrderBypassBtn.addEventListener('click', () => {
      razorpayModal.classList.remove('active');
      goToStep(5);
    });
  }
 
  // Trigger 3: Clicking the QR code directly
  if (simulatePaymentTrigger) {
    simulatePaymentTrigger.addEventListener('click', () => {
      razorpayModal.classList.remove('active');
      goToStep(5);
    });
  }
 
  // --- SAVE TO DATABASE ---
  async function savePickupToDatabase(refNum, finalPrice) {
    try {
      const response = await fetch('/api/pickups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location: state.location,
          service: state.selectedService,
          items: state.items
            .filter(i => i.qty > 0)
            .map(i => ({ id: i.id, name: i.name, qty: i.qty })),
          selectedDate: state.selectedDate,
          notes: state.notes,
          donor: state.donor,
          finalPrice: finalPrice,
          orderRef: refNum
        })
      });
 
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
 
      const data = await response.json();
      console.log('Pickup saved to database:', data);
    } catch (err) {
      console.error('Error saving pickup:', err);
    }
  }
 
  function renderSuccessScreen() {
    const refNum = '#SADS-' + Math.floor(1000 + Math.random() * 9000);
    document.getElementById('successRefNum').textContent = refNum;
 
    const finalPrice = Math.max(0, state.selectedService.price - state.discount);
    const selectedItemsStr = state.items.filter(i => i.qty > 0).map(i => `${i.name} (x${i.qty})`).join(', ');
 
    const detailsContainer = document.getElementById('orderSummaryDetails');
    detailsContainer.innerHTML = `
      <p><strong>Donor Name:</strong> ${state.donor.name}</p>
      <p><strong>Mobile:</strong> +91 ${state.donor.mobile}</p>
      <p><strong>Pickup Slot:</strong> ${state.selectedDate}</p>
      <p><strong>Address:</strong> ${state.donor.flat}, ${state.donor.address}, ${state.donor.city} - ${state.donor.pincode}</p>
      <p><strong>Donation Items:</strong> ${selectedItemsStr}</p>
      <p><strong>Total Amount:</strong> ₹${finalPrice.toLocaleString()}</p>
    `;
 
    savePickupToDatabase(refNum, finalPrice);
  }
 
});