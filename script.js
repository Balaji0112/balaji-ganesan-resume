/**
 * Portfolio Website JavaScript
 * Handles animations, interactions, and dynamic behavior
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    setupEventListeners();
    setupIntersectionObserver();
});

/**
 * Initialize animations and effects
 */
function initializeAnimations() {
    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Set up event listeners for interactive elements
 */
function setupEventListeners() {
    // Contact item interactions
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', handleContactItemClick);
    });
    
    // Skill tag interactions
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('click', handleSkillTagClick);
    });
    
    // Card click effects (experience, projects, achievements, skills)
    const interactiveCards = document.querySelectorAll('.experience-item, .project-item, .achievement-card, .skill-category');
    interactiveCards.forEach(card => {
        card.addEventListener('click', createRippleEffect);
    });
    
    // Rocket button functionality
    const rocketBtn = document.getElementById('rocketBtn');
    if (rocketBtn) {
        setupRocketButton(rocketBtn);
    }
}

/**
 * Handle contact item clicks
 */
function handleContactItemClick() {
    const text = this.textContent;
    
    if (text.includes('mvmbalaji@gmail.com')) {
        window.open('mailto:mvmbalaji@gmail.com');
    } else if (text.includes('LinkedIn')) {
        window.open('https://www.linkedin.com/in/balaji-ganesan-492358145/', '_blank');
    } else if (text.includes('+1-425-542-1669')) {
        window.open('tel:+14255421669');
    } else if (text.includes('Seattle')) {
        // Optional: Open maps location
        window.open('https://www.google.com/maps/place/Seattle,WA', '_blank');
    }
}

/**
 * Handle skill tag click animation
 */
function handleSkillTagClick() {
    // Store original background
    const originalBg = this.style.background;
    
    // Apply random gradient
    this.style.background = `linear-gradient(45deg, hsl(${Math.random() * 360}, 70%, 60%), hsl(${Math.random() * 360}, 70%, 60%))`;
    
    // Revert after animation
    setTimeout(() => {
        this.style.background = originalBg;
    }, 1500);
}

/**
 * Create ripple effect on card click
 */
function createRippleEffect(e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Setup intersection observer for scroll animations
 */
/**
 * Setup intersection observer for scroll animations
 */
function setupIntersectionObserver() {
    // MODERATE CHANGE: Slightly reduced threshold and adjusted rootMargin
    const observerOptions = {
        threshold: 0.05,  // Reduced from 0.1 to 0.05 (not too aggressive)
        rootMargin: '0px 0px -30px 0px'  // Changed from -50px to -30px
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // MODERATE CHANGE: Slightly reduced the delay between sections
                const index = Array.from(document.querySelectorAll('.section')).indexOf(entry.target);
                entry.target.style.transition = `all 0.7s ease ${index * 0.08}s`; // Reduced from 0.1s to 0.08s
            }
        });
    }, observerOptions);

    // Apply entrance animation to sections
    document.querySelectorAll('.section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)'; // Reduced from 50px to 40px
        section.style.transition = `all 0.7s ease ${index * 0.08}s`; // Reduced from 0.1s to 0.08s
        observer.observe(section);
    });
}

/**
 * Setup rocket button functionality
 */
function setupRocketButton(rocketBtn) {
    const rocket = rocketBtn.querySelector('.rocket');
    const flame = rocket.querySelector('.flame');
    
    // Show/hide rocket based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            rocketBtn.classList.add('show');
        } else {
            rocketBtn.classList.remove('show');
        }
    });
    
    // Rocket launch on click
    rocketBtn.addEventListener('click', () => {
        // Add flame animation
        flame.style.opacity = '1';
        
        // Add launch animation
        rocket.classList.add('launch');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Reset rocket after animation completes
        setTimeout(() => {
            rocket.classList.remove('launch');
            flame.style.opacity = '0';
        }, 1000);
    });
}
  document.head.appendChild(style);