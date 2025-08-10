// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Cart Functionality
let cart = [];
let cartTotal = 0;

const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

// Open/Close Cart
cartToggle.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
        cartSidebar.classList.remove('open');
    }
});

// Add to Cart Function
function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${name} added to cart! 🍽️`);
}

// Update Cart Display
function updateCart() {
    cartItems.innerHTML = '';
    cartTotal = 0;
    
    cart.forEach(item => {
        cartTotal += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <div class="cart-item-price">₹${item.price * item.quantity}</div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotalElement.textContent = `₹${cartTotal}`;
    cartCount.textContent = cart.length;
}

// Add to Cart Buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.menu-card');
        const name = card.querySelector('h3').textContent;
        const price = parseInt(card.querySelector('.price').textContent.replace('₹', ''));
        const image = card.querySelector('img').src;
        
        addToCart(name, price, image);
    });
});

// Menu Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        menuCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simulate form submission
    showNotification('Message sent successfully! We\'ll get back to you soon. 📧');
    this.reset();
});

// Enhanced Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
        border: 1px solid rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.menu-card, .testimonial-card, .feature').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Enhanced Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Enhanced Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 46, 0.98)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.5)';
    } else {
        header.style.background = 'rgba(26, 26, 46, 0.95)';
        header.style.backdropFilter = 'blur(15px)';
        header.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.25)';
    }
});

// Enhanced Counter Animation for Hero Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            
            if (text.includes('10k+')) {
                target.textContent = '0+';
                setTimeout(() => animateCounter(target, 10, 2000), 500);
            } else if (text.includes('4.8')) {
                target.textContent = '0';
                setTimeout(() => {
                    let current = 0;
                    const timer = setInterval(() => {
                        current += 0.1;
                        if (current >= 4.8) {
                            target.textContent = '4.8';
                            clearInterval(timer);
                        } else {
                            target.textContent = current.toFixed(1);
                        }
                    }, 50);
                }, 500);
            }
            
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat span').forEach(stat => {
    counterObserver.observe(stat);
});

// Enhanced Checkout Functionality
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showNotification('Your cart is empty! 🛒');
        return;
    }
    
    showNotification('Redirecting to checkout... 💳');
    cartSidebar.classList.remove('open');
    
    // Simulate checkout process
    setTimeout(() => {
        cart = [];
        updateCart();
        showNotification('Order placed successfully! 🎉 Your food is on its way! 🚚');
    }, 2000);
});

// Enhanced Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cartSidebar.classList.remove('open');
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Enhanced Image Preloading for Better Performance
function preloadImages() {
    const images = [
        'hero.jpg',
        'burger.jpg',
        'pizza.jpg',
        'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Enhanced Menu Card Interactions
document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(255, 107, 107, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
    });
});

// Enhanced Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 You found the secret! Free dessert on your next order! 🍰✨');
        konamiCode = [];
    }
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations can go here
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Add some fun color animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #ff8e53 0%, #ff6b6b 100%)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.querySelectorAll('.btn, .add-to-cart').forEach(button => {
    button.addEventListener('click', createRipple);
});

console.log('🍔 HungerBites enhanced with love by Dishita Taneja! 🚀✨');
console.log('🎨 Beautiful new color scheme applied! 🌈');