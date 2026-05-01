// Header scroll effect + hauteur dynamique injectée en variable CSS
const header = document.getElementById('header');

function syncHeaderHeight() {
    document.documentElement.style.setProperty('--header-h', header.offsetHeight + 'px');
}
syncHeaderHeight();
window.addEventListener('resize', syncHeaderHeight);

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Menu burger toggle
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    burgerMenu.classList.remove('active');
    navLinks.classList.remove('active');
}

burgerMenu.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target)) {
        closeMenu();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (navLinks.classList.contains('active')) {
            // Mobile : fermer le menu d'abord, scroller ensuite
            e.preventDefault();
            const href = this.getAttribute('href');
            closeMenu();
            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) {
                    const top = target.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
            }, 350);
        }
        // Desktop : scroll natif du navigateur + scroll-margin-top CSS
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
