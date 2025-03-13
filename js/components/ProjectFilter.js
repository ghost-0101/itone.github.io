class ProjectFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.project-filter-btn');
        this.projects = document.querySelectorAll('.project-card');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the filter value
                const filter = button.getAttribute('data-filter');
                
                // Filter projects
                this.filterProjects(filter);
            });
        });
    }

    filterProjects(filter) {
        this.projects.forEach(project => {
            const category = project.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.classList.add('visible');
                    project.classList.remove('hidden');
                }, 0);
            } else {
                project.classList.add('hidden');
                project.classList.remove('visible');
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300); // Match this with CSS transition duration
            }
        });
    }
}

// Initialize project filter
document.addEventListener('DOMContentLoaded', () => {
    new ProjectFilter();
});
