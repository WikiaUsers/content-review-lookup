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

/* ===== ЗАГЛАВНАЯ: НОВЫЕ КАРТЫ + ПОИСК С ПОДСКАЗКАМИ ===== */
/* Вставить в конец MediaWiki:Common.js (если там уже есть код, старый блок поиска заменить этим). */
$(function () {
  var apiUrl  = mw.config.get('wgScriptPath') + '/api.php';
  var artPath = mw.config.get('wgArticlePath');

  function pageUrl(title) {
    return artPath.replace('$1', encodeURIComponent(title.replace(/ /g, '_')).replace(/%3A/gi, ':'));
  }
  function searchUrl(q) {
    return artPath.replace('$1', 'Special:Search') + '?query=' + encodeURIComponent(q);
  }
  function norm(s) {
    return String(s).toLowerCase().replace(/ё/g, 'е');
  }

  /* ---------- НОВЫЕ КАРТЫ (по дате добавления в категорию, т.е. создания карты) ---------- */
  var FAC = {
    'Чудовища': '#b8321f', 'Королевства Севера': '#2a6bb0', "Скоя'таэли": '#4f8a35',
    'Скеллиге': '#6a58a0', 'Нильфгаард': '#6a6a6a', 'Синдикат': '#e07b22', 'Нейтральные': '#9a6b34'
  };
  var CAT_PREFIX = 'Категория:';

  function barBg(cats) {
    var f = [], i, name;
    for (i = 0; i < cats.length; i++) {
      name = cats[i].title.replace(/^[^:]+:/, '');
      if (FAC[name]) { f.push(name); }
    }
    if (!f.length) { return '#05db96'; }
    if (f.length > 1) {
      // у двойных карт слева всегда Синдикат
      if (f[1] === 'Синдикат') { f = [f[1], f[0]]; }
      return 'linear-gradient(90deg,' + FAC[f[0]] + ' 50%,' + FAC[f[1]] + ' 50%)';
    }
    return FAC[f[0]];
  }

  function buildCard(c) {
    var card = document.createElement('div');
    card.className = 'kd-card';

    var imgBox = document.createElement('div');
    imgBox.className = 'kd-img';
    var a = document.createElement('a');
    a.href = pageUrl(c.title);
    a.title = c.title;
    var img = document.createElement('img');
    img.alt = c.title;
    img.src = artPath.replace('$1', 'Special:FilePath/' + encodeURIComponent(c.title + '-Обычный.png')) + '?width=260';
    img.onerror = function () {
      img.onerror = null;
      var ph = document.createElement('div');
      ph.className = 'kd-noimg';
      ph.textContent = '◆';
      if (img.parentNode) { img.parentNode.replaceChild(ph, img); }
    };
    a.appendChild(img);
    imgBox.appendChild(a);

    var nm = document.createElement('div');
    nm.className = 'kd-name';
    var na = document.createElement('a');
    na.href = pageUrl(c.title);
    na.textContent = c.title;
    nm.appendChild(na);

    var bar = document.createElement('div');
    bar.className = 'kd-bar';
    bar.style.background = barBg(c.cats);

    card.appendChild(imgBox);
    card.appendChild(nm);
    card.appendChild(bar);
    return card;
  }

  function loadNew(el) {
    var cat = el.getAttribute('data-cat') || 'Карта';
    var limit = parseInt(el.getAttribute('data-limit'), 10) || 8;
    var facCats = [CAT_PREFIX + 'Символ'], k;
    for (k in FAC) { if (FAC.hasOwnProperty(k)) { facCats.push(CAT_PREFIX + k); } }

    $.getJSON(apiUrl, {
      action: 'query',
      format: 'json',
      generator: 'categorymembers',
      gcmtitle: CAT_PREFIX + cat,
      gcmnamespace: 0,
      gcmsort: 'timestamp',
      gcmdir: 'desc',
      gcmlimit: limit + 10,
      prop: 'categories',
      cllimit: 'max',
      clcategories: facCats.join('|')
    }).done(function (r) {
      if (!r || !r.query || !r.query.pages) { return; }
      var list = [], id, p, j, cats, isToken;
      for (id in r.query.pages) {
        if (!r.query.pages.hasOwnProperty(id)) { continue; }
        p = r.query.pages[id];
        cats = p.categories || [];
        isToken = false;
        for (j = 0; j < cats.length; j++) {
          if (cats[j].title === CAT_PREFIX + 'Символ') { isToken = true; }
        }
        if (!isToken) { list.push({ title: p.title, index: p.index || 0, cats: cats }); }
      }
      list.sort(function (x, y) { return x.index - y.index; });
      list = list.slice(0, limit);
      if (!list.length) { return; }
      el.innerHTML = '';
      for (j = 0; j < list.length; j++) { el.appendChild(buildCard(list[j])); }
    });
  }

  var autos = document.querySelectorAll('.kd-new[data-cat]');
  var z;
  for (z = 0; z < autos.length; z++) { loadNew(autos[z]); }

  /* ---------- ПОИСК ---------- */
  var boxes = document.querySelectorAll('.mp-search');
  if (!boxes.length) { return; }

  function setup(box) {
    box.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.className = 'mp-sb';
    wrap.innerHTML =
      '<svg class="mp-sb-ico" viewBox="0 0 24 24" fill="none" stroke="#05db96" stroke-width="2" stroke-linecap="round">' +
      '<circle cx="10.5" cy="10.5" r="6.5"></circle><line x1="15.5" y1="15.5" x2="21" y2="21"></line></svg>';

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'mp-sb-in';
    input.placeholder = 'Найти карту или статью…';
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('aria-label', 'Поиск по вики');

    var clear = document.createElement('button');
    clear.type = 'button';
    clear.className = 'mp-sb-x';
    clear.setAttribute('aria-label', 'Очистить');
    clear.innerHTML = '&times;';

    var dd = document.createElement('div');
    dd.className = 'mp-sb-dd';

    wrap.appendChild(input);
    wrap.appendChild(clear);
    wrap.appendChild(dd);
    box.appendChild(wrap);

    var items = [];
    var active = -1;
    var token = 0;
    var timer = null;

    function setState() {
      var cls = 'mp-sb';
      if (input.value) { cls += ' mp-has'; }
      if (dd.firstChild && wrap.getAttribute('data-open') === '1') { cls += ' mp-open'; }
      wrap.className = cls;
    }
    function open()  { wrap.setAttribute('data-open', '1'); setState(); }
    function close() { wrap.setAttribute('data-open', '0'); active = -1; setState(); }

    function highlight(i) {
      var k;
      for (k = 0; k < items.length; k++) {
        items[k].className = items[k].className.replace(' mp-act', '');
      }
      active = i;
      if (i >= 0 && i < items.length) { items[i].className += ' mp-act'; }
    }

    function render(q, titles) {
      var i, a;
      dd.innerHTML = '';
      items = [];
      active = -1;
      for (i = 0; i < titles.length; i++) {
        a = document.createElement('a');
        a.className = 'mp-sb-i';
        a.href = pageUrl(titles[i]);
        a.textContent = titles[i];
        dd.appendChild(a);
        items.push(a);
      }
      a = document.createElement('a');
      a.className = 'mp-sb-i mp-sb-all';
      a.href = searchUrl(q);
      a.textContent = 'Все результаты для «' + q + '»';
      dd.appendChild(a);
      items.push(a);
      open();
    }

    function query() {
      var q = $.trim(input.value);
      if (!q) { dd.innerHTML = ''; items = []; close(); return; }
      var my = ++token;
      $.getJSON(apiUrl, {
        action: 'opensearch',
        format: 'json',
        namespace: 0,
        limit: 30,
        search: q
      }).done(function (r) {
        if (my !== token) { return; }
        var raw = (r && r[1]) ? r[1] : [];
        var nq = norm(q), starts = [], has = [], i, pos;
        // Fandom отдаёт и «похожие» страницы. Оставляем только те, где есть введённый текст.
        for (i = 0; i < raw.length; i++) {
          pos = norm(raw[i]).indexOf(nq);
          if (pos === 0) { starts.push(raw[i]); }
          else if (pos > 0) { has.push(raw[i]); }
        }
        render(q, starts.concat(has).slice(0, 8));
      }).fail(function () {
        if (my !== token) { return; }
        render(q, []);
      });
    }

    input.addEventListener('input', function () {
      setState();
      clearTimeout(timer);
      timer = setTimeout(query, 180);
    });

    input.addEventListener('focus', function () {
      if (items.length) { open(); }
    });

    input.addEventListener('keydown', function (e) {
      var key = e.key || e.keyCode;
      if (key === 'ArrowDown' || key === 40) {
        e.preventDefault();
        if (items.length) { open(); highlight((active + 1) % items.length); }
      } else if (key === 'ArrowUp' || key === 38) {
        e.preventDefault();
        if (items.length) { open(); highlight(active <= 0 ? items.length - 1 : active - 1); }
      } else if (key === 'Enter' || key === 13) {
        e.preventDefault();
        if (active >= 0 && items[active]) {
          window.location.href = items[active].href;
        } else if ($.trim(input.value)) {
          window.location.href = searchUrl($.trim(input.value));
        }
      } else if (key === 'Escape' || key === 'Esc' || key === 27) {
        close();
      }
    });

    clear.addEventListener('click', function () {
      input.value = '';
      dd.innerHTML = '';
      items = [];
      close();
      input.focus();
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) { close(); }
    });
  }

  var n;
  for (n = 0; n < boxes.length; n++) { setup(boxes[n]); }
});
/* ===== КОНЕЦ ПОИСКА ===== */

/* ===== НИЖНЯЯ ПАНЕЛЬ: вкладка «Разработка» + перекраска оранжевого (v2) ===== */
/* Вставить в MediaWiki:Common.js вместо прежнего блока панели (от «НИЖНЯЯ ПАНЕЛЬ» до «КОНЕЦ ПАНЕЛИ»). */
/* Чтобы поменять ссылки, правь только список ITEMS. edit:true = сразу открывать правку. */
$(function () {
  var LABEL = 'Разработка';
  var ITEMS = [
    { t: 'Все карты',              page: 'Категория:Карта' },
    { t: 'Common.css',             page: 'MediaWiki:Common.css',        edit: true },
    { t: 'Common.js',              page: 'MediaWiki:Common.js',         edit: true },
    { t: 'База карт',              page: 'Модуль:Список карт/данные',   edit: true },
    { t: 'Статистика (данные)',    page: 'Шаблон:Статистика',           edit: true },
    { t: 'Заглавная',              page: 'Заглавная',                   edit: true }
  ];

  function enc(page) {
    return encodeURIComponent(page.replace(/ /g, '_'));
  }
  function url(it) {
    if (it.edit) {
      return mw.config.get('wgScript') + '?title=' + enc(it.page) + '&action=edit';
    }
    return mw.config.get('wgArticlePath').replace('$1', enc(it.page).replace(/%3A/gi, ':').replace(/%2F/gi, '/'));
  }

  function stripIds(node) {
    var all = node.querySelectorAll('[id]'), i;
    for (i = 0; i < all.length; i++) { all[i].removeAttribute('id'); }
    node.removeAttribute('id');
  }

  // подпись вкладки: золотой ромбик + текст (вложенное меню и иконки не трогаем)
  function setLabel(li, sub, text) {
    var walker = document.createTreeWalker(li, NodeFilter.SHOW_TEXT, null, false), n;
    while ((n = walker.nextNode())) {
      if (sub.contains(n)) { continue; }
      if ($.trim(n.nodeValue)) {
        var frag = document.createDocumentFragment();
        var d = document.createElement('span');
        d.className = 'wb-d';
        d.textContent = '◆';
        frag.appendChild(d);
        frag.appendChild(document.createTextNode(' ' + text));
        n.parentNode.replaceChild(frag, n);
        return true;
      }
    }
    return false;
  }

  function makeItem(tpl, it) {
    var li = tpl ? tpl.cloneNode(true) : document.createElement('li');
    stripIds(li);
    var a = li.querySelector('a');
    if (!a) {
      a = document.createElement('a');
      li.appendChild(a);
    }
    a.textContent = it.t;
    a.href = url(it);
    a.removeAttribute('target');
    a.removeAttribute('onclick');
    return li;
  }

  function mount(bar) {
    if (bar.querySelector('.wb-dev')) { return; }
    var i, li;

    // 1) основной способ: копируем вкладку «Мои инструменты»
    var sub = bar.querySelector('li > ul');
    if (sub && sub.parentNode && sub.parentNode.tagName === 'LI') {
      var src = sub.parentNode;
      var clone = src.cloneNode(true);
      stripIds(clone);
      clone.className = (clone.className ? clone.className + ' ' : '') + 'wb-dev';
      var csub = clone.querySelector('ul');
      var tpl = csub.querySelector('li');
      var tplCopy = tpl ? tpl.cloneNode(true) : null;
      csub.innerHTML = '';
      for (i = 0; i < ITEMS.length; i++) { csub.appendChild(makeItem(tplCopy, ITEMS[i])); }
      setLabel(clone, csub, LABEL);
      src.parentNode.insertBefore(clone, src.nextSibling);
      return;
    }

    // 2) запасной способ: собираем вкладку сами
    var list = bar.querySelector('ul');
    if (!list) { return; }
    li = document.createElement('li');
    li.className = 'wb-dev wb-dev-fb';
    var label = document.createElement('a');
    label.href = '#';
    label.innerHTML = '<span class="wb-d">◆</span> ' + LABEL;
    label.onclick = function (e) { e.preventDefault(); };
    var menu = document.createElement('ul');
    for (i = 0; i < ITEMS.length; i++) { menu.appendChild(makeItem(null, ITEMS[i])); }
    li.appendChild(label);
    li.appendChild(menu);
    list.appendChild(li);
  }

  /* ---------- перекраска оранжевых деталей панели ---------- */
  // «тёплый» цвет: оранжевый/золотой (красного заметно больше, чем синего)
  function warm(c) {
    var m = String(c).match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!m) { return false; }
    var a = (m[4] === undefined) ? 1 : parseFloat(m[4]);
    return a > 0.3 && (+m[1]) > (+m[3]) + 40 && (+m[1]) >= (+m[2]);
  }

  function paint(bar) {
    var tb = bar.querySelector('.toolbar');
    var nodes = bar.querySelectorAll('*');
    var list = [bar], i, el, cs, r, isWarm;
    for (i = 0; i < nodes.length; i++) { list.push(nodes[i]); }

    for (i = 0; i < list.length; i++) {
      el = list[i];
      if (el === tb) { continue; }
      if (el.classList.contains('wb-shell') || el.classList.contains('wb-circ')) { continue; }
      cs = window.getComputedStyle(el);
      isWarm = warm(cs.backgroundColor) ||
               (parseFloat(cs.borderTopWidth) > 0 && warm(cs.borderTopColor));
      if (!isWarm) { continue; }
      r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) { continue; }   // скрытое подождёт, пока станет видимым

      if (el === bar || (tb && el.contains(tb))) {
        el.classList.add('wb-shell');                       // внешний оранжевый ободок
      } else if (r.width <= 70 && r.height <= 70 && Math.abs(r.width - r.height) <= 8) {
        el.classList.add('wb-circ');                        // круглая кнопка
      }
    }
  }

  var timer = null;
  function refresh(bar) {
    mount(bar);
    paint(bar);
  }

  // панель Fandom появляется после загрузки страницы и перерисовывается при настройке
  var tries = 0;
  var iv = setInterval(function () {
    var bar = document.getElementById('WikiaBar');
    tries++;
    if (bar) {
      clearInterval(iv);
      refresh(bar);
      setTimeout(function () { refresh(bar); }, 1000);
      setTimeout(function () { refresh(bar); }, 3000);
      if (window.MutationObserver) {
        new MutationObserver(function () {
          clearTimeout(timer);
          timer = setTimeout(function () { refresh(bar); }, 150);
        }).observe(bar, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
      }
    } else if (tries > 40) {
      clearInterval(iv);
    }
  }, 500);
});
/* ===== КОНЕЦ ПАНЕЛИ ===== */

/* ===== КОНТРАКТЫ — добавить В КОНЕЦ MediaWiki:Common.js (ничего не заменяя) ===== */
(function () {
	'use strict';

	function norm(s) {
		return String(s || '').toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').replace(/^ | $/g, '');
	}

	/* ---------- всплывашка награды ---------- */
	var pop = null, popChip = null;

	function getPop() {
		if (pop) { return pop; }
		pop = document.createElement('div');
		pop.className = 'ct-pop';
		pop.innerHTML = '<div class="ct-pop-ico"></div><div class="ct-pop-txt">' +
			'<div class="ct-pop-name"></div><div class="ct-pop-cnt"></div></div>';
		document.body.appendChild(pop);
		return pop;
	}

	function closePop() {
		if (pop) { pop.classList.remove('is-open'); }
		popChip = null;
	}

	function openPop(chip) {
		var p = getPop();
		var ico = p.querySelector('.ct-pop-ico');
		var cnt = chip.getAttribute('data-rc');
		ico.innerHTML = '';

		var holder = chip.querySelector('.ct-ri');
		var im = holder ? holder.querySelector('img') : null;
		if (im) {
			var n = document.createElement('img');
			n.alt = '';
			n.src = im.getAttribute('data-src') || im.getAttribute('src') || '';
			ico.appendChild(n);
		} else {
			ico.innerHTML = '<span class="ct-ri ct-ri-fb">\u25C6</span>';
		}

		p.querySelector('.ct-pop-name').textContent = chip.getAttribute('data-rn') || '';
		p.querySelector('.ct-pop-cnt').textContent = cnt ? ('x ' + cnt) : '';

		p.classList.add('is-open');
		var r = chip.getBoundingClientRect();
		var w = p.offsetWidth, h = p.offsetHeight;
		var top = r.top - h - 8;
		if (top < 8) { top = r.bottom + 8; }
		var left = r.left + r.width / 2 - w / 2;
		left = Math.max(8, Math.min(left, window.innerWidth - w - 8));
		p.style.top = top + 'px';
		p.style.left = left + 'px';
		popChip = chip;
	}

	if (!window.__ctBound) {
		window.__ctBound = true;

		document.addEventListener('click', function (e) {
			var t = e.target;
			var chip = (t && t.closest) ? t.closest('.ct-r') : null;
			if (chip) {
				e.preventDefault();
				if (popChip === chip) { closePop(); } else { openPop(chip); }
				return;
			}
			if (pop && pop.contains(t)) { return; }
			closePop();
		});

		document.addEventListener('keydown', function (e) {
			var k = e.key;
			if (k === 'Escape' || k === 'Esc') { closePop(); return; }
			if ((k === 'Enter' || k === ' ') && e.target && e.target.classList &&
				e.target.classList.contains('ct-r')) {
				e.preventDefault();
				e.target.click();
			}
		});

		window.addEventListener('scroll', closePop, true);
		window.addEventListener('resize', closePop);
	}

	/* ---------- один блок контрактов ---------- */
	function initWrap(root) {
		if (root.getAttribute('data-ct-init')) { return; }
		root.setAttribute('data-ct-init', '1');

		var box = root.querySelector('.ct-search');
		var scroll = root.querySelector('.ct-scroll');
		var empty = root.querySelector('.ct-empty');
		var count = root.querySelector('.ct-count');
		var items = Array.prototype.slice.call(root.querySelectorAll('.ct-item'));
		var tabs = Array.prototype.slice.call(root.querySelectorAll('.ct-tab'));
		var type = 'Все';
		if (!box || !scroll) { return; }

		var input = document.createElement('input');
		input.type = 'search';
		input.placeholder = 'Поиск: название, задание, награда или счёт\u2026';
		input.setAttribute('autocomplete', 'off');
		input.setAttribute('spellcheck', 'false');
		box.appendChild(input);

		function apply() {
			var q = norm(input.value);
			var words = q ? q.split(' ') : [];
			var shown = 0, i, j, it, ok, s, w;

			for (i = 0; i < items.length; i++) {
				it = items[i];
				ok = (type === 'Все' || it.getAttribute('data-type') === type);
				if (ok && words.length) {
					s = it.getAttribute('data-s') || '';
					for (j = 0; j < words.length; j++) {
						w = words[j];
						if (/^\d+$/.test(w)) {
							// число: счёт целиком или число в тексте/на шкале (не часть другого числа)
							if (it.getAttribute('data-score') !== w &&
								!new RegExp('(^|[^0-9])' + w + '([^0-9]|$)').test(s)) { ok = false; break; }
						} else if (s.indexOf(w) === -1) { ok = false; break; }
					}
				}
				if (ok) { it.classList.remove('is-hidden'); shown++; }
				else { it.classList.add('is-hidden'); }
			}

			if (empty) { empty.style.display = shown ? 'none' : 'block'; }
			if (count) { count.textContent = 'Показано: ' + shown + ' из ' + items.length; }
			scroll.scrollTop = 0;
			closePop();
		}

		function setType(t) {
			type = t;
			tabs.forEach(function (el) {
				el.classList.toggle('is-on', el.getAttribute('data-type') === t);
			});
			apply();
		}

		tabs.forEach(function (el) {
			el.addEventListener('click', function () { setType(el.getAttribute('data-type')); });
			el.addEventListener('keydown', function (e) {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					setType(el.getAttribute('data-type'));
				}
			});
		});

		input.addEventListener('input', apply);
		input.addEventListener('search', apply);
	}

	function boot(root) {
		var list = root.querySelectorAll ? root.querySelectorAll('.ct-wrap') : [];
		for (var i = 0; i < list.length; i++) { initWrap(list[i]); }
	}

	if (typeof mw !== 'undefined' && mw.hook) {
		mw.hook('wikipage.content').add(function ($c) {
			boot(($c && $c[0]) ? $c[0] : document);
		});
	} else if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () { boot(document); });
	} else {
		boot(document);
	}
})();
/* ===== КОНЕЦ КОНТРАКТОВ ===== */