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

// GSAP ScrollTrigger Animations
gsap.registerPlugin(ScrollTrigger);

// Music Section Animations
function initMusicSectionAnimations() {
    // Header animation with enhanced timeline
    const headerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.section-header',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    headerTimeline
        .from('.section-header h2', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.header-line', {
            scaleX: 0,
            duration: 0.8,
            ease: 'power3.inOut'
        }, '-=0.5');

    // Music items stagger animation
    const musicItems = gsap.utils.toArray('.music-item');
    
    musicItems.forEach((item, i) => {
        gsap.set(item, { 
            opacity: 0,
            y: 50
        });

        ScrollTrigger.create({
            trigger: item,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(item, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: i * 0.2,
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            },
            once: true
        });
    });

    // Individual card hover animations
    musicItems.forEach((item) => {
        const artwork = item.querySelector('.music-artwork img');
        const details = item.querySelector('.music-details');
        const playIcon = item.querySelector('.play-icon');
        const tags = item.querySelectorAll('.tag');
        const platforms = item.querySelectorAll('.platform-icon');
        const bg = item.querySelector('.music-item-bg');

        // Create hover timeline for each card
        const hoverTimeline = gsap.timeline({ 
            paused: true,
            defaults: { duration: 0.4, ease: 'power2.out' }
        });
        
        hoverTimeline
            .to(artwork, {
                scale: 1.05
            })
            .to(bg, {
                opacity: 1
            }, 0)
            .to(details, {
                y: -10
            }, 0)
            .to(playIcon, {
                scale: 1,
                opacity: 1,
                y: 0,
                ease: 'back.out(1.7)'
            }, 0)
            .to(tags, {
                scale: 1.05,
                y: -2,
                stagger: 0.1
            }, 0.1)
            .to(platforms, {
                y: -3,
                opacity: 1,
                stagger: 0.05
            }, 0.2);

        // Mouse enter/leave events
        item.addEventListener('mouseenter', () => {
            hoverTimeline.play();
        });

        item.addEventListener('mouseleave', () => {
            hoverTimeline.reverse();
        });

        // Platform icons individual hover effect
        platforms.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: 'back.out(1.7)',
                    overwrite: 'auto'
                });
            });

            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        });

        // Tags hover effect
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                gsap.to(tag, {
                    scale: 1.1,
                    y: -4,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });

            tag.addEventListener('mouseleave', () => {
                gsap.to(tag, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        });
    });
}

// Initialize animations after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMusicSectionAnimations();
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
