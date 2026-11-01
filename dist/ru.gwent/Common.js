/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/* Колода: добавить в MediaWiki:Common.js (без него шаблон тоже работает, через :target) */
mw.hook('wikipage.content').add(function ($content) {
	$content.find('.gd-wrap').each(function () {
		var wrap = this, $wrap = $(this), justClicked = false;
		$wrap.addClass('gd-js');

		function show(id) {
			var target = document.getElementById(id);
			if (!target || target.parentNode !== wrap) { return null; }
			var oldMid = $wrap.children('.gd-state').filter(function () { return this.style.display !== 'none'; }).find('.gd-mid')[0];
			var scroll = oldMid ? oldMid.scrollTop : 0;
			$wrap.children('.gd-state').each(function () {
				this.style.display = (this === target) ? 'block' : 'none';
			});
			var mid = $(target).find('.gd-mid')[0];
			if (mid) { mid.scrollTop = scroll; }
			return target;
		}

		function clearGreen() { $wrap.find('.gd-green').removeClass('gd-green'); }

		// клик по кнопке: открыть состояние, новую кнопку подсветить зелёным
		$wrap.on('click', 'a[href^="#gd-"]', function (e) {
			e.preventDefault();
			var target = show(this.getAttribute('href').slice(1));
			if (!target) { return; }
			clearGreen();
			$(target).find('.gd-new').addClass('gd-green');
			justClicked = true;
		});

		// клик в любое другое место: зелёное становится жёлтым (выбрано)
		$(document).on('click', function () {
			if (justClicked) { justClicked = false; return; }
			clearGreen();
		});

		// если открыли страницу со ссылкой вида #gd-a-armor
		var hash = (location.hash || '').slice(1);
		if (hash.indexOf('gd-') === 0 && show(hash)) {
			history.replaceState(null, '', location.pathname + location.search);
		}
	});
});

/**
 * Gwent Card List — живой поиск
 * Добавить в MediaWiki:Common.js
 *
 * Работает с разметкой, которую выдаёт Модуль:Список карт:
 *   .gwent-cardlist
 *     .gwent-cardlist-search   ← сюда вставляется <input>
 *     .gwent-cardlist-scroll
 *       .gwent-cardlist-card[data-name="..."]
 *       .gwent-cardlist-empty
 */
(function () {
	'use strict';

	function normalize(str) {
		return (str || '')
			.toLowerCase()
			.replace(/ё/g, 'е')
			.trim();
	}

	function initCardList(root) {
		var searchBox = root.querySelector('.gwent-cardlist-search');
		var scrollBox = root.querySelector('.gwent-cardlist-scroll');
		if (!searchBox || !scrollBox) return;

		// Уже инициализирован
		if (searchBox.querySelector('input')) return;

		var cards = Array.prototype.slice.call(
			scrollBox.querySelectorAll('.gwent-cardlist-card')
		);
		var emptyMsg = scrollBox.querySelector('.gwent-cardlist-empty');

		// Создаём поле
		var input = document.createElement('input');
		input.type = 'search';
		input.placeholder = 'Поиск по названию...';
		input.setAttribute('autocomplete', 'off');
		input.setAttribute('spellcheck', 'false');
		searchBox.appendChild(input);

		function filter() {
			var q = normalize(input.value);
			var visible = 0;

			for (var i = 0; i < cards.length; i++) {
				var card = cards[i];
				var name = card.getAttribute('data-name') || '';
				var tags = card.getAttribute('data-tags') || '';
				// Ищем и по названию, и по тегам
				var match = !q || name.indexOf(q) !== -1 || tags.indexOf(q) !== -1;

				if (match) {
					card.classList.remove('is-hidden');
					visible++;
				} else {
					card.classList.add('is-hidden');
				}
			}

			if (emptyMsg) {
				emptyMsg.style.display = (visible === 0 && q) ? 'block' : 'none';
			}
		}

		input.addEventListener('input', filter);
		input.addEventListener('search', filter); // крестик очистки в type=search
	}

	function initAll() {
		var lists = document.querySelectorAll('.gwent-cardlist');
		for (var i = 0; i < lists.length; i++) {
			initCardList(lists[i]);
		}
	}

	// MediaWiki
	if (typeof mw !== 'undefined' && mw.hook) {
		mw.hook('wikipage.content').add(function ($content) {
			// $content может быть jQuery-объектом
			var root = ($content && $content[0]) ? $content[0] : document;
			var lists = root.querySelectorAll
				? root.querySelectorAll('.gwent-cardlist')
				: [];
			for (var i = 0; i < lists.length; i++) {
				initCardList(lists[i]);
			}
		});
	} else {
		// На всякий случай
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', initAll);
		} else {
			initAll();
		}
	}
})();

/* ==========================================================
   КНИГА НАГРАД — вставить в MediaWiki:Common.js
   Переключение вкладок, якоря #gb-<id>, управление с клавиатуры.
   ========================================================== */
mw.hook('wikipage.content').add(function ($content) {
	'use strict';
	var root = $content && $content[0] ? $content[0] : document;
	var books = root.querySelectorAll('.gb-book');

	Array.prototype.forEach.call(books, function (book) {
		if (book.className.indexOf('gb-js') > -1) { return; }

		var pages = [], tabs = [];
		Array.prototype.forEach.call(book.children, function (el) {
			if (el.hasAttribute('data-gb-page')) { pages.push(el); }
			else if (el.hasAttribute('data-gb-tab')) { tabs.push(el); }
		});
		if (!pages.length) { return; }

		function show(id, updateHash) {
			pages.forEach(function (p) {
				var on = p.getAttribute('data-gb-page') === id;
				p.classList.toggle('gb-active', on);
			});
			tabs.forEach(function (t) {
				var on = t.getAttribute('data-gb-tab') === id;
				t.classList.toggle('gb-active', on);
				t.setAttribute('aria-selected', on ? 'true' : 'false');
			});
			if (updateHash && window.history && history.replaceState) {
				history.replaceState(null, '', '#gb-' + encodeURIComponent(id));
			}
		}

		function has(id) {
			return pages.some(function (p) { return p.getAttribute('data-gb-page') === id; });
		}

		tabs.forEach(function (t, i) {
			t.setAttribute('role', 'tab');
			t.setAttribute('tabindex', '0');
			t.addEventListener('click', function () { show(t.getAttribute('data-gb-tab'), true); });
			t.addEventListener('keydown', function (e) {
				var k = e.key, j = -1;
				if (k === 'Enter' || k === ' ') { e.preventDefault(); show(t.getAttribute('data-gb-tab'), true); return; }
				if (k === 'ArrowRight') { j = (i + 1) % tabs.length; }
				if (k === 'ArrowLeft')  { j = (i - 1 + tabs.length) % tabs.length; }
				if (j > -1) { e.preventDefault(); tabs[j].focus(); show(tabs[j].getAttribute('data-gb-tab'), true); }
			});
		});

		// какой раздел открыть: якорь → gb-active → data-active → первый
		var start = null, m = /^#gb-(.+)$/.exec(window.location.hash || '');
		if (m) {
			try { m = decodeURIComponent(m[1]); } catch (err) { m = m[1]; }
			if (has(m)) { start = m; }
		}
		if (!start) {
			pages.forEach(function (p) {
				if (!start && p.classList.contains('gb-active')) { start = p.getAttribute('data-gb-page'); }
			});
		}
		var da = book.getAttribute('data-active');
		if (!start && da && has(da)) { start = da; }
		if (!start) { start = pages[0].getAttribute('data-gb-page'); }

		book.classList.add('gb-js');
		show(start, false);
	});
});