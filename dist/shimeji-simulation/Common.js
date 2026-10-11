// <nowiki>

/* =========================================================
   clickable divs
   ========================================================= */

$(function () {

    var cardSelectors = [
        '.character-main-card',
        '.character-list-card',
        '.characters-background-item',
        '.main-nav-card',
        '.community-file',
        '.manga-volume',
        '.location-card',
        '.location-card-minor',
        '.world-test-item',
        '.chapter-card',
        '.chapters-list-item'
    ];

    var selector = cardSelectors.join(', ');

    $(selector).each(function () {

        var $card = $(this);
        var $link = $card.find('a').first();

        if (!$link.length) return;

        var href = $link.attr('href');
        if (!href) return;

        $card.css('cursor', 'pointer');

        $card.on('click', function (e) {

            if ($(e.target).is('a') || $(e.target).closest('a').length) {
                return;
            }

            if (window.getSelection().toString().length > 0) {
                return;
            }

            window.location.href = href;
        });
    });
});


/* =========================================================
   Special:AllPages 
   ========================================================= */

mw.loader.using(['mediawiki.util', 'jquery'], function () {

    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Allpages') return;

    var MAX_WAIT = 10000;
    var CHECK_EVERY = 100;
    var waited = 0;

    function tryBuild() {

        var body = document.querySelector('.mw-allpages-body');

        if (!body) {
            if (waited < MAX_WAIT) {
                waited = waited + CHECK_EVERY;
                setTimeout(tryBuild, CHECK_EVERY);
            }
            return;
        }

        var links = body.querySelectorAll('ul li a');

        if (links.length === 0) {
            if (waited < MAX_WAIT) {
                waited = waited + CHECK_EVERY;
                setTimeout(tryBuild, CHECK_EVERY);
            }
            return;
        }

        buildUI(body, links);
    }

    function detectType(title) {

        var t = title.toLowerCase();

        /* ==================================================
           META
           ================================================== */

        if (t === 'characters' || t === 'character') return 'meta';
        if (t === 'locations' || t === 'location') return 'meta';
        if (t === 'mechanics' || t === 'mechanic') return 'meta';
        if (t === 'items') return 'meta';
        if (t === 'clubs') return 'meta';
        if (t === 'credits') return 'meta';
        if (t === 'roadmap') return 'meta';
        if (t === 'main page') return 'meta';
        if (t === 'world') return 'meta';
        if (t === 'dreams') return 'meta';
        if (t === 'dreamspace') return 'meta';
        if (t === 'phenomenom') return 'meta';
        if (t === 'phenomenoms') return 'meta';
        if (t === 'manga') return 'meta';
        if (t === 'volumes') return 'meta';
        if (t === 'volumes and pages') return 'meta';
        if (t === 'shimeji simulation wiki') return 'meta';
        if (t === 'miscelanous') return 'meta';
        if (t === 'long shijima') return 'meta';
        if (t === 'flat majime') return 'meta';
        if (t === 'equilibrium') return 'meta';
        if (t === 'hair ornaments') return 'meta';
        if (t === 'tsukumizu') return 'meta';

        /* ==================================================
           ITEMS 
           ================================================== */

        if (t === 'hair object') return 'item';
        if (t === 'hair ornament') return 'item';
        if (t === 'head object') return 'item';
        if (t === 'dream stone') return 'item';
        if (t === 'yoshika') return 'item';

        /* ==================================================
           CHAPTERS / VOLUMES
           ================================================== */

        if (t.indexOf('chapter') === 0) return 'chapter';
        if (t.indexOf('volume') === 0) return 'chapter';

        /* ==================================================
           LOCATIONS
           ================================================== */

        if (t === 'school') return 'location';
        if (t === 'station') return 'location';
        if (t === 'west yomogi') return 'location';
        if (t === 'danchi apartments') return 'location';
        if (t === 'heroines apartments') return 'location';
        if (t === 'residential area') return 'location';
        if (t === 'restaurant heaven') return 'location';
        if (t === 'hole digging club') return 'location';
        if (t === 'class 1-d') return 'location';
        if (t === 'the fields') return 'location';
        if (t === 'the train') return 'location';
        if (t === 'the structure') return 'location';

        /* ==================================================
          characters
           ================================================== */

        return 'character';
    }

    function buildUI(body, links) {

        var allItems = [];

        links.forEach(function (a) {

            var title = a.textContent.trim();
            if (!title) return;

            var href = a.getAttribute('href') || '#';
            var firstChar = title.charAt(0).toUpperCase();

            if (!firstChar.match(/^[A-Z]$/)) return;

            allItems.push({
                title: title,
                href: href,
                letter: firstChar,
                type: detectType(title)
            });
        });

        if (allItems.length === 0) return;

        while (body.firstChild) body.removeChild(body.firstChild);

        var wrap = document.createElement('div');
        wrap.className = 'ssw-allpages';

        var header = document.createElement('div');
        header.className = 'ssw-header';
        header.innerHTML =
            '<div class="ssw-header-title">All Pages</div>' +
            '<div class="ssw-header-meta">Displaying <strong id="ssw-count">' + allItems.length + '</strong> pages</div>';
        wrap.appendChild(header);

        var lettersWithContent = {};
        allItems.forEach(function (item) { lettersWithContent[item.letter] = true; });

        var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        var index = document.createElement('div');
        index.className = 'ssw-index';

        alphabet.forEach(function (letter) {
            if (lettersWithContent[letter]) {
                var a = document.createElement('a');
                a.href = '#' + letter;
                a.className = 'ssw-index-letter';
                a.textContent = letter;
                index.appendChild(a);
            } else {
                var s = document.createElement('span');
                s.className = 'ssw-index-letter ssw-index-letter-off';
                s.textContent = letter;
                index.appendChild(s);
            }
        });

        wrap.appendChild(index);

        var filters = document.createElement('div');
        filters.className = 'ssw-filters';

        var filterDefs = [
            ['all', 'All'],
            ['character', 'Characters'],
            ['location', 'Locations'],
            ['chapter', 'Chapters'],
            ['item', 'Items'],
            ['meta', 'Meta']
        ];

        filterDefs.forEach(function (pair, i) {
            var btn = document.createElement('button');
            btn.className = 'ssw-filter' + (i === 0 ? ' ssw-filter-active' : '');
            btn.setAttribute('data-filter', pair[0]);
            btn.textContent = pair[1];
            filters.appendChild(btn);
        });

        wrap.appendChild(filters);

        var controls = document.createElement('div');
        controls.className = 'ssw-controls';
        controls.innerHTML =
            '<div><label>Display pages starting at:</label><input type="text" id="ssw-start"></div>' +
            '<div><label>Display pages ending at:</label><input type="text" id="ssw-end"></div>' +
            '<div><label>Namespace:</label><select><option>(Main)</option></select></div>';
        wrap.appendChild(controls);

        var groups = {};
        allItems.forEach(function (item) {
            if (!groups[item.letter]) groups[item.letter] = [];
            groups[item.letter].push(item);
        });

        Object.keys(groups).sort().forEach(function (letter) {

            var items = groups[letter];

            var group = document.createElement('div');
            group.className = 'ssw-group';
            group.id = letter;

            var head = document.createElement('div');
            head.className = 'ssw-letter-head';
            head.innerHTML =
                '<span class="ssw-letter-char">' + letter + '</span>' +
                '<span class="ssw-letter-line"></span>' +
                '<span class="ssw-letter-count">' + items.length + ' pages</span>';
            group.appendChild(head);

            var grid = document.createElement('div');
            grid.className = 'ssw-grid';

            items.forEach(function (item, i) {

                var num = (i + 1) < 10 ? '0' + (i + 1) : '' + (i + 1);
                var cls = 'ssw-item' + (item.type === 'meta' ? ' ssw-item-meta' : '');

                var a = document.createElement('a');
                a.href = item.href;
                a.className = cls;
                a.setAttribute('data-type', item.type);
                a.innerHTML =
                    '<span class="ssw-item-num">' + num + '</span>' +
                    '<span class="ssw-item-link">' + item.title + '</span>';

                grid.appendChild(a);
            });

            group.appendChild(grid);
            wrap.appendChild(group);
        });

        var empty = document.createElement('div');
        empty.className = 'ssw-empty';
        empty.textContent = 'No pages match the current filter.';
        wrap.appendChild(empty);

        body.appendChild(wrap);

        /* =========================================================
         filter
           ========================================================= */

        var activeType = 'all';
        var activeQuery = '';

        function applyFilters() {

            var visibleCount = 0;

            wrap.querySelectorAll('.ssw-group').forEach(function (group) {

                var anyVisible = false;

                group.querySelectorAll('.ssw-item').forEach(function (item) {

                    var type = item.getAttribute('data-type') || 'all';
                    var text = item.textContent.toLowerCase();

                    var okType = (activeType === 'all') || (type === activeType);
                    var okQuery = !activeQuery || text.indexOf(activeQuery) === 0;

                    if (okType && okQuery) {
                        item.classList.remove('ssw-item-hidden');
                        anyVisible = true;
                        visibleCount++;
                    } else {
                        item.classList.add('ssw-item-hidden');
                    }
                });

                if (anyVisible) {
                    group.classList.remove('ssw-group-hidden');
                } else {
                    group.classList.add('ssw-group-hidden');
                }
            });

            document.getElementById('ssw-count').textContent = visibleCount;

            if (visibleCount === 0) {
                empty.classList.add('ssw-empty-visible');
            } else {
                empty.classList.remove('ssw-empty-visible');
            }
        }

        var filterBtns = wrap.querySelectorAll('.ssw-filter');
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) {
                    b.classList.remove('ssw-filter-active');
                });
                btn.classList.add('ssw-filter-active');
                activeType = btn.getAttribute('data-filter');
                applyFilters();
            });
        });

        document.addEventListener('input', function (e) {
            if (e.target && e.target.id === 'ssw-start') {
                activeQuery = e.target.value.trim().toLowerCase();
                applyFilters();
            }
        });

        applyFilters();
    }

    tryBuild();

});