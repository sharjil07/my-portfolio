document.addEventListener('DOMContentLoaded', function() {

    // Initialize Animate on Scroll (AOS)
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // --- Header scroll effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled-header');
        } else {
            header.classList.remove('scrolled-header');
        }
    });

    // --- Back to Top button logic ---
    const backToTopBtn = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[data-section]');
    const navLinks = document.querySelectorAll('nav ul li a');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.4 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));

    // --- NEW: Interactive Spotlight Effect for Skill Cards ---
    const skillCards = document.querySelectorAll('.skill-category');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

       // --- 3D Tilt and Flip Animation for Profile Picture ---
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        let isAnimating = false; // Flag to check if click animation is running

        // 3D Tilt on Mouse Move
        heroImage.addEventListener('mousemove', (e) => {
            // Don't apply tilt if the flip animation is running
            if (isAnimating) return;

            const { left, top, width, height } = heroImage.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;
            const tiltFactor = 15;
            const rotateY = (x / (width / 2)) * tiltFactor;
            const rotateX = (-1 * (y / (height / 2))) * tiltFactor;
            
            heroImage.style.transition = 'transform 0.1s ease'; // Fast transition for tracking
            heroImage.style.transform = `scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset transform on mouse leave
        heroImage.addEventListener('mouseleave', () => {
             // Don't apply tilt if the flip animation is running
            if (isAnimating) return;

            heroImage.style.transition = 'transform 0.5s ease-out'; // Smooth transition for reset
            heroImage.style.transform = 'scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });

        // --- Showstopper Flip Animation on Click ---
        heroImage.addEventListener('click', () => {
            // Only run if not already animating
            if (!isAnimating) {
                isAnimating = true;
                heroImage.classList.add('is-flipping');
                
                // Remove the tilt transform so animation is clean
                heroImage.style.transform = ''; 
            }
        });

        // Reset after animation ends
        heroImage.addEventListener('animationend', () => {
            heroImage.classList.remove('is-flipping');
            isAnimating = false; // Animation is done, allow mouse-move again
        });
    }

    // --- Typed.js for the typing animation ---
    const typed = new Typed('#typed-text', {
        strings: ['A DevOps Engineer.', 'A Cloud Enthusiast.', 'A Problem Solver.'],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true,
        cursorChar: '|',
    });

    // --- Particles.js ---
    if(document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.3, "random": false }, "size": { "value": 2, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#9f7aea", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "random": false, "straight": false, "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } } },
            "retina_detect": true
        });
    }
});