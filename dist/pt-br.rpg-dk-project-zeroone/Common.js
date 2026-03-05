(function () {
  function onToggleClick(e) {
    const btn = e.target.closest('.rpgdk-topic__toggle');
    if (!btn) return;

    const sel = btn.getAttribute('data-rpgdk-target');
    if (!sel) return;

    const body = document.querySelector(sel);
    if (!body) return;

    const isCollapsed = body.classList.toggle('is-collapsed');

    const labelShow = btn.getAttribute('data-rpgdk-label-show') || 'Expandir';
    const labelHide = btn.getAttribute('data-rpgdk-label-hide') || 'Ocultar';
    btn.textContent = isCollapsed ? labelShow : labelHide;
  }

  document.addEventListener('click', onToggleClick);
})();