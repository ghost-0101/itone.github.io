class AboutCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        if (!this.counters.length) return;
        this.initObserver();
    }

    initObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px'
        });

        this.counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.dataset.value) || parseInt(counter.textContent);
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentValue = Math.floor(startValue + (target - startValue) * progress);
            counter.textContent = currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
                this.updateCircleProgress(counter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    updateCircleProgress(counter) {
        const circleProgress = counter.closest('.stat-item')?.querySelector('.circle-progress');
        if (circleProgress) {
            const target = parseInt(counter.dataset.value) || parseInt(counter.textContent);
            const maxValue = parseInt(counter.dataset.max) || 100;
            const percent = (target / maxValue) * 100;
            circleProgress.style.strokeDasharray = `${percent}, 100`;
        }
    }
}
