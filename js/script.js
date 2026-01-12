// Modern JavaScript for Out of School Youth Project

// DOM Elements
const DOM = {
    // Input fields with floating labels
    inputs: document.querySelectorAll('.form__input'),
    
    // Logo click navigation
    logo: document.getElementById('clickableLogo'),
    
    // Gallery lightbox functionality
    galleryItems: document.querySelectorAll('.gallery-item'),
    
    // Modal elements
    modal: document.querySelector('.donation-modal'),
    modalClose: document.querySelector('.modal-close'),
    cancelDonationBtn: document.getElementById('cancelDonation'),
    confirmDonationBtn: document.getElementById('confirmDonation'),
    
    // Donation form elements
    donationAmount: document.getElementById('donationAmount'),
    quickAmounts: document.querySelectorAll('.quick-amount'),
    selectTiers: document.querySelectorAll('.select-tier'),
    paymentMethods: document.querySelectorAll('input[name="paymentMethod"]'),
    
    // Summary elements
    summaryAmount: document.getElementById('summaryAmount'),
    summaryFee: document.getElementById('summaryFee'),
    summaryTotal: document.getElementById('summaryTotal'),
    
    // Back to top button
    backToTop: document.querySelector('.back-to-top'),
    
    // Mobile navigation
    navToggle: document.querySelector('.nav-toggle'),
    nav: document.querySelector('.nav'),
    navLinks: document.querySelectorAll('.nav__link'),
    
    // Current year for footer
    currentYear: document.getElementById('currentYear')
};

// Initialize all functionality
function init() {
    // Set current year in footer
    if (DOM.currentYear) {
        DOM.currentYear.textContent = new Date().getFullYear();
    }
    
    // Initialize floating labels
    initFloatingLabels();
    
    // Initialize logo navigation
    initLogoNavigation();
    
    // Initialize gallery lightbox
    initGalleryLightbox();
    
    // Initialize donation functionality
    initDonationSystem();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize mobile navigation
    initMobileNavigation();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize form submission
    initFormSubmission();
    
    // Set default payment instruction
    updatePaymentInstruction('mpesa');
}

// Floating Labels with improved UX
function initFloatingLabels() {
    if (!DOM.inputs.length) return;
    
    DOM.inputs.forEach(input => {
        const label = input.nextElementSibling;
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('has-value');
        }
        
        // Focus event
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
            if (label && label.classList.contains('form__label')) {
                label.classList.add('active');
            }
        });
        
        // Blur event
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (!input.value) {
                input.parentElement.classList.remove('has-value');
                if (label && label.classList.contains('form__label')) {
                    label.classList.remove('active');
                }
            }
        });
        
        // Input event for real-time validation
        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('has-value');
                validateInput(input);
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });
}

// Input validation
function validateInput(input) {
    const type = input.type;
    let isValid = true;
    
    switch(type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            break;
        case 'tel':
            isValid = /^[\d\s\-\+\(\)]{10,}$/.test(input.value);
            break;
        case 'number':
            isValid = !isNaN(input.value) && input.value > 0;
            break;
    }
    
    if (isValid) {
        input.parentElement.classList.remove('error');
        input.parentElement.classList.add('valid');
    } else {
        input.parentElement.classList.remove('valid');
        input.parentElement.classList.add('error');
    }
    
    return isValid;
}

// Logo Navigation
function initLogoNavigation() {
    if (DOM.logo) {
        DOM.logo.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
}

// Modern Gallery Lightbox with enhanced features
function initGalleryLightbox() {
    if (!DOM.galleryItems.length) return;
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close lightbox">
                <i class="fas fa-times"></i>
            </button>
            <button class="lightbox-prev" aria-label="Previous image">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="lightbox-next" aria-label="Next image">
                <i class="fas fa-chevron-right"></i>
            </button>
            <div class="lightbox-image-container">
                <img class="lightbox-image" src="" alt="">
            </div>
            <div class="lightbox-caption">
                <h3 class="image-title"></h3>
                <p class="image-description"></p>
                <div class="image-counter"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Lightbox elements
    const lightboxEl = document.querySelector('.lightbox');
    const lightboxImage = lightboxEl.querySelector('.lightbox-image');
    const lightboxTitle = lightboxEl.querySelector('.image-title');
    const lightboxDesc = lightboxEl.querySelector('.image-description');
    const lightboxCounter = lightboxEl.querySelector('.image-counter');
    const closeBtn = lightboxEl.querySelector('.lightbox-close');
    const prevBtn = lightboxEl.querySelector('.lightbox-prev');
    const nextBtn = lightboxEl.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const images = Array.from(DOM.galleryItems);
    
    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightboxEl.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Update lightbox content
    function updateLightbox() {
        const currentItem = images[currentIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('h3')?.textContent || '';
        const description = currentItem.querySelector('p')?.textContent || '';
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = description;
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }
    
    // Navigation functions
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    }
    
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    }
    
    // Event listeners for gallery items
    images.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        
        // Add keyboard navigation to images
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        
        // Make gallery items focusable for accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View image ${index + 1}`);
    });
    
    // Lightbox controls
    closeBtn.addEventListener('click', () => {
        lightboxEl.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightboxEl.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                lightboxEl.classList.remove('active');
                document.body.style.overflow = '';
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });
    
    // Close lightbox when clicking outside image
    lightboxEl.addEventListener('click', (e) => {
        if (e.target === lightboxEl) {
            lightboxEl.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightboxEl.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightboxEl.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }
}

// Donation System with modern features
function initDonationSystem() {
    // Quick amount buttons
    DOM.quickAmounts?.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all quick amounts
            DOM.quickAmounts.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update donation amount
            const amount = button.dataset.amount;
            DOM.donationAmount.value = amount;
            updateDonationSummary();
        });
    });
    
    // Tier selection buttons
    DOM.selectTiers?.forEach(button => {
        button.addEventListener('click', () => {
            const amount = button.dataset.amount;
            DOM.donationAmount.value = amount;
            
            // Highlight selected tier
            DOM.selectTiers.forEach(btn => {
                btn.closest('.tier-card')?.classList.remove('selected');
            });
            button.closest('.tier-card')?.classList.add('selected');
            
            updateDonationSummary();
        });
    });
    
    // Real-time donation amount updates
    DOM.donationAmount?.addEventListener('input', () => {
        // Remove active class from quick amounts
        DOM.quickAmounts?.forEach(btn => btn.classList.remove('active'));
        
        // Remove selected class from tiers
        DOM.selectTiers?.forEach(btn => {
            btn.closest('.tier-card')?.classList.remove('selected');
        });
        
        updateDonationSummary();
    });
    
    // Payment method selection
    DOM.paymentMethods?.forEach(method => {
        method.addEventListener('change', (e) => {
            updatePaymentInstruction(e.target.value);
        });
    });
    
    // Modal functionality
    DOM.modalClose?.addEventListener('click', closeDonationModal);
    DOM.cancelDonationBtn?.addEventListener('click', closeDonationModal);
    DOM.confirmDonationBtn?.addEventListener('click', processDonation);
    
    // Donate button
    const donateButton = document.getElementById('donateButton');
    donateButton?.addEventListener('click', openDonationModal);
}

// Update donation summary
function updateDonationSummary() {
    if (!DOM.donationAmount || !DOM.summaryAmount) return;
    
    const amount = parseFloat(DOM.donationAmount.value) || 0;
    const fee = calculateTransactionFee(amount);
    const total = amount + fee;
    
    // Format numbers with commas
    const formatCurrency = (num) => {
        return 'KSH ' + num.toLocaleString('en-KE');
    };
    
    DOM.summaryAmount.textContent = formatCurrency(amount);
    DOM.summaryFee.textContent = formatCurrency(fee);
    DOM.summaryTotal.textContent = formatCurrency(total);
}

// Calculate transaction fee (example: 2% for international payments)
function calculateTransactionFee(amount) {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    if (selectedMethod === 'mpesa') {
        return 0; // M-Pesa usually has no fees for donations
    } else if (selectedMethod === 'paypal') {
        return Math.round(amount * 0.029 + 10); // PayPal fee structure
    }
    
    return 0; // Bank transfer typically has no fees
}

// Update payment instructions based on selected method
function updatePaymentInstruction(method) {
    const instructions = {
        mpesa: document.getElementById('mpesaInstruction'),
        bank: document.getElementById('bankInstruction'),
        paypal: document.getElementById('paypalInstruction')
    };
    
    // Hide all instructions
    Object.values(instructions).forEach(instruction => {
        if (instruction) instruction.style.display = 'none';
    });
    
    // Show selected instruction
    if (instructions[method]) {
        instructions[method].style.display = 'block';
    }
    
    // Update M-Pesa amount if applicable
    const mpesaAmount = document.getElementById('mpesaAmount');
    if (mpesaAmount && DOM.donationAmount) {
        mpesaAmount.textContent = parseFloat(DOM.donationAmount.value).toLocaleString('en-KE');
    }
    
    // Update modal amount display
    const modalAmount = document.getElementById('modalAmount');
    if (modalAmount && DOM.donationAmount) {
        modalAmount.textContent = `Donation Amount: KSH ${parseFloat(DOM.donationAmount.value).toLocaleString('en-KE')}`;
    }
    
    updateDonationSummary();
}

// Open donation modal
function openDonationModal(e) {
    e.preventDefault();
    
    // Validate form
    if (!validateDonationForm()) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Get donation details
    const amount = DOM.donationAmount.value;
    const name = document.getElementById('donorName')?.value || 'Anonymous';
    const method = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    // Update modal with donation details
    const modalAmount = document.getElementById('modalAmount');
    if (modalAmount) {
        modalAmount.textContent = `Donation Amount: KSH ${parseFloat(amount).toLocaleString('en-KE')}`;
    }
    
    // Update payment instructions
    updatePaymentInstruction(method);
    
    // Show modal
    DOM.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close donation modal
function closeDonationModal() {
    DOM.modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Validate donation form
function validateDonationForm() {
    let isValid = true;
    const requiredFields = [
        DOM.donationAmount,
        document.getElementById('donorEmail')
    ];
    
    requiredFields.forEach(field => {
        if (field && !field.value.trim()) {
            isValid = false;
            field.parentElement.classList.add('error');
        } else if (field) {
            field.parentElement.classList.remove('error');
        }
    });
    
    // Validate email format
    const emailField = document.getElementById('donorEmail');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.parentElement.classList.add('error');
        }
    }
    
    return isValid;
}

// Process donation
function processDonation() {
    const amount = DOM.donationAmount.value;
    const name = document.getElementById('donorName')?.value || 'Anonymous';
    const email = document.getElementById('donorEmail')?.value;
    const method = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    const message = document.getElementById('donationMessage')?.value;
    
    // Simulate donation processing
    showNotification('Processing your donation...', 'info');
    
    // In a real application, you would submit to your payment gateway here
    setTimeout(() => {
        closeDonationModal();
        showNotification(`Thank you, ${name}! Your donation of KSH ${amount} has been received.`, 'success');
        
        // Reset form
        resetDonationForm();
        
        // Send to analytics or CRM (example)
        trackDonation(amount, method, name, email);
    }, 2000);
}

// Reset donation form
function resetDonationForm() {
    DOM.donationAmount.value = 5000;
    document.getElementById('donorName').value = '';
    document.getElementById('donorEmail').value = '';
    document.getElementById('donationMessage').value = '';
    document.querySelector('input[name="paymentMethod"][value="mpesa"]').checked = true;
    
    // Reset active states
    DOM.quickAmounts?.forEach(btn => btn.classList.remove('active'));
    DOM.selectTiers?.forEach(btn => {
        btn.closest('.tier-card')?.classList.remove('selected');
    });
    
    updateDonationSummary();
    updatePaymentInstruction('mpesa');
}

// Track donation (example for analytics)
function trackDonation(amount, method, name, email) {
    console.log('Donation tracked:', {
        amount,
        method,
        name,
        email,
        timestamp: new Date().toISOString()
    });
    
    // In production, you might send this to Google Analytics, your CRM, etc.
    // Example: gtag('event', 'donation', { value: amount, currency: 'KES' });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add close functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

// Back to Top functionality
function initBackToTop() {
    if (!DOM.backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            DOM.backToTop.classList.add('visible');
        } else {
            DOM.backToTop.classList.remove('visible');
        }
    });
    
    DOM.backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile Navigation
function initMobileNavigation() {
    if (!DOM.navToggle || !DOM.nav) return;
    
    DOM.navToggle.addEventListener('click', () => {
        DOM.nav.classList.toggle('active');
        DOM.navToggle.classList.toggle('active');
        document.body.style.overflow = DOM.nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on a link
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            DOM.nav.classList.remove('active');
            DOM.navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!DOM.nav.contains(e.target) && !DOM.navToggle.contains(e.target)) {
            DOM.nav.classList.remove('active');
            DOM.navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Submission
function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateContactForm()) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            // In production, you would send this to your server
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset floating labels
            DOM.inputs.forEach(input => {
                input.parentElement.classList.remove('has-value', 'focused');
                const label = input.nextElementSibling;
                if (label && label.classList.contains('form__label')) {
                    label.classList.remove('active');
                }
            });
            
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            // Restore button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

// Validate contact form
function validateContactForm() {
    let isValid = true;
    const requiredFields = contactForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.parentElement.classList.add('error');
        } else {
            field.parentElement.classList.remove('error');
        }
    });
    
    return isValid;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add CSS for new components
function addDynamicStyles() {
    const styles = `
        /* Lightbox Styles */
        .lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 2000;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
            display: flex;
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            width: auto;
            height: auto;
        }
        
        .lightbox-image-container {
            max-width: 100%;
            max-height: 70vh;
            overflow: hidden;
            border-radius: 8px;
        }
        
        .lightbox-image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease;
        }
        
        .lightbox-caption {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            padding: 1rem;
            border-radius: 0 0 8px 8px;
            backdrop-filter: blur(10px);
        }
        
        .lightbox-close,
        .lightbox-prev,
        .lightbox-next {
            position: absolute;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 1.5rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            transition: background 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-close:hover,
        .lightbox-prev:hover,
        .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        .lightbox-close {
            top: -60px;
            right: 0;
        }
        
        .lightbox-prev {
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        .lightbox-next {
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
        }
        
        /* Notification Styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 3000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
            border-left: 4px solid #800000;
        }
        
        .notification--success {
            border-left-color: #28a745;
        }
        
        .notification--error {
            border-left-color: #e43a47;
        }
        
        .notification--info {
            border-left-color: #17a2b8;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            padding: 1rem;
            gap: 0.75rem;
        }
        
        .notification-content i {
            font-size: 1.25rem;
        }
        
        .notification--success .notification-content i {
            color: #28a745;
        }
        
        .notification--error .notification-content i {
            color: #e43a47;
        }
        
        .notification--info .notification-content i {
            color: #17a2b8;
        }
        
        .notification-close {
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            color: #666;
            cursor: pointer;
            padding: 4px;
            font-size: 0.875rem;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        /* Form Validation Styles */
        .form__group.error .form__input {
            border-color: #e43a47;
        }
        
        .form__group.valid .form__input {
            border-color: #28a745;
        }
        
        .form__group.error::after {
            content: attr(data-error);
            color: #e43a47;
            font-size: 0.75rem;
            margin-top: 0.25rem;
            display: block;
        }
        
        /* Selected Tier */
        .tier-card.selected {
            box-shadow: 0 0 0 3px #800000, 0 8px 16px rgba(0, 0, 0, 0.1);
            transform: translateY(-5px);
        }
        
        /* Active Quick Amount */
        .quick-amount.active {
            background-color: #800000;
            color: white;
            border-color: #800000;
        }
        
        /* Loading Spinner */
        .fa-spinner {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* Mobile Menu Animation */
        .nav-toggle.active .hamburger {
            transform: rotate(45deg);
        }
        
        .nav-toggle.active .hamburger::before {
            top: 0;
            transform: rotate(90deg);
        }
        
        .nav-toggle.active .hamburger::after {
            top: 0;
            transform: rotate(0);
            opacity: 0;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Add dynamic styles
addDynamicStyles();

// Export functions for potential module usage
export {
    init,
    validateInput,
    updateDonationSummary,
    showNotification
};