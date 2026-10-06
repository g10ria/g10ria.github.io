// .slideshow: stacked <img class="slide">s, one visible at a time; arrow buttons cycle and crossfade.
// Only the first slide has a src; the rest hold data-src and load when first needed (plus the next one is preloaded).
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.slideshow').forEach(function (show) {
        const slides = Array.from(show.querySelectorAll('.slide'));
        const count = show.parentElement.querySelector('.slide-count'); // lives in the title row below the images
        let index = 0;

        function load(slide) {
            if (slide.dataset.src && !slide.getAttribute('src')) slide.src = slide.dataset.src;
        }

        function update() {
            slides.forEach(function (slide, i) {
                const active = i === index;
                slide.classList.toggle('active', active);
                if (slide.tagName === 'VIDEO') { // video slides only play while they are the one showing
                    if (active) {
                        load(slide);
                        const playing = slide.play();
                        if (playing) playing.catch(function () {});
                    } else {
                        slide.pause();
                    }
                }
            });
            if (count) count.textContent = (index + 1) + ' / ' + slides.length;
            load(slides[(index + 1) % slides.length]); // preload the next one
        }

        function go(i) {
            index = (i + slides.length) % slides.length;
            load(slides[index]);
            update();
        }

        if (slides.length < 2) {
            show.querySelectorAll('.slide-btn').forEach(function (b) { b.hidden = true; });
            if (count) count.hidden = true;
            return;
        }

        // the full-screen view (lightbox.js) moves this slideshow to wherever it ended
        show.addEventListener('slideshow:goto', function (e) { go(e.detail); });
        show.querySelector('.slide-prev').addEventListener('click', function () { go(index - 1); });
        show.querySelector('.slide-next').addEventListener('click', function () { go(index + 1); });
        update();
    });
});
