class HeroSection {
    constructor() {
        this.init();
    }

    init() {
        this.initParallax();
        this.initBlobAnimation();
        this.initScrollIndicator();
        this.initHeroCards();
    }

    initParallax() {
        const heroContent = document.querySelector('.hero-content');
        const shapes = document.querySelectorAll('.shape');
        
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            if (heroContent) {
                heroContent.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
            }

            shapes.forEach((shape, index) => {
                const factor = (index + 1) * 5;
                shape.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
            });
        });
    }

    initBlobAnimation() {
        const blobs = document.querySelectorAll('.blob');
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            blobs.forEach((blob, index) => {
                const speed = 0.05 - (index * 0.01);
                const x = (window.innerWidth / 2 - mouseX) * speed;
                const y = (window.innerHeight / 2 - mouseY) * speed;
                blob.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });

        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    initHeroCards() {
        const cards = document.querySelectorAll('.tech-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            card.classList.add('fade-in');
        });
    }
}
