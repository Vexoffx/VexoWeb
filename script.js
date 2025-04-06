// Loading Animation
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
});

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    menuToggle.innerHTML = nav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeColors = document.querySelector('.theme-colors');
const colorOptions = document.querySelectorAll('.color-option');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    themeToggle.innerHTML = isLight ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Show color options on hover
themeToggle.addEventListener('mouseenter', function() {
    themeColors.classList.add('show');
});

themeToggle.addEventListener('mouseleave', function() {
    themeColors.classList.remove('show');
});

// Change primary color
colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        document.documentElement.style.setProperty('--primary', color);
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-popup-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-popup-question');
    question.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Popup Triggers
document.getElementById('systemRequirementsLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('requirementsPopup').style.display = 'flex';
});

document.getElementById('faqLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('faqPopup').style.display = 'flex';
});

document.getElementById('comingSoonLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('soonPopup').style.display = 'flex';
});

// Close Popups
document.querySelector('.close-requirements').addEventListener('click', function() {
    document.getElementById('requirementsPopup').style.display = 'none';
});

document.querySelector('.close-faq-popup').addEventListener('click', function() {
    document.getElementById('faqPopup').style.display = 'none';
});

document.querySelector('.close-soon').addEventListener('click', function() {
    document.getElementById('soonPopup').style.display = 'none';
});

// Close popups when clicking outside
window    // Close popups when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('requirementsPopup')) {
        document.getElementById('requirementsPopup').style.display = 'none';
    }
    if (e.target === document.getElementById('faqPopup')) {
        document.getElementById('faqPopup').style.display = 'none';
    }
    if (e.target === document.getElementById('soonPopup')) {
        document.getElementById('soonPopup').style.display = 'none';
    }
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add slight delay to follower for smooth effect
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Video Play Button
const playButton = document.querySelector('.play-button');
const videoPlaceholder = document.querySelector('.video-placeholder');

playButton.addEventListener('click', function () {
    videoPlaceholder.innerHTML = `
        <iframe width="100%" height="100%" 
            src="https://www.youtube.com/embed/xFhUMLih8bk?autoplay=1" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
});


// Update current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();



// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const newsletterForm = document.querySelector('.newsletter-form-expanded');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value && emailInput.value.includes('@')) {
            // Show success message or send data to server
            alert('Thanks for subscribing! You\'ll hear from us soon.');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// Payment modal simulation
const priceButtons = document.querySelectorAll('.price-button, .cta-btn');
priceButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.href) return; // If it's a link, let it proceed
        
        e.preventDefault();
        showPaymentModal();
    });
});

function showPaymentModal() {
    const modal = document.createElement('div');
    modal.className = 'payment-modal active';
    modal.innerHTML = `
        <div class="payment-container">
            <button class="close-modal"><i class="fas fa-times"></i></button>
            <div class="payment-header">
                <h3>Complete Your Purchase</h3>
                <p>Enter your payment details to get started</p>
            </div>
            <form class="payment-form">
                <div class="form-group">
                    <label for="card-number">Card Number</label>
                    <input type="text" id="card-number" placeholder="1234 5678 9012 3456">
                </div>
                <div class="form-group">
                    <label for="card-expiry">Expiry Date</label>
                    <input type="text" id="card-expiry" placeholder="MM/YY">
                </div>
                <div class="form-group">
                    <label for="card-cvc">CVC</label>
                    <input type="text" id="card-cvc" placeholder="123">
                </div>
                <button type="submit" class="payment-button">
                    <div class="loading-spinner"></div>
                    <span>Pay Now</span>
                </button>
            </form>
            <div class="payment-footer">
                <p>Secure payment processing</p>
                <div class="payment-methods">
                    <i class="fab fa-cc-visa"></i>
                    <i class="fab fa-cc-mastercard"></i>
                    <i class="fab fa-cc-paypal"></i>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });
    
    // Form submission
    const form = modal.querySelector('.payment-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const button = this.querySelector('.payment-button');
        button.classList.add('loading');
        
        // Simulate payment processing
        setTimeout(() => {
            button.classList.remove('loading');
            modal.remove();
            
            // Show success message
            const success = document.createElement('div');
            success.className = 'payment-status';
            success.innerHTML = `
                <h1>Payment Successful!</h1>
                <p>Your purchase has been completed. Check your email for download instructions.</p>
                <a href="https://discord.gg/y6cHv2DgNe" class="discord-btn">
                    <i class="fab fa-discord"></i> Join Discord for Support
                </a>
            `;
            
            document.querySelector('.pricing').appendChild(success);
            window.scrollTo({
                top: success.offsetTop - 100,
                behavior: 'smooth'
            });
        }, 2000);
    });
}

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.project-card, .requirement-card, .section-header');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animation
document.querySelectorAll('.project-card, .requirement-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// Save preference

