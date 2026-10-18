/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
mw.hook('wikipage.content').add(function ($content) {
	var root = $content.find('.tnt-codex').get(0);
	var holder = root && root.querySelector('#tnt-filter');
	if (!holder || holder.hasChildNodes()) {
		return;
	}

	var norm = function (s) {
		return s.toLowerCase().replace(/ё/g, 'е');
	};

	var blocks = [].slice.call(root.querySelectorAll('h2, h3, .tnt-cards'));

	var items = [].slice.call(root.querySelectorAll('.tnt-card')).map(function (el) {
		var titles = [].map.call(el.querySelectorAll('a[title]'), function (a) {
			return a.getAttribute('title');
		});
		titles.push(el.getAttribute('title') || '');
		return { el: el, text: norm(el.textContent + ' ' + titles.join(' ')) };
	});

	var input = document.createElement('input');
	input.type = 'search';
	input.className = 'tnt-search-input';
	input.placeholder = 'Найти персонажа по имени…';
	input.setAttribute('aria-label', 'Поиск по кодексу');

	var meta = document.createElement('div');
	meta.className = 'tnt-search-meta';

	var empty = document.createElement('div');
	empty.className = 'tnt-empty';
	empty.textContent = 'Никого не нашлось. Попробуй другое имя.';

	holder.appendChild(input);
	holder.appendChild(meta);
	root.appendChild(empty);

	blocks.forEach(function (b) {
		if (b.tagName === 'H2') {
			b.badge = document.createElement('span');
			b.badge.className = 'tnt-count';
			b.appendChild(b.badge);
		}
	});

	function update() {
		var q = norm(input.value.trim());
		var shown = 0;

		items.forEach(function (it) {
			var ok = !q || it.text.indexOf(q) !== -1;
			it.el.classList.toggle('tnt-hidden', !ok);
			if (ok) {
				shown++;
			}
		});

		var heads = [];
		var h2 = null;
		var h3 = null;

		blocks.forEach(function (b) {
			if (b.tagName === 'H2') {
				h2 = { el: b, n: 0 };
				h3 = null;
				heads.push(h2);
			} else if (b.tagName === 'H3') {
				h3 = { el: b, n: 0 };
				heads.push(h3);
			} else {
				var n = b.querySelectorAll('.tnt-card:not(.tnt-hidden)').length;
				var label = null;
				var any = false;
				[].forEach.call(b.querySelectorAll('.tnt-grp, .tnt-card'), function (el) {
					if (el.classList.contains('tnt-grp')) {
						if (label) {
							label.classList.toggle('tnt-hidden', !any);
						}
						label = el;
						any = false;
					} else if (!el.classList.contains('tnt-hidden')) {
						any = true;
					}
				});
				if (label) {
					label.classList.toggle('tnt-hidden', !any);
				}
				b.classList.toggle('tnt-hidden', n === 0);
				if (h2) {
					h2.n += n;
				}
				if (h3) {
					h3.n += n;
				}
			}
		});

		heads.forEach(function (h) {
			h.el.classList.toggle('tnt-hidden', h.n === 0);
			if (h.el.badge) {
				h.el.badge.textContent = h.n;
			}
		});

		meta.textContent = q
			? 'Найдено: ' + shown + ' из ' + items.length
			: 'Всего персонажей: ' + items.length;
		empty.style.display = shown ? 'none' : 'block';
	}

	input.addEventListener('input', update);
	input.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			input.value = '';
			update();
		}
	});

	update();
});

(function () {
	if (window.tntUiLoaded) return;
	window.tntUiLoaded = true;

	var topBtn = document.createElement('button');
	topBtn.id = 'tnt-to-top';
	topBtn.type = 'button';
	topBtn.setAttribute('aria-label', 'Наверх');
	topBtn.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg>';
	document.body.appendChild(topBtn);

	function toggleTop() {
		topBtn.classList.toggle('tnt-to-top--show', window.pageYOffset > 400);
	}
	window.addEventListener('scroll', toggleTop, { passive: true });
	toggleTop();
	topBtn.addEventListener('click', function () {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	if (window.matchMedia('(hover: none)').matches) return;

	var cache = {};
	var current = null;
	var showTimer = 0;
	var hideTimer = 0;
	var box = document.createElement('div');
	box.className = 'tnt-preview';
	document.body.appendChild(box);

	function titleOf(a) {
		if (!a.closest('.page-content')) return null;
		if (a.classList.contains('new') || a.classList.contains('image')) return null;
		if (a.closest('.toc, .navibox, .tnt-btns, .tnt-jump, .mw-editsection, .tnt-preview')) return null;
		var m = (a.getAttribute('href') || '').match(/^\/ru\/wiki\/([^#?]+)/);
		if (!m) return null;
		var t;
		try {
			t = decodeURIComponent(m[1]);
		} catch (err) {
			return null;
		}
		if (t.indexOf(':') !== -1) return null;
		if (t === mw.config.get('wgPageName')) return null;
		return t;
	}

	function color(v) {
		return v && /^#[0-9a-f]{3,8}$/i.test(v.trim()) ? v.trim() : null;
	}

	function load(title) {
		if (cache[title]) return cache[title];
		var url = mw.util.wikiScript('api') +
			'?action=parse&format=json&redirects=1&prop=text&section=0&disablelimitreport=1&page=' +
			encodeURIComponent(title);
		cache[title] = fetch(url, { credentials: 'same-origin' })
			.then(function (r) { return r.json(); })
			.then(function (d) {
				if (!d.parse) return null;
				var doc = new DOMParser().parseFromString(d.parse.text['*'], 'text/html');
				var host = doc.querySelector('.tnt-character-page');
				var st = (host && host.getAttribute('style')) || '';
				var c1 = color((st.match(/--c1:\s*([^;]+)/) || [])[1]);
				var c2 = color((st.match(/--c2:\s*([^;]+)/) || [])[1]);

				var img = null;
				var im = doc.querySelector('.portable-infobox img');
				if (im) {
					var src = im.getAttribute('data-src') || im.getAttribute('src') || '';
					if (/^https:\/\//.test(src)) img = src;
				}

				var junk = doc.querySelectorAll('sup, style, script, table, aside, .toc, .tnt-cards, .tnt-tags, .tnt-quote, .tnt-warn, .tnt-character-mark, .tnt-term-mark');
				for (var i = 0; i < junk.length; i++) junk[i].parentNode.removeChild(junk[i]);

				var text = '';
				var cands = doc.querySelectorAll('.tnt-character-intro, .tnt-term-body, .tnt-text p, p');
				for (var j = 0; j < cands.length; j++) {
					var s = cands[j].textContent.replace(/\s+/g, ' ').trim();
					if (s.length > 40) {
						text = s;
						break;
					}
				}
				if (!text) return null;
				if (text.length > 300) {
					text = text.slice(0, 300);
					text = text.slice(0, text.lastIndexOf(' ')) + '…';
				}
				return { title: d.parse.title, text: text, img: img, c1: c1, c2: c2 };
			})
			.catch(function () {
				return null;
			});
		return cache[title];
	}

	function render(data) {
		box.textContent = '';
		box.style.setProperty('--c1', data.c1 || '#c100ff');
		box.style.setProperty('--c2', data.c2 || '#007cc2');
		if (data.img) {
			var im = document.createElement('img');
			im.src = data.img;
			im.alt = '';
			box.appendChild(im);
		}
		var body = document.createElement('div');
		body.className = 'tnt-preview-body';
		var h = document.createElement('div');
		h.className = 'tnt-preview-title';
		h.textContent = data.title;
		var p = document.createElement('div');
		p.className = 'tnt-preview-text';
		p.textContent = data.text;
		body.appendChild(h);
		body.appendChild(p);
		box.appendChild(body);
	}

	function place(a) {
		var r = a.getBoundingClientRect();
		var bw = box.offsetWidth;
		var bh = box.offsetHeight;
		var left = Math.min(Math.max(8, r.left), window.innerWidth - bw - 8);
		var top = r.top - bh - 8;
		if (top < 8) top = r.bottom + 8;
		box.style.left = left + 'px';
		box.style.top = top + 'px';
	}

	function open(a, title) {
		current = a;
		load(title).then(function (data) {
			if (current !== a || !data) return;
			render(data);
			place(a);
			box.classList.add('tnt-preview--show');
		});
	}

	function hide() {
		current = null;
		box.classList.remove('tnt-preview--show');
	}

	function scheduleHide() {
		clearTimeout(showTimer);
		clearTimeout(hideTimer);
		hideTimer = setTimeout(hide, 250);
	}

	document.addEventListener('mouseover', function (e) {
		var t = e.target;
		if (box.contains(t)) {
			clearTimeout(hideTimer);
			return;
		}
		var a = t.closest ? t.closest('a') : null;
		var title = a ? titleOf(a) : null;
		if (!title) {
			scheduleHide();
			return;
		}
		clearTimeout(hideTimer);
		if (a === current) return;
		clearTimeout(showTimer);
		showTimer = setTimeout(function () {
			open(a, title);
		}, 350);
	});

	window.addEventListener('scroll', hide, { passive: true });
})();

(function () {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	function rnd(a, b) {
		return a + Math.random() * (b - a);
	}

	function fill(hero) {
		if (hero.querySelector('.tnt-bubbles')) return;
		var wrap = document.createElement('div');
		wrap.className = 'tnt-bubbles';
		wrap.setAttribute('aria-hidden', 'true');
		var n = window.innerWidth < 700 ? 12 : 24;
		for (var i = 0; i < n; i++) {
			var b = document.createElement('span');
			var d = rnd(10, 22);
			b.className = 'tnt-bubble';
			b.style.setProperty('--s', rnd(6, 26).toFixed(1) + 'px');
			b.style.setProperty('--x', rnd(2, 96).toFixed(1) + '%');
			b.style.setProperty('--d', d.toFixed(1) + 's');
			b.style.setProperty('--delay', '-' + rnd(0, d).toFixed(1) + 's');
			b.style.setProperty('--sway', rnd(8, 28).toFixed(0) + 'px');
			b.style.setProperty('--sd', rnd(3, 6).toFixed(1) + 's');
			b.style.setProperty('--a', rnd(0.35, 0.9).toFixed(2));
			wrap.appendChild(b);
		}
		hero.insertBefore(wrap, hero.firstChild);
	}

	mw.hook('wikipage.content').add(function () {
		var heroes = document.querySelectorAll('.tnt-hero');
		for (var i = 0; i < heroes.length; i++) fill(heroes[i]);
	});
})();

(function () {
	if (window.tntFxLoaded) return;
	window.tntFxLoaded = true;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (!('IntersectionObserver' in window)) return;

	var REVEAL = '.tnt-home .tnt-card, .tnt-character-page .tnt-card, .tnt-book, .tnt-home .tnt-panel, .tnt-rel, .tnt-quote, .tnt-term, .tnt-warn, .tnt-example, .tnt-lore-card';
	var WIPE = '.tnt-home h2.tnt-h, .tnt-character-page h2:not(.pi-item), .tnt-codex h2';

	var timelines = [];
	var ticking = false;

	function done(e) {
		var el = e.currentTarget;
		if (e.target !== el || e.animationName !== 'tnt-reveal') return;
		el.classList.remove('tnt-reveal', 'tnt-reveal-in');
		el.style.removeProperty('--rd');
		el.removeEventListener('animationend', done);
	}

	var io = new IntersectionObserver(function (entries) {
		var shown = 0;
		for (var i = 0; i < entries.length; i++) {
			if (!entries[i].isIntersecting) continue;
			var el = entries[i].target;
			io.unobserve(el);
			el.style.setProperty('--rd', Math.min(shown, 8) * 70 + 'ms');
			shown++;
						el.classList.add('tnt-reveal-in');
		}
	}, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });

	function mark(selector, cls) {
		var nodes = document.querySelectorAll(selector);
		for (var i = 0; i < nodes.length; i++) {
			var el = nodes[i];
			if (el.tntFx) continue;
			el.tntFx = 1;
			el.classList.add(cls);
			el.addEventListener('animationend', done);
			io.observe(el);
		}
	}

	function tl() {
		ticking = false;
		var mid = window.innerHeight * 0.55;
		for (var i = 0; i < timelines.length; i++) {
			var t = timelines[i];
			var r = t.getBoundingClientRect();
			var p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
			t.style.setProperty('--tl', (p * 100).toFixed(1) + '%');
			var items = t.querySelectorAll('.tnt-tl-item');
			for (var j = 0; j < items.length; j++) {
				items[j].classList.toggle('tnt-lit', items[j].getBoundingClientRect().top < mid);
			}
		}
	}

	function onScroll() {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(tl);
	}

	function prepare() {
		mark(REVEAL, 'tnt-reveal');
				mark(WIPE, 'tnt-reveal');
		var lines = document.querySelectorAll('.tnt-timeline');
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].tntFx) continue;
			lines[i].tntFx = 1;
			lines[i].classList.add('tnt-tl-js');
			timelines.push(lines[i]);
		}
		tl();
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);
	mw.hook('wikipage.content').add(prepare);
})();