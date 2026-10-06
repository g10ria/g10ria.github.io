// Clicking an archive image opens it full screen. The arrows cycle through that project's images,
// the X (or Esc, or a click on the dark background) closes it, and the grid slideshow follows along.
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.slideshow-card');
    if (!cards.length) return;

    // ---- build the overlay once
    const box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Image viewer');
    box.hidden = true;
    box.innerHTML =
        '<button class="lightbox-btn lightbox-close" aria-label="Close">&times;</button>' +
        '<button class="lightbox-btn lightbox-prev" aria-label="Previous image">&larr;</button>' +
        '<img class="lightbox-img" alt="">' +
        '<video class="lightbox-img lightbox-video" muted loop playsinline hidden></video>' +
        '<button class="lightbox-btn lightbox-next" aria-label="Next image">&rarr;</button>' +
        '<div class="lightbox-caption"><span class="lightbox-title"></span><span class="lightbox-count"></span></div>';
    document.body.appendChild(box);

    const img = box.querySelector('img.lightbox-img');
    const video = box.querySelector('.lightbox-video');
    const title = box.querySelector('.lightbox-title');
    const count = box.querySelector('.lightbox-count');
    const closeBtn = box.querySelector('.lightbox-close');
    const prevBtn = box.querySelector('.lightbox-prev');
    const nextBtn = box.querySelector('.lightbox-next');

    let show = null;      // the .slideshow being viewed
    let sources = [];     // full list of image URLs for that project
    let index = 0;
    let lastFocus = null;

    function sourceOf(slide) {
        return slide.getAttribute('src') || slide.dataset.src;
    }

    function isVideo(src) {
        return /\.(mp4|webm)(\?|$)/i.test(src || '');
    }

    function render() {
        const src = sources[index];
        if (isVideo(src)) {
            img.hidden = true;
            img.removeAttribute('src');
            video.hidden = false;
            video.src = src;
            const playing = video.play();
            if (playing) playing.catch(function () {});
        } else {
            video.pause();
            video.hidden = true;
            video.removeAttribute('src');
            img.hidden = false;
            img.src = src;
            img.alt = show.querySelector('.slide').alt || '';
        }
        count.textContent = sources.length > 1 ? (index + 1) + ' / ' + sources.length : '';
        // preload the neighbours so the arrows feel instant
        if (sources.length > 1) {
            [sources[(index + 1) % sources.length], sources[(index - 1 + sources.length) % sources.length]].forEach(function (src) {
                if (!isVideo(src)) new Image().src = src;
            });
        }
    }

    function step(delta) {
        if (sources.length < 2) return;
        index = (index + delta + sources.length) % sources.length;
        render();
    }

    function open(card) {
        show = card.querySelector('.slideshow');
        const slides = Array.from(show.querySelectorAll('.slide'));
        sources = slides.map(sourceOf);
        index = Math.max(0, slides.findIndex(function (s) { return s.classList.contains('active'); }));
        title.textContent = (card.querySelector('.slide-name') || {}).textContent || '';
        box.classList.toggle('lightbox-light', card.classList.contains('slideshow-light'));
        prevBtn.hidden = nextBtn.hidden = sources.length < 2;
        lastFocus = document.activeElement;
        render();
        box.hidden = false;
        requestAnimationFrame(function () { box.classList.add('open'); });
        document.documentElement.style.overflow = 'hidden';
        closeBtn.focus();
        const tip = document.querySelector('.archive-tooltip');
        if (tip) tip.classList.remove('visible');
    }

    function close() {
        if (box.hidden) return;
        // the grid slideshow lands on the image we finished on
        show.dispatchEvent(new CustomEvent('slideshow:goto', { detail: index }));
        box.classList.remove('open');
        box.hidden = true;
        document.documentElement.style.overflow = '';
        img.removeAttribute('src');
        video.pause();
        video.removeAttribute('src');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
        show = null;
    }

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function () { step(-1); });
    nextBtn.addEventListener('click', function () { step(1); });
    box.addEventListener('click', function (e) { if (e.target === box) close(); });

    document.addEventListener('keydown', function (e) {
        if (box.hidden) return;
        if (e.key === 'Escape') { close(); return; }
        if (e.key === 'ArrowLeft') { step(-1); return; }
        if (e.key === 'ArrowRight') { step(1); return; }
        if (e.key === 'Tab') { // keep keyboard focus inside the viewer
            const items = [closeBtn, prevBtn, nextBtn].filter(function (b) { return !b.hidden; });
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    });

    // ---- make every grid image open it
    cards.forEach(function (card) {
        const slideshow = card.querySelector('.slideshow');
        slideshow.setAttribute('tabindex', '0');
        slideshow.setAttribute('role', 'button');
        slideshow.addEventListener('click', function (e) {
            if (e.target.closest('.slide-btn')) return; // the grid arrows just cycle, they don't open
            open(card);
        });
        slideshow.addEventListener('keydown', function (e) {
            if (e.target !== slideshow) return;
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
        });
    });
});
