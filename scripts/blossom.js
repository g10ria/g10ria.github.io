// Yarndings glyphs "blossom" under the mouse as it moves: they grow in, then shrink and fade away.
// Each one is a throwaway <span>; the animation lives in styles/profile.css (.blossom) and the span removes itself when done.
(function () {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const SPACING = 75;          // px the mouse must travel between blossoms
    const SCATTER = 22;          // px of random offset from the mouse
    const MIN_SIZE = 10;         // font-size range, px
    const MAX_SIZE = 35;
    const MIN_LIFE = 1300;       // lifetime range, ms
    const MAX_LIFE = 2200;
    const MAX_ALIVE = 60;        // safety cap

    const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const rand = function (min, max) { return min + Math.random() * (max - min); };

    let lastX = null;
    let lastY = null;
    let alive = 0;

    function bloom(x, y) {
        if (alive >= MAX_ALIVE) return;
        const el = document.createElement('span');
        el.className = 'blossom yarndings';
        el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        el.setAttribute('aria-hidden', 'true');
        el.style.left = (x + rand(-SCATTER, SCATTER)) + 'px';
        el.style.top = (y + rand(-SCATTER, SCATTER)) + 'px';
        el.style.fontSize = rand(MIN_SIZE, MAX_SIZE).toFixed(0) + 'px';
        el.style.setProperty('--blossom-rot', rand(-30, 30).toFixed(0) + 'deg');
        el.style.animationDuration = rand(MIN_LIFE, MAX_LIFE).toFixed(0) + 'ms';
        el.addEventListener('animationend', function () {
            el.remove();
            alive--;
        });
        document.body.appendChild(el);
        alive++;
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!document.body.classList.contains('profile-page')) return;

        document.addEventListener('mousemove', function (e) {
            if (lastX === null) { lastX = e.clientX; lastY = e.clientY; return; }
            if (Math.hypot(e.clientX - lastX, e.clientY - lastY) < SPACING) return;
            lastX = e.clientX;
            lastY = e.clientY;
            bloom(e.clientX, e.clientY);
        });
    });
})();
