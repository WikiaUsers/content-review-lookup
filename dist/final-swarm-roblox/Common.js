document.addEventListener('click', function (e) {
    var btn = e.target.closest('.aio-btn');
    if (!btn) return;

    var tabber = btn.closest('.aio-tabber');
    if (!tabber) return;

    var buttons = tabber.querySelectorAll('.aio-btn');
    var panels = tabber.querySelectorAll('.aio-panel');

    buttons.forEach(function (b) { b.classList.remove('active'); });
    panels.forEach(function (p) { p.classList.remove('active'); });

    btn.classList.add('active');
    var target = tabber.querySelector('.aio-panel[data-panel="' + btn.dataset.tab + '"]');
    if (target) target.classList.add('active');
});