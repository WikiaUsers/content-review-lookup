/* Any JavaScript here will be loaded for all users on every page load. */

/* ===== Hive navigator ===== */
(function () {
  function build() {
    var hive = document.querySelector('.hive');
    if (!hive) return;
    var cells = [].slice.call(hive.querySelectorAll('.hive-cell'));
    if (!cells.length) return;

    var pattern = (hive.getAttribute('data-pattern') || '3,4,3,4,3').split(',').map(Number);
    var maxCap = Math.max.apply(null, pattern);

    var slots = [];
    pattern.forEach(function (cap, r) {
      var off = (cap === maxCap) ? 0 : 0.75;
      for (var j = 0; j < cap; j++) slots.push({ r: r, x: off + j * 1.5 });
    });
    slots.sort(function (a, b) { return (a.x - b.x) || (a.r - b.r); });

    var used = slots.slice(0, cells.length);
    var maxX = 0, maxR = 0;
    used.forEach(function (s) { if (s.x > maxX) maxX = s.x; if (s.r > maxR) maxR = s.r; });

    var avail = hive.parentElement ? hive.parentElement.clientWidth : 1000;
    var w = Math.max(80, Math.min(180, Math.floor(avail / (maxX + 1))));
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
  if (window.mw && mw.hook) mw.hook('wikipage.content').add(build);
})();

/* ===== GPO item grid — busca + filtro de raridade (sem popup JS) ===== */
(function () {
	var RMAP = {common:'Common',uncommon:'Uncommon',rare:'Rare',rarechroma:'Rare Chroma',epic:'Epic',legendary:'Legendary',legendarychroma:'Legendary Chroma',mythical:'Mythical',collectable:'Collectable'};
	var RORDER = ['common','uncommon','rare','rarechroma','epic','legendary','legendarychroma','mythical','collectable'];

	function initGrids() {
		var grids = document.querySelectorAll('.gpo-item-grid');
		if (!grids.length) return;

		Array.prototype.forEach.call(grids, function (grid) {
			if (grid.dataset.gpoSearch) return;   // don't re-init
			grid.dataset.gpoSearch = '1';

			var cards = grid.querySelectorAll('.gpo-item-card');
			var present = {};

			Array.prototype.forEach.call(cards, function (card) {
				var frame = card.querySelector('.gpo-item-frame');
				var rar = 'common';
				if (frame) { var m = frame.className.match(/gpo-r-([a-z]+)/); if (m) rar = m[1]; }
				card.dataset.rarity = rar;
				present[rar] = true;
				// search text = item name + popup content (still in the card via CSS)
				card.dataset.search = card.textContent.replace(/\s+/g, ' ').toLowerCase();
			});

			var bar = document.createElement('div'); bar.className = 'gpo-controls';
			var search = document.createElement('input');
			search.type = 'text'; search.placeholder = 'Search...'; search.className = 'gpo-search';
			var sel = document.createElement('select'); sel.className = 'gpo-rarity';
			var oAll = document.createElement('option'); oAll.value = 'all'; oAll.textContent = 'All';
			sel.appendChild(oAll);
			RORDER.forEach(function (r) {
				if (present[r]) { var o = document.createElement('option'); o.value = r; o.textContent = RMAP[r]; sel.appendChild(o); }
			});
			bar.appendChild(search); bar.appendChild(sel);
			grid.parentNode.insertBefore(bar, grid);

			var none = document.createElement('div');
			none.className = 'gpo-noresults'; none.textContent = 'No items found'; none.style.display = 'none';
			grid.parentNode.insertBefore(none, grid.nextSibling);

			function apply() {
				var q = search.value.trim().toLowerCase(), rr = sel.value, vis = 0;
				Array.prototype.forEach.call(cards, function (card) {
					var ok = (rr === 'all' || card.dataset.rarity === rr) &&
					         (!q || card.dataset.search.indexOf(q) !== -1);
					card.style.display = ok ? '' : 'none';
					if (ok) vis++;
				});
				none.style.display = vis ? 'none' : 'block';
			}
			search.addEventListener('input', apply);
			sel.addEventListener('change', apply);
		});
	}

	if (window.mw && mw.hook) mw.hook('wikipage.content').add(initGrids);
	else if (document.readyState !== 'loading') initGrids();
	else document.addEventListener('DOMContentLoaded', initGrids);
})();

/* ===== Trade Guide — click-to-open modal + category filter =====
   Reuses .gpo-item-card (same visuals). Grid must have class tg-click-mode. */
(function () {
	function init() {
		var grids = document.querySelectorAll('.gpo-item-grid.tg-click-mode');
		if (!grids.length) return;

		// click a card to open/close its popup; click inside popup keeps it open; click outside closes
		document.querySelectorAll('.gpo-item-grid.tg-click-mode .gpo-item-card').forEach(function (card) {
			if (card.dataset.tgInit) return; card.dataset.tgInit = '1';
			card.addEventListener('click', function (e) {
			    if (e.target.closest('.gpo-item-popup')) return;
			    e.preventDefault();
			    var wasOpen = card.classList.contains('tg-open');
			    document.querySelectorAll('.gpo-item-card.tg-open').forEach(function (c) { c.classList.remove('tg-open'); });
			    if (!wasOpen) card.classList.add('tg-open');
			});
		});
		if (!document.body.dataset.tgOutside) {
			document.body.dataset.tgOutside = '1';
			document.addEventListener('click', function (e) {
				if (!e.target.closest('.gpo-item-card')) {
					document.querySelectorAll('.gpo-item-card.tg-open').forEach(function (c) { c.classList.remove('tg-open'); });
				}
			});
		}

		// inject a category filter per trade grid (search bar comes from the item-grid script)
		grids.forEach(function (grid) {
			if (grid.dataset.tgCat) return; grid.dataset.tgCat = '1';
			var cards = grid.querySelectorAll('.gpo-item-card');
			var cats = {};
			cards.forEach(function (c) {
				var w = c.closest('.tg-item') || c.parentElement;
				var cat = (w && w.dataset && w.dataset.cat) || '';
				c.dataset.tgcat = cat;
				if (cat) cats[cat] = 1;
			});
			var order = ['weapon', 'fruit', 'accessory', 'cosmetic', 'item'];
			var sel = document.createElement('select'); sel.className = 'gpo-rarity tg-cat';
			var all = document.createElement('option'); all.value = 'all'; all.textContent = 'All categories'; sel.appendChild(all);
			order.forEach(function (c) { if (cats[c]) { var o = document.createElement('option'); o.value = c; o.textContent = c.charAt(0).toUpperCase() + c.slice(1); sel.appendChild(o); } });

			// place the category select next to the search bar the item-grid script injects
			var bar = grid.previousElementSibling;
			if (bar && bar.classList.contains('gpo-controls')) bar.appendChild(sel);
			else grid.parentNode.insertBefore(sel, grid);

			sel.addEventListener('change', function () {
				var c = sel.value;
				cards.forEach(function (card) {
					card.style.display = (c === 'all' || card.dataset.tgcat === c) ? '' : 'none';
				});
			});
		});
	}
	if (window.mw && mw.hook) mw.hook('wikipage.content').add(init);
	else if (document.readyState !== 'loading') init();
	else document.addEventListener('DOMContentLoaded', init);
})();