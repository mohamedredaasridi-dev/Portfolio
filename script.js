document.addEventListener('DOMContentLoaded', () => {
    /**
     * Main application object to encapsulate all functionality.
     */
    const App = {
        /**
         * Initializes all the application components.
         */
        init() {
            this.handleNavbarScroll();
            this.setupMobileMenu();
            this.initScrollAnimations();
            this.handleContactForm();
            this.initTyped();
        },

        /**
         * Throttles a function to limit how often it can be called.
         * @param {Function} func - The function to throttle.
         * @param {number} limit - The throttle delay in milliseconds.
         * @returns {Function} The throttled function.
         */
        throttle(func, limit) {
            let inThrottle;
            return function () {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => (inThrottle = false), limit);
                }
            };
        },

        /**
         * Changes navbar background on scroll.
         */
        handleNavbarScroll() {
            const navbar = document.querySelector('.navbar');
            if (!navbar) return;

            const handleScroll = () => {
                navbar.style.backgroundColor = window.scrollY > 50 ?
                    'var(--bg-secondary)' :
                    'rgba(26, 26, 26, 0.8)';
            };

            // improve scroll performance with passive listener when available
            try {
                window.addEventListener('scroll', this.throttle(handleScroll, 100), { passive: true });
            } catch (e) {
                window.addEventListener('scroll', this.throttle(handleScroll, 100));
            }
        },

        /**
         * Sets up the mobile navigation menu toggle.
         */
        setupMobileMenu() {
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.querySelector('.nav-menu');
            if (!navToggle || !navMenu) return;

            const toggleMenu = () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('show-menu');
                const isExpanded = navMenu.classList.contains('show-menu');
                navToggle.setAttribute('aria-expanded', isExpanded);
            };

            // Click to toggle
            navToggle.addEventListener('click', toggleMenu);

            // Keyboard accessibility: toggle with Enter or Space
            navToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    toggleMenu();
                }
            });

            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navMenu.classList.contains('show-menu')) {
                        toggleMenu();
                    }
                });
            });
        },

        /**
         * Initializes Intersection Observer for scroll-triggered fade-in animations.
         */
        initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        },

        /**
         * Handles the contact form submission using Formspree.
         */
        handleContactForm() {
            const form = document.querySelector('.contact-form');
            const formMessages = document.getElementById('form-messages');
            if (!form || !formMessages) return;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const button = form.querySelector('button[type="submit"]');
                button.disabled = true;
                button.textContent = 'Sending...';

                try {
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: new FormData(form),
                        headers: { 'Accept': 'application/json' }
                    });

                    if (response.ok) {
                        formMessages.textContent = 'Thank you! Your message has been sent.';
                        formMessages.style.color = 'var(--accent-primary)';
                        form.reset();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    formMessages.textContent = 'Oops! There was a problem. Please try again later.';
                    formMessages.style.color = '#ff6b6b';
                } finally {
                    button.disabled = false;
                    button.textContent = 'Send Message';
                }
            });
        },

        /**
         * Initializes the Typed.js effect for the hero title.
         */
        initTyped() {
            if (typeof Typed !== 'undefined' && document.getElementById('typed-text')) {
                const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                new Typed('#typed-text', {
                    strings: ["Software Engineer", "Web Developer", "Full-Stack Developer"],
                    typeSpeed: prefersReduced ? 1 : 50,
                    backSpeed: prefersReduced ? 1 : 50,
                    loop: !prefersReduced,
                    backDelay: 2000,
                    showCursor: !prefersReduced
                });
            }
        },
    };

    // Run the application
    App.init();
});