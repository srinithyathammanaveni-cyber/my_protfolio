// Main JavaScript file for portfolio website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    setCurrentYear();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize profile image fallback
    initProfileImage();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize skill animations
    initSkillAnimations();
    
    // Initialize scroll-based effects
    initScrollEffects();
});

// Set current year in footer
function setCurrentYear() {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Initialize navigation functionality
function initNavigation() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile navbar after clicking
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if(navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
    
    // Add active class to navigation links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize profile image with fallback
function initProfileImage() {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        // Check if image loaded successfully
        if (profileImg.complete && profileImg.naturalHeight === 0) {
            // Image failed to load
            showProfileFallback(profileImg);
        }
        
        // Add error event listener
        profileImg.addEventListener('error', function() {
            showProfileFallback(this);
        });
    }
}

// Show profile fallback image
function showProfileFallback(imgElement) {
    imgElement.style.opacity = '0';
    const fallback = imgElement.nextElementSibling;
    if (fallback && fallback.classList.contains('profile-fallback')) {
        fallback.style.opacity = '1';
    }
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Form validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            clearValidation(this);
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm(this);
        }
    });
}

// Validate individual input
function validateInput(input) {
    const value = input.value.trim();
    const isValid = input.checkValidity();
    
    if (!isValid) {
        input.classList.add('invalid');
        input.classList.remove('valid');
    } else {
        input.classList.add('valid');
        input.classList.remove('invalid');
    }
}
    
   