// hovering a letter swaps it to Yarndings; it reverts REVERT_DELAY ms after the mouse leaves it
(function () {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const REVERT_DELAY = 1000;
    const BASE_SCALE = 1.6;  // must match the default --glyph-scale in profile.css
    const MAX_SCALE = BASE_SCALE * 1.5;
    const LEAVE_MS = 300;    // how long the shrink-and-fade takes; must match glyph-leave in header.css
    const SWAP_CHANCE = 0.2; // odds that a letter swaps when the mouse enters it
    const LETTER = /[A-Za-z0-9]/;
    const ENABLED = '.swap-yarndings'; // only text inside an element with this class swaps
    const SKIP = 'script, style, svg, canvas, .yarndings, .cursor-dot, .script-title'; // .script-title: the big project-page heading

    const timers = new Map(); // span -> revert timeout id
    let current = null;       // span currently under the mouse
    let queued = null;        // latest mouse event, handled once per frame
    let skipped = null;       // letter that lost its roll; not re-rolled until the mouse leaves it

    // nearest caret position to a point: {node, offset} or null
    function caretAt(x, y) {
        if (document.caretPositionFromPoint) {
            const p = document.caretPositionFromPoint(x, y);
            return p ? { node: p.offsetNode, offset: p.offset } : null;
        }
        if (document.caretRangeFromPoint) {
            const r = document.caretRangeFromPoint(x, y);
            return r ? { node: r.startContainer, offset: r.startOffset } : null;
        }
        return null;
    }

    function inRect(rect, x, y) {
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    }

    // the caret lands on the nearest boundary, so check the characters on both sides
    function letterRangeAt(node, offset, x, y) {
        for (const start of [offset, offset - 1]) {
            if (start < 0 || start >= node.data.length) continue;
            if (!LETTER.test(node.data[start])) continue;
            const range = document.createRange();
            range.setStart(node, start);
            range.setEnd(node, start + 1);
            for (const rect of range.getClientRects()) {
                if (inRect(rect, x, y)) return range;
            }
        }
        return null;
    }

    function swap(range) {
        const span = document.createElement('span');
        span.className = 'glyph-swap';
        span.style.setProperty('--glyph-scale', (BASE_SCALE + Math.random() * (MAX_SCALE - BASE_SCALE)).toFixed(2));
        span.dataset.char = range.toString(); // drawn by the ::after glyph; the real letter stays in place, invisible
        range.surroundContents(span);
        return span;
    }

    // start the shrink-and-fade, then put the plain letter back once it has finished
    function revert(span) {
        timers.delete(span);
        if (!span.parentNode) return;
        span.classList.add('leaving');
        setTimeout(function () { unwrap(span); }, LEAVE_MS);
    }

    function unwrap(span) {
        if (!span.parentNode) return;
        const parent = span.parentNode;
        span.replaceWith(document.createTextNode(span.textContent));
        parent.normalize();
        if (current === span) current = null;
    }

    function scheduleRevert(span) {
        clearTimeout(timers.get(span));
        timers.set(span, setTimeout(() => revert(span), REVERT_DELAY));
    }

    function spanAt(x, y) {
        const caret = caretAt(x, y);
        if (!caret || caret.node.nodeType !== Node.TEXT_NODE) {
            skipped = null;
            return null;
        }
        const parent = caret.node.parentElement;
        if (!parent || !parent.closest(ENABLED) || (parent.closest(SKIP) && !parent.closest('.glyph-swap'))) {
            skipped = null;
            return null;
        }

        // already swapped: still on it if the mouse is inside its box
        const existing = parent.closest('.glyph-swap');
        if (existing) {
            if (existing.classList.contains('leaving')) return null; // already on its way out
            return inRect(existing.getBoundingClientRect(), x, y) ? existing : null;
        }

        const range = letterRangeAt(caret.node, caret.offset, x, y);
        if (!range) {
            skipped = null;
            return null;
        }
        if (skipped && skipped.node === range.startContainer && skipped.offset === range.startOffset) return null;
        if (Math.random() < SWAP_CHANCE) return swap(range);
        skipped = { node: range.startContainer, offset: range.startOffset };
        return null;
    }

    function handle(e) {
        queued = null;
        const target = spanAt(e.clientX, e.clientY);
        if (target === current) return;
        if (current) scheduleRevert(current);
        current = target;
        if (target) clearTimeout(timers.get(target));
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!['profile-page', 'work-page', 'archive-page', 'left-nav'].some(function (c) { return document.body.classList.contains(c); })) return;

        document.addEventListener('mousemove', function (e) {
            if (!queued) requestAnimationFrame(() => handle(queued));
            queued = e;
        });
        document.addEventListener('mouseleave', function () {
            if (current) scheduleRevert(current);
            current = null;
        });
    });
})();
