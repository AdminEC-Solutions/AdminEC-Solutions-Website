// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu burger toggle
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

burgerMenu.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Fermer le menu mobile si ouvert
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations - optimized for faster triggering
const observerOptions = {
    threshold: 0.075,
    rootMargin: '0px 0px 100px 0px' // Augmenté de -50px à 100px pour anticiper
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate stats counter if it's a stat number
            if (entry.target.querySelector('.stat-number')) {
                animateStats(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Counter animation for stats
function animateStats(element) {
    const statNumbers = element.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                stat.textContent = target + (stat.getAttribute('data-target') === '98' ? '%' : '+');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + (stat.getAttribute('data-target') === '98' ? '%' : '+');
            }
        }, 16);
    });
}

// Add stagger delay to service cards - réduit pour plus de réactivité
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`; // Réduit de 0.1s à 0.05s
});

// Add stagger delay to specialite cards
const specialiteCards = document.querySelectorAll('.specialite-card');
specialiteCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
});

// Add stagger delay to formule cards - réduit pour plus de réactivité
const formuleCards = document.querySelectorAll('.formule-card');
formuleCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`; // Réduit de 0.1s à 0.05s
});

// Add stagger delay to contact cards - réduit pour plus de réactivité
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`; // Réduit de 0.1s à 0.05s
});

// Add parallax effect to hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Easter egg: Log message for developers
console.log('%c🚀 Site développé avec passion', 'color: #1a1a1a; font-size: 16px; font-weight: bold;');
console.log('%cBesoin d\'un site web ? Contactez-nous !', 'color: #6b7280; font-size: 14px;');
