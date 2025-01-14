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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        message: this.querySelector('textarea[name="message"]').value,
        timestamp: new Date().toISOString()
    };

    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    
    messages.push(formData);
    
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
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
    
    alert('Mesajul a fost salvat și exportat cu succes!');
    
    this.reset();
});

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

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

gsap.registerPlugin(ScrollTrigger);

function initMusicSectionAnimations() {
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

    musicItems.forEach((item) => {
        const artwork = item.querySelector('.music-artwork img');
        const details = item.querySelector('.music-details');
        const playIcon = item.querySelector('.play-icon');
        const tags = item.querySelectorAll('.tag');
        const platforms = item.querySelectorAll('.platform-icon');
        const bg = item.querySelector('.music-item-bg');

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

        item.addEventListener('mouseenter', () => {
            hoverTimeline.play();
        });

        item.addEventListener('mouseleave', () => {
            hoverTimeline.reverse();
        });

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

function initHeroAnimations() {
    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    heroTimeline
        .to(".hero-content", {
            y: 100,
            opacity: 0.5,
            scale: 0.9,
            ease: "none"
        });

    const heroText = new SplitType(".hero h1", { types: "chars" });
    gsap.from(heroText.chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".hero h1",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
}

function initNewReleaseAnimations() {
    const artworkContainer = document.querySelector('.artwork-container');
    gsap.set(artworkContainer, {
        clipPath: "circle(0% at 50% 50%)"
    });

    gsap.to(artworkContainer, {
        clipPath: "circle(100% at 50% 50%)",
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
            trigger: ".release-artwork",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    const artworkTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".release-artwork",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
        }
    });

    artworkTimeline
        .to(".artwork-container", {
            rotation: 5,
            scale: 1.05,
            yoyo: true,
            repeat: -1,
            duration: 2,
            ease: "sine.inOut"
        })
        .to(".play-overlay", {
            scale: 1.1,
            opacity: 0.8,
            yoyo: true,
            repeat: -1,
            duration: 1.5,
            ease: "sine.inOut"
        }, 0);

    const waveBars = document.querySelectorAll('.wave-bars span');
    waveBars.forEach((bar, index) => {
        gsap.to(bar, {
            height: `random(20, 80)`,
            duration: `random(0.5, 1.5)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.1
        });
    });

    const releaseTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".release-info",
            start: "top 70%",
            toggleActions: "play none none reverse"
        }
    });

    const releaseTitle = new SplitType(".release-info h2", { types: "chars,words" });
    
    releaseTimeline
        .from(".release-header", {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .from(releaseTitle.chars, {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.02,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .from(".release-description", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.6");

    const trackItems = gsap.utils.toArray(".track-list li");
    trackItems.forEach((item, i) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(item, {
            x: -50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.15
        })
        .from(item.querySelector('.track-number'), {
            scale: 0,
            rotation: -180,
            duration: 0.4,
            ease: "back.out(1.7)"
        }, "-=0.3")
        .from(item.querySelector('.track-duration'), {
            x: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out"
        }, "-=0.2");

        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                x: 10,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(item.querySelector('.track-number'), {
                scale: 1.2,
                color: "#ff0066",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(item.querySelector('.track-number'), {
                scale: 1,
                color: "inherit",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    const streamingLinks = gsap.utils.toArray(".streaming-links a");
    streamingLinks.forEach((link, i) => {
        gsap.from(link, {
            scale: 0,
            rotation: -30,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: ".streaming-links",
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            delay: i * 0.2
        });

        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.05,
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

function initContactAnimations() {
    const socialLinks = gsap.utils.toArray(".social-links a");
    
    socialLinks.forEach((link, i) => {
        gsap.set(link, {
            opacity: 0,
            scale: 0,
            rotation: 180
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".social-links",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        tl.to(link, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: i * 0.1
        });

        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.2,
                rotation: 15,
                y: -5,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(link.querySelector('i'), {
                color: "#ff0066",
                duration: 0.3
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                rotation: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
            gsap.to(link.querySelector('i'), {
                color: "inherit",
                duration: 0.3
            });
        });
    });

    const formElements = {
        inputs: gsap.utils.toArray("#contact-form input"),
        textarea: document.querySelector("#contact-form textarea"),
        button: document.querySelector("#contact-form button"),
        formStatus: document.querySelector("#form-status")
    };

    const formTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#contact-form",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.set(formElements.inputs, { opacity: 0, y: 30 });
    gsap.set(formElements.textarea, { opacity: 0, y: 30 });
    gsap.set(formElements.button, { opacity: 0, scale: 0 });

    formTimeline
        .to(formElements.inputs, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        })
        .to(formElements.textarea, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.4")
        .to(formElements.button, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.2");

    formElements.inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                boxShadow: "0 0 20px rgba(255, 0, 102, 0.3)",
                duration: 0.3,
                ease: "power2.out"
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                boxShadow: "none",
                duration: 0.3,
                ease: "power2.inOut"
            });
        });
    });

    formElements.textarea.addEventListener('focus', () => {
        gsap.to(formElements.textarea, {
            scale: 1.02,
            boxShadow: "0 0 20px rgba(255, 0, 102, 0.3)",
            duration: 0.3,
            ease: "power2.out"
        });
    });

    formElements.textarea.addEventListener('blur', () => {
        gsap.to(formElements.textarea, {
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.inOut"
        });
    });

    formElements.button.addEventListener('mouseenter', () => {
        gsap.to(formElements.button, {
            scale: 1.1,
            backgroundColor: "#ff0066",
            duration: 0.3,
            ease: "power2.out"
        });
    });

    formElements.button.addEventListener('mouseleave', () => {
        gsap.to(formElements.button, {
            scale: 1,
            backgroundColor: "initial",
            duration: 0.3,
            ease: "power2.inOut"
        });
    });

    const form = document.querySelector("#contact-form");
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        gsap.to(formElements.button, {
            scale: 0.95,
            duration: 0.2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1
        });

        formElements.formStatus.style.display = 'block';
        gsap.fromTo(formElements.formStatus, 
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
            }
        );

        setTimeout(() => {
            gsap.to(formElements.formStatus, {
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                color: "green",
                duration: 0.3
            });
            
            gsap.to(formElements.inputs.concat(formElements.textarea), {
                value: "",
                duration: 0.3,
                ease: "power2.inOut",
                stagger: 0.1
            });
        }, 1000);
    });

    const contactTitle = new SplitType("#contact h2", { types: "chars" });
    gsap.from(contactTitle.chars, {
        opacity: 0,
        y: 50,
        rotateX: -90,
        stagger: 0.05,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: "#contact h2",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initHeroAnimations();
    initNewReleaseAnimations();
    initContactAnimations();
    initMusicSectionAnimations();
});

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

const logo = document.querySelector('.logo');
logo.addEventListener('mouseover', () => {
    logo.style.transform = 'scale(1.1)';
});
logo.addEventListener('mouseout', () => {
    logo.style.transform = 'scale(1)';
});

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

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

const isMobile = window.innerWidth <= 768;
if (isMobile) {
    document.querySelector('.loading-text').style.animation = 'none';
    document.querySelector('.records-text').style.animation = 'none';
    setTimeout(() => {
        document.querySelector('.loading-text').style.animation = '';
        document.querySelector('.records-text').style.animation = '';
    }, 100);
}
