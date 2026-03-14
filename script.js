/**
 * Dichter Law - Website Interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll behavior
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Scroll detection for navbar
    function handleScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeElements = document.querySelectorAll('.section-header, .about-text, .about-stats, .service-card, .contract-intro, .contract-services, .contract-arrangements, .why-card, .cta-card, .hero-card');

    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

    // Stagger animation for grid items
    const gridContainers = document.querySelectorAll('.services-grid, .why-grid, .contract-grid');

    gridContainers.forEach(function(container) {
        const items = container.children;
        Array.from(items).forEach(function(item, index) {
            item.style.transitionDelay = (index * 0.1) + 's';
        });
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const finalValue = stat.textContent;

                // Only animate if it's a number
                if (!isNaN(parseInt(finalValue))) {
                    const endValue = parseInt(finalValue);
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Easing function
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const currentValue = Math.floor(easeOutQuart * endValue);

                        stat.textContent = currentValue + (finalValue.includes('+') ? '+' : '');

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = finalValue;
                        }
                    }

                    stat.textContent = '0';
                    requestAnimationFrame(updateCounter);
                }

                counterObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(function(stat) {
        counterObserver.observe(stat);
    });
});
