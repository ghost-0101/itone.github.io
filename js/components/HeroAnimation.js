class HeroAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.initParallax();
        this.initTyping();
        this.initBackgroundEffects();
    }

    initParallax() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;

        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    initTyping() {
        const element = document.querySelector('.typing-text');
        if (!element) return;

        new Typed(element, {
            strings: ['Innovation', 'Excellence', 'Solutions'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    initBackgroundEffects() {
        // Background effects initialization
    }
}
