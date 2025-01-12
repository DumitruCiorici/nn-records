// Navigation hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
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
    
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        message: this.querySelector('textarea[name="message"]').value,
        timestamp: new Date().toISOString()
    };

    // Get existing messages or initialize empty array
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    // Add new message
    messages.push(formData);
    
    // Save to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Export messages to file
    const messagesText = messages.map(msg => 
        `Nume: ${msg.name}\nEmail: ${msg.email}\nData: ${new Date(msg.timestamp).toLocaleString()}\nMesaj:\n${msg.message}\n\n---\n\n`
    ).join('');
    
    const blob = new Blob([messagesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact_messages_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert('Mesajul a fost salvat și exportat cu succes!');
    
    // Reset form
    this.reset();
});

// Function to export messages (optional)
function exportMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const messagesText = messages.map(msg => 
        `Nume: ${msg.name}\nEmail: ${msg.email}\nData: ${new Date(msg.timestamp).toLocaleString()}\nMesaj:\n${msg.message}\n\n---\n\n`
    ).join('');
    
    const blob = new Blob([messagesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact_messages.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

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

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// Reset styles on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Optimize loading animation for mobile
const isMobile = window.innerWidth <= 768;
if (isMobile) {
    document.querySelector('.loading-text').style.animation = 'none';
    document.querySelector('.records-text').style.animation = 'none';
    setTimeout(() => {
        document.querySelector('.loading-text').style.animation = '';
        document.querySelector('.records-text').style.animation = '';
    }, 100);
}