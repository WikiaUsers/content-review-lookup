/* Any JavaScript here will be loaded for all users on every page load.  */
(function () {
  function build() {
    var hive = document.querySelector('.hive');
    if (!hive) return;
    var cells = [].slice.call(hive.querySelectorAll('.hive-cell'));
    if (!cells.length) return;

    var pattern = (hive.getAttribute('data-pattern') || '3,4,3,4,3').split(',').map(Number);
    var maxCap = Math.max.apply(null, pattern);

    // ordem de preenchimento: coluna a coluna, da esquerda pra direita
    var slots = [];
    pattern.forEach(function (cap, r) {
      var off = (cap === maxCap) ? 0 : 0.75;      // fileiras menores recuam meia-coluna
      for (var j = 0; j < cap; j++) slots.push({ r: r, x: off + j * 1.5 });
    });
    slots.sort(function (a, b) { return (a.x - b.x) || (a.r - b.r); });

    var used = slots.slice(0, cells.length);
    var maxX = 0, maxR = 0;
    used.forEach(function (s) { if (s.x > maxX) maxX = s.x; if (s.r > maxR) maxR = s.r; });

    var avail = hive.parentElement ? hive.parentElement.clientWidth : 1000;
    var w = Math.max(80, Math.min(180, Math.floor(avail / (maxX + 1))));  // escala p/ caber, sem scroll
    var h = Math.round(w * 0.866);

    hive.style.width  = ((maxX + 1) * w) + 'px';
    hive.style.height = (maxR * 0.5 * h + h) + 'px';
    hive.style.setProperty('--w', w + 'px');

    cells.forEach(function (c, i) {
      var s = used[i]; if (!s) return;
      c.style.width  = w + 'px';
      c.style.height = h + 'px';
      c.style.left   = (s.x * w) + 'px';
      c.style.top    = (s.r * 0.5 * h) + 'px';
    });
  }

  if (document.readyState !== 'loading') build();
  else document.addEventListener('DOMContentLoaded', build);
  window.addEventListener('resize', build);
  if (window.mw && mw.hook) mw.hook('wikipage.content').add(build);  // recarrega no preview do Fandom
})();