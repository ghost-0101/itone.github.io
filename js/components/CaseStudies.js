import { caseStudies } from '../data/caseStudiesData.js';

class CaseStudies {
    constructor() {
        this.container = document.querySelector('.case-studies-slider');
        this.init();
    }

    init() {
        this.renderCaseStudies();
        this.initializeCarousel();
    }

    renderCaseStudies() {
        if (!this.container) return;

        const caseStudiesHTML = `
            <div class="row g-4">
                ${caseStudies.map(study => this.createCaseStudyCard(study)).join('')}
            </div>
        `;

        this.container.innerHTML = caseStudiesHTML;
    }

    createCaseStudyCard(study) {
        return `
            <div class="col-lg-4 col-md-6">
                <div class="case-study-card">
                    <div class="case-study-image">
                        <img src="${study.thumbnail}" alt="${study.title}">
                        <div class="case-study-overlay">
                            <div class="overlay-content text-white">
                                <h4 class="mb-3">Challenge:</h4>
                                <p>${study.challenge}</p>
                                <div class="mt-3">
                                    <a href="${study.link}" class="btn btn-light">View Case Study</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="case-study-content">
                        <span class="case-category">${study.category}</span>
                        <h3 class="case-title">${study.title}</h3>
                        
                        <div class="case-metrics">
                            ${this.renderResults(study.results)}
                        </div>
                        
                        <div class="tech-stack">
                            ${study.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                        
                        <div class="case-link">
                            <a href="${study.link}">
                                Read Full Case Study 
                                <i class="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderResults(results) {
        return results.map((result, index) => `
            <div class="metric-item">
                <div class="metric-value">${result.split(' ')[0]}</div>
                <div class="metric-label">${result.split(' ').slice(1).join(' ')}</div>
            </div>
        `).join('');
    }

    initializeCarousel() {
        const cards = document.querySelectorAll('.case-study-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });
    }
}

export default CaseStudies;
