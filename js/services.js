// Service page specific animations
document.addEventListener('DOMContentLoaded', () => {
    initServiceCards();
    initScrollEffects();
    initTechStack();
    // Add more initialization functions as needed
});

function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
}

function initScrollEffects() {
    const elements = document.querySelectorAll('.service-card, .process-step, .tech-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    elements.forEach(el => {
        el.style.transform = 'translateY(30px)';
        el.style.opacity = '0';
        el.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
        observer.observe(el);
    });
}

function initTechStack() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                animateTechCard(card);
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.tech-card').forEach(card => {
        observer.observe(card);
    });
}

function animateTechCard(card) {
    const mastery = card.dataset.mastery;
    const progress = card.querySelector('.circle-progress');
    const value = card.querySelector('.mastery-value');
    
    // Animate progress ring
    progress.style.transition = 'stroke-dasharray 1.5s ease-out';
    progress.style.strokeDasharray = `${mastery}, 100`;
    
    // Animate mastery value
    let currentValue = 0;
    const duration = 1500;
    const increment = mastery / (duration / 16);
    
    const updateValue = () => {
        if (currentValue < mastery) {
            currentValue = Math.min(currentValue + increment, mastery);
            value.textContent = `${Math.round(currentValue)}%`;
            requestAnimationFrame(updateValue);
        }
    };
    
    requestAnimationFrame(updateValue);
}

// Service request form handling
const requestForms = document.querySelectorAll('.service-request-form');
requestForms.forEach(form => {
    form.addEventListener('submit', handleServiceRequest);
});

function handleServiceRequest(e) {
    e.preventDefault();
    // Add form handling logic here
    console.log('Service request submitted');
}
