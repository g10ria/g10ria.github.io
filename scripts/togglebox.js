// <button class="toggle-btn" data-target="#id"> shows/hides the element with that id
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toggle-btn').forEach(function (btn) {
        const target = document.querySelector(btn.dataset.target);
        if (!target) return;
        btn.addEventListener('click', function () {
            const open = target.hidden;
            target.hidden = !open;
            btn.setAttribute('aria-expanded', String(open));
            btn.textContent = open ? '−' : '+'; // minus / plus
        });
    });
});
