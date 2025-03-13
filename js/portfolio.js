class PortfolioCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.portfolio-item');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.portfolio-prev');
        this.nextBtn = document.querySelector('.portfolio-next');
        this.init();
    }

    init() {
        this.updateDots();
        this.initButtons();
        this.initDots();
        this.initSwipe();
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(index) {
        this.slides.forEach(slide => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
        this.currentSlide = index;
        this.updateDots();
    }

    initButtons() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
                this.goToSlide(this.currentSlide);
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
                this.goToSlide(this.currentSlide);
            });
        }
    }

    initDots() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
    }

    initSwipe() {
        let touchStartX = 0;
        let touchEndX = 0;

        const container = document.querySelector('.portfolio-carousel');
        if (!container) return;

        container.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        container.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                this.currentSlide = (this.currentSlide + 1) % this.slides.length;
                this.goToSlide(this.currentSlide);
            }
            if (touchStartX - touchEndX < -50) {
                this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
                this.goToSlide(this.currentSlide);
            }
        });
    }
}

class PortfolioGrid {
    constructor() {
        this.grid = document.getElementById('portfolio-grid');
        this.filters = document.querySelectorAll('.filter-btn');
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadProjects();
        this.initFilters();
        this.initAnimations();
    }

    loadProjects() {
        const projects = portfolioItems; // From portfolioData.js
        this.renderProjects(projects);
    }

    renderProjects(projects) {
        if (!this.grid) return;
        
        const filteredProjects = this.currentFilter === 'all' 
            ? projects 
            : projects.filter(p => p.category === this.currentFilter);

        const html = filteredProjects.map(project => this.createProjectCard(project)).join('');
        this.grid.innerHTML = html;
    }

    createProjectCard(project) {
        return `
            <div class="portfolio-card" data-category="${project.category}">
                <div class="portfolio-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="portfolio-overlay">
                        <span class="project-category text-white opacity-75">${project.category}</span>
                        <h3 class="text-white fs-2 my-3">${project.title}</h3>
                        <div class="tech-stack">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="project-meta d-flex gap-4 text-white opacity-75 mb-4">
                            <div class="client">
                                <i class="bi bi-building"></i> ${project.client}
                            </div>
                            <div class="duration">
                                <i class="bi bi-calendar"></i> ${project.duration}
                            </div>
                        </div>
                        <div class="d-flex gap-3">
                            <a href="${project.demoUrl}" class="btn btn-light">Live Demo</a>
                            <a href="${project.codeUrl}" class="btn btn-outline-light">View Code</a>
                        </div>
                    </div>
                </div>
                <div class="portfolio-content p-4">
                    <h4 class="mb-3">${project.title}</h4>
                    <p class="text-muted">${project.description}</p>
                </div>
            </div>
        `;
    }

    initFilters() {
        this.filters.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.loadProjects();
            });
        });
    }

    initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.portfolio-card').forEach(card => {
            observer.observe(card);
        });
    }
}

class PortfolioFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-card');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterProjects(button));
        });
    }

    filterProjects(clickedButton) {
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');

        // Get selected category
        const selectedCategory = clickedButton.getAttribute('data-filter');

        // Filter projects
        this.portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (selectedCategory === 'all' || selectedCategory === itemCategory) {
                // Show item with animation
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Hide item with animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioCarousel();
    new PortfolioGrid();
    new PortfolioFilter();
    
    // Initialize case study cards
    initCaseStudies();
});

function initCaseStudies() {
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    
    // Ensure all cards are visible
    caseStudyCards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
    });

    // Add intersection observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    caseStudyCards.forEach(card => {
        observer.observe(card);
    });
}
