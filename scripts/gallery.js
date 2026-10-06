// corner photo gallery: the arrow buttons cycle through the images
document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.corner-gallery');
    if (!gallery) return;

    // two stacked <img>s: the visible one fades out while the hidden one, loaded with the new image, fades in
    const photos = gallery.querySelectorAll('.corner-photo');
    let front = photos[0];
    let back = photos[1];
    const images = [
        'img_2790', 'img_2875', 'img_2888', 'img_3177', 'img_3188', 'img_3194',
        'img_3198', 'img_3217', 'img_3221', 'img_3223', 'img_3234',
    ].map(function (name) { return './img/yellowstone/' + name + '.jpg'; });

    let index = Math.max(0, images.findIndex(function (src) { return front.getAttribute('src') === src; }));

    function show(i) {
        index = (i + images.length) % images.length;
        const src = images[index];
        new Image().src = images[(index + 1) % images.length]; // preload the next one

        // wait for the new image to load so the fade doesn't start on a blank frame
        const loader = new Image();
        loader.onload = function () {
            if (src !== images[index]) return; // a newer click superseded this one
            back.src = src;
            back.classList.remove('is-hidden');
            front.classList.add('is-hidden');
            const t = front; front = back; back = t;
        };
        loader.src = src;
    }

    gallery.querySelector('.gallery-prev').addEventListener('click', function () { show(index - 1); });
    gallery.querySelector('.gallery-next').addEventListener('click', function () { show(index + 1); });
});
