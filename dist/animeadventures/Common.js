(function () {
	'use strict';
	if (window.navButtonGlowLoaded) return;
	window.navButtonGlowLoaded = true;

	var SKIP = /navButton-(Rays_for|Kannonbiraki)/;
	var SHIFT = 7;

	function clamp(v) {
		return v < 0 ? 0 : v > 1 ? 1 : v;
	}

	function findTarget(icon) {
		var custom = icon.closest('.nb-glow-target');
		if (custom) return custom;
		var link = icon.closest('a');
		if (link && link.firstElementChild && link.firstElementChild.contains(icon)) {
			return link.firstElementChild;
		}
		return icon.parentElement;
	}

	function bind(target) {
		if (!target || target.classList.contains('nb-glow')) return;
		target.classList.add('nb-glow');
		if (getComputedStyle(target).position === 'static') {
			target.style.position = 'relative';
		}
		var rgb = getComputedStyle(target).backgroundImage.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
		if (rgb) target.style.setProperty('--nb-glow-rgb', rgb[1] + ', ' + rgb[2] + ', ' + rgb[3]);

		var frame = 0;
		var lastEvent = null;

		function update() {
			frame = 0;
			var r = target.getBoundingClientRect();
			var x = clamp((lastEvent.clientX - r.left) / r.width);
			var y = clamp((lastEvent.clientY - r.top) / r.height);
			var dx = (x - 0.5) * 2;
			var dy = (y - 0.5) * 2;
			var focus = Math.min(1, Math.sqrt(dx * dx + dy * dy) / Math.SQRT2 * 1.2);

			target.style.setProperty('--nb-x', (x * 100).toFixed(1) + '%');
			target.style.setProperty('--nb-y', (y * 100).toFixed(1) + '%');
			target.style.setProperty('--nb-dx', (dx * SHIFT).toFixed(1) + 'px');
			target.style.setProperty('--nb-dy', (dy * SHIFT).toFixed(1) + 'px');
			target.style.setProperty('--nb-focus', focus.toFixed(3));
		}

		target.addEventListener('pointerenter', function (e) {
			if (e.pointerType === 'touch') return;
			target.classList.add('nb-glow--active');
		});
		target.addEventListener('pointermove', function (e) {
			if (e.pointerType === 'touch') return;
			lastEvent = e;
			if (!frame) frame = requestAnimationFrame(update);
		});
		target.addEventListener('pointerleave', function () {
			target.classList.remove('nb-glow--active');
		});
	}


	function init() {
		var icons = document.querySelectorAll('[class*="navButton-"]');
		for (var i = 0; i < icons.length; i++) {
			if (SKIP.test(icons[i].className)) continue;
			bind(findTarget(icons[i]));
		}
	}

	$(init);
	mw.hook('wikipage.content').add(init);
})();

(function () {
	'use strict';
	if (window.tierListSearchLoaded) return;
	window.tierListSearchLoaded = true;

	function normalize(s) {
		return s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
	}

	function unitName(item) {
		var link = item.querySelector('a[href*="/wiki/"]');
		if (!link) return '';
		var page = link.getAttribute('href').split('/wiki/')[1] || '';
		return normalize(decodeURIComponent(page.split('#')[0]).replace(/_/g, ' '));
	}

	function init() {
		var root = document;
		var lists = root.querySelectorAll('.tierList_container');
		if (!lists.length || root.querySelector('.tl-search')) return;

		var items = [];
		var rows = root.querySelectorAll('.tierList_containerItem');
		for (var i = 0; i < rows.length; i++) {
			var kids = rows[i].querySelector('.tierList_containerItem__container').children;
			for (var j = 0; j < kids.length; j++) {
				if (kids[j].classList.contains('tierList_item')) continue;
				items.push({ el: kids[j], row: rows[i], name: unitName(kids[j]) });
			}
		}

		var box = document.createElement('div');
		box.className = 'tl-search';
		box.innerHTML =
			'<input class="tl-search__input" type="search" placeholder="Search units...  ( / )" aria-label="Search units in the tier list" autocomplete="off">' +
			'<span class="tl-search__count" aria-live="polite"></span>';
		var input = box.firstChild;
		var count = box.lastChild;

		var anchor = lists[0].closest('.portable-infobox') || lists[0];
		anchor.parentNode.insertBefore(box, anchor);

		function filter() {
			var q = normalize(input.value);
			var hits = 0;
			var rowHits = [];
			for (var i = 0; i < items.length; i++) {
				var match = !q || items[i].name.indexOf(q) !== -1;
				items[i].el.classList.toggle('tl-dim', !match);
				items[i].el.classList.toggle('tl-hit', !!q && match);
				if (match) {
					hits++;
					rowHits.push(items[i].row);
				}
			}
			for (var r = 0; r < rows.length; r++) {
				rows[r].classList.toggle('tl-row-empty', !!q && rowHits.indexOf(rows[r]) === -1);
			}
			box.classList.toggle('tl-search--active', !!q);
			count.textContent = q ? hits + (hits === 1 ? ' match' : ' matches') : '';
		}

		input.addEventListener('input', filter);
		input.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				input.value = '';
				filter();
				input.blur();
			}
		});
		document.addEventListener('keydown', function (e) {
			var tag = (document.activeElement || {}).tagName;
			if (e.key !== '/' || tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement.isContentEditable) return;
			e.preventDefault();
			input.focus();
		});
	}

	$(init);
	mw.hook('wikipage.content').add(init);
})();