import { caseStudies } from './data/caseStudiesData.js';

class CaseStudiesManager {
    constructor() {
        this.container = document.getElementById('case-studies-container');
        this.init();
    }

    init() {
        if (!this.container) return;
        this.renderCaseStudies();
        this.initializeAnimations();
    }

    renderCaseStudies() {
        const html = caseStudies.map(study => this.createCaseStudyCard(study)).join('');
        this.container.innerHTML = html;
    }

    createCaseStudyCard(study) {
        return `
            <div class="col-lg-4 col-md-6" data-aos="fade-up">
                <div class="case-study-card">
                    <div class="case-study-image">
                        <img src="${study.thumbnail}" alt="${study.title}">
                        <div class="case-study-overlay">
                            <span class="category-badge">${study.category}</span>
                            <div class="overlay-content">
                                <h4>Challenge:</h4>
                                <p>${study.challenge}</p>
                                <a href="${study.link}" class="btn btn-light">View Details</a>
                            </div>
                        </div>
                    </div>
                    <div class="case-study-content">
                        <h3>${study.title}</h3>
                        <div class="results-grid">
                            ${study.results.map(result => `
                                <div class="result-item">
                                    <span class="result-value">${result.split(' ')[0]}</span>
                                    <span class="result-label">${result.split(' ').slice(1).join(' ')}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="tech-stack">
                            ${study.technologies.map(tech => 
                                `<span class="tech-badge">${tech}</span>`
                            ).join('')}
                        </div>
                        <div class="study-meta">
                            <span><i class="bi bi-building"></i> ${study.client}</span>
                            <span><i class="bi bi-clock"></i> ${study.duration}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    initializeAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.case-study-card').forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(card);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CaseStudiesManager();
});
