// A tooltip that follows the mouse while it is over an item, and disappears when it leaves.
// Items: archive tiles (.slideshow-card) and anything marked [data-tooltip] (e.g. a card on My Work).
// Content: the title (.slide-name, or .work-title), the live image counter (.slide-count) when there is one,
// and an optional one-sentence description in the data-description attribute.
// Plain text: data-tooltip="some words" shows just those words (no title).
// data-tooltip-hide-on-buttons: no tooltip while the mouse is over a <button> inside the item.
document.addEventListener('DOMContentLoaded', function () {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const tip = document.createElement('div');
    tip.className = 'archive-tooltip';
    tip.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tip);

    const OFFSET = 16; // gap between the mouse and the tooltip

    function fill(card) {
        const plain = card.dataset.tooltip; // plain-text tooltip, when given
        const name = card.querySelector('.slide-name') || card.querySelector('.work-title');
        const count = card.querySelector('.slide-count');
        const desc = card.dataset.description;
        tip.innerHTML = '';

        const head = document.createElement('div');
        head.className = 'archive-tooltip-head';
        const title = document.createElement('span');
        title.textContent = plain || (name ? name.textContent : '');
        head.appendChild(title);
        if (count && count.textContent) {
            const c = document.createElement('span');
            c.className = 'archive-tooltip-count';
            c.textContent = count.textContent;
            head.appendChild(c);
        }
        tip.appendChild(head);

        if (desc) {
            const d = document.createElement('div');
            d.className = 'archive-tooltip-desc';
            d.textContent = desc;
            tip.appendChild(d);
        }
    }

    function place(e) {
        const w = tip.offsetWidth;
        const h = tip.offsetHeight;
        let x = e.clientX + OFFSET;
        let y = e.clientY + OFFSET;
        // flip to the other side of the mouse near the right / bottom edges of the window
        if (x + w > window.innerWidth - 8) x = e.clientX - OFFSET - w;
        if (y + h > window.innerHeight - 8) y = e.clientY - OFFSET - h;
        tip.style.transform = 'translate(' + Math.max(8, x) + 'px, ' + Math.max(8, y) + 'px)';
    }

    document.querySelectorAll('.slideshow-card, [data-tooltip]').forEach(function (card) {
        card.addEventListener('mouseenter', function (e) {
            fill(card);
            place(e);
            tip.classList.add('visible');
        });
        card.addEventListener('mousemove', function (e) {
            if (card.hasAttribute('data-tooltip-hide-on-buttons')) {
                const onButton = !!(e.target.closest && e.target.closest('button'));
                tip.classList.toggle('visible', !onButton);
                if (onButton) return;
            }
            fill(card); // keeps the image counter live while cycling
            place(e);
        });
        card.addEventListener('mouseleave', function () {
            tip.classList.remove('visible');
        });
    });
});
