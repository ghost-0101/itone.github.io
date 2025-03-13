class CounterAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.initIntersectionObserver();
    }

    initIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateValue(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(el => {
            observer.observe(el);
        });
    }

    animateValue(element) {
        const target = parseInt(element.dataset.value);
        const duration = 2000;
        const steps = 60;
        const stepValue = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += stepValue;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, duration / steps);
    }
}
