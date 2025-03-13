class CompanyStory {
    constructor() {
        this.init();
    }

    init() {
        this.initMilestoneAnimations();
        this.initStatCounters();
        this.initParallaxEffect();
        this.setupMilestones();
    }

    setupMilestones() {
        document.querySelectorAll('.milestone-item').forEach((milestone, index) => {
            milestone.style.transitionDelay = `${index * 0.2}s`;
            this.setInitialState(milestone);
        });
    }

    setInitialState(milestone) {
        const content = milestone.querySelector('.milestone-content');
        if (content) {
            content.style.opacity = '1';
            const isEven = milestone.parentElement.children[0] !== milestone;
            content.style.transform = `translateX(${isEven ? '-' : ''}50px)`;
        }
    }

    initMilestoneAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    this.animateStats(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '-50px'
        });

        document.querySelectorAll('.milestone-item').forEach(milestone => {
            observer.observe(milestone);
        });
    }

    initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const milestones = document.querySelectorAll('.milestone-content');
            milestones.forEach(milestone => {
                const speed = 0.05;
                const rect = milestone.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInView) {
                    const yOffset = (window.innerHeight - rect.top) * speed;
                    milestone.style.transform = `translateY(${yOffset}px)`;
                }
            });
        });
    }

    animateStats(milestone) {
        const numbers = milestone.querySelectorAll('.stat-number');
        const rings = milestone.querySelectorAll('.ring-progress');
        
        numbers.forEach((number, index) => {
            const target = parseInt(number.dataset.value);
            let current = 0;
            const duration = 1500;
            const increment = target / (duration / 16);

            const updateCounter = () => {
                if (current < target) {
                    current = Math.min(current + increment, target);
                    number.textContent = Math.round(current);
                    
                    if (rings[index]) {
                        const progress = (current / target) * 100;
                        rings[index].style.strokeDasharray = `${progress}, 100`;
                    }
                    
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        });
    }

    initStatCounters() {
        document.querySelectorAll('.ring-progress').forEach(ring => {
            ring.style.strokeDasharray = '0, 100';
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new CompanyStory();
});
