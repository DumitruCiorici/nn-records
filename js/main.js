// Navigation hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aici poți adăuga logica pentru trimiterea formularului
    alert('Mulțumim pentru mesaj! Te vom contacta în curând.');
    contactForm.reset();
});

// Animație la scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight / 2)) {
            section.classList.add('active');
        }
    });
});

// Efect de parallax pentru hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Simplificăm codul de loading
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    
    setTimeout(() => {
        loading.classList.add('start-transition');
        
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 800);
    }, 1500);
});

// Îmbunătățim animațiile la scroll
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (entry.target.classList.contains('music-item')) {
                entry.target.style.animation = `slideIn 0.6s ease-out ${entry.target.dataset.delay}s backwards`;
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section, .music-item').forEach((el, index) => {
    el.dataset.delay = index * 0.2;
    observer.observe(el);
});

// Adăugăm efect de hover pentru logo
const logo = document.querySelector('.logo');
logo.addEventListener('mouseover', () => {
    logo.style.transform = 'scale(1.1)';
});
logo.addEventListener('mouseout', () => {
    logo.style.transform = 'scale(1)';
});

// Îmbunătățim efectul de parallax
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const st = window.pageYOffset;
    const direction = st > lastScrollTop ? 'down' : 'up';
    
    if (direction === 'down') {
        hero.style.backgroundPositionY = -(st * 0.5) + 'px';
    } else {
        hero.style.backgroundPositionY = -(st * 0.3) + 'px';
    }
    lastScrollTop = st;
}); 