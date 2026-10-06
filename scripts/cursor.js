// custom cursor: a dot that follows the mouse and fills with the accent color over clickable things
(function () {
    // touch devices have no pointer to replace
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const CLICKABLE = 'a, button, .navoption, .icon, .work-item:not(.tooltip-only), .company-link, .back, .attach-link, .slideshow';

    document.addEventListener('DOMContentLoaded', function () {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
        document.documentElement.classList.add('custom-cursor');

        document.addEventListener('mousemove', function (e) {
            dot.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
            dot.classList.add('visible');
            dot.classList.toggle('hover', !!(e.target.closest && e.target.closest(CLICKABLE)));
            // over a swapped letter the glyph itself is the cursor, so hide the dot rather than cover it
            dot.classList.toggle('over-glyph', !!(e.target.closest && e.target.closest('.glyph-swap')));
        });
        document.addEventListener('mouseleave', function () {
            dot.classList.remove('visible');
        });
    });
})();
