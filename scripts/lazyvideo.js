// <video class="lazy-video" data-src="..." poster="..." muted loop playsinline>
// The file only downloads once the video scrolls into view; it plays while visible and pauses off-screen.
// With "reduce motion" on, it stays on its poster image.
document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('video.lazy-video');
    if (!videos.length || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (!video.src) {
                    video.src = video.dataset.src;
                    // optional data-start: begin this many seconds in (used to run two copies of a clip out of sync)
                    if (video.dataset.start) {
                        video.addEventListener('loadedmetadata', function () {
                            video.currentTime = Number(video.dataset.start) % video.duration;
                        }, { once: true });
                    }
                }
                const playing = video.play();
                if (playing) playing.catch(function () {}); // autoplay blocked: stay on the poster
            } else {
                video.pause();
            }
        });
    }, { rootMargin: '100px' });

    videos.forEach(function (video) { observer.observe(video); });
});
