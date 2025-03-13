$(document).ready(function() {
    // Counter function
    function startCounter($element) {
        const target = parseInt($element.data('target'));
        $({ Counter: 0 }).animate({
            Counter: target
        }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $element.text(Math.ceil(this.Counter).toLocaleString());
            },
            complete: function() {
                $element.text(target.toLocaleString());
            }
        });
    }

    // Initialize counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter($(entry.target));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // Observe all counter elements
    $('.counter').each(function() {
        observer.observe(this);
    });
});
