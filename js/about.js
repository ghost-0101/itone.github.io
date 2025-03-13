document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initHeroSection();
    initStorySection();
    initCounters();
    initScrollEffects();
    initBackToTop();
});

// Hero Section Animations
function initHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    const shapes = document.querySelectorAll('.shape');
    const blobs = document.querySelectorAll('.blob');
    const techCards = document.querySelectorAll('.tech-card');

    // Parallax effect
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        if (heroContent) {
            heroContent.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
        }

        // Animate shapes
        shapes.forEach((shape, index) => {
            const factor = (index + 1) * 5;
            shape.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
        });

        // Animate blobs
        blobs.forEach((blob, index) => {
            const speed = 0.05 - (index * 0.01);
            const x = (window.innerWidth / 2 - e.clientX) * speed;
            const y = (window.innerHeight / 2 - e.clientY) * speed;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Animate tech cards
    techCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in');
    });
}

// Story Section Animations
function initStorySection() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('milestone-item')) {
                    animateMilestoneStats(entry.target);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.milestone-item').forEach(milestone => {
        observer.observe(milestone);
    });
}

// Counter Animations
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.dataset.value);
    const max = parseInt(counter.dataset.max) || target;
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(progress * target);
        counter.textContent = currentValue.toLocaleString();

        // Update ring progress if exists
        const ring = counter.closest('.stat-item')?.querySelector('.ring-progress');
        if (ring) {
            const percentage = (currentValue / max) * 100;
            ring.style.strokeDasharray = `${percentage}, 100`;
        }

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }

    requestAnimationFrame(updateCounter);
}

// Scroll Effects
function initScrollEffects() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.classList.add('fade-out');
            } else {
                scrollIndicator.classList.remove('fade-out');
            }
        });

        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Helper function to animate milestone statistics
function animateMilestoneStats(milestone) {
    milestone.querySelectorAll('.stat-number').forEach(number => {
        const target = parseInt(number.dataset.value);
        let current = 0;
        const duration = 1500;
        const increment = target / (duration / 16);

        function updateStats() {
            if (current < target) {
                current = Math.min(current + increment, target);
                number.textContent = Math.round(current);
                requestAnimationFrame(updateStats);
            }
        }

        requestAnimationFrame(updateStats);
    });
}
