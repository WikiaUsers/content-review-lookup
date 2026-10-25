importArticles({
	type: 'script',
	articles: [
		'u:dev:MediaWiki:SandboxTab/code.js',
		]
	});

/* =========================================================
   STATE OF SURVIVAL WIKI
   GENERIC CATALOG SEARCH + A-Z FILTER
   ========================================================= */

(function () {

    'use strict';


    /* =====================================================
       NORMALIZE TEXT
       ===================================================== */

    function normalizeText(text) {

        text = (text || '').toString().toLowerCase();

        if (text.normalize) {

            text = text
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');

        }

        return text.trim();

    }


/* =====================================================
   SORT CATALOG CARDS A-Z
   ===================================================== */

function sortCatalogCards(cards) {

    var groups = [];

    /*
     * Group cards by their parent container.
     * This keeps the system compatible with
     * different catalog pages and grids.
     */

    Array.prototype.forEach.call(
        cards,
        function (card) {

            var parent = card.parentNode;
            var group = null;

            for (
                var i = 0;
                i < groups.length;
                i++
            ) {

                if (
                    groups[i].parent === parent
                ) {

                    group = groups[i];
                    break;

                }

            }


            if (!group) {

                group = {
                    parent: parent,
                    cards: []
                };

                groups.push(group);

            }


            group.cards.push(card);

        }
    );


    /*
     * Sort every group alphabetically
     * using the card data-name.
     */

    groups.forEach(
        function (group) {

            group.cards.sort(
                function (a, b) {

                    var nameA =
                        normalizeText(
                            a.getAttribute(
                                'data-name'
                            ) || ''
                        );

                    var nameB =
                        normalizeText(
                            b.getAttribute(
                                'data-name'
                            ) || ''
                        );


                    if (nameA < nameB) {
                        return -1;
                    }

                    if (nameA > nameB) {
                        return 1;
                    }

                    return 0;

                }
            );


            /*
             * Reinsert the cards in
             * alphabetical order.
             */

            group.cards.forEach(
                function (card) {

                    group.parent.appendChild(
                        card
                    );

                }
            );

        }
    );

}

    /* =====================================================
       CREATE SEARCH + A-Z TOOLS
       ===================================================== */

    function createCatalogTools(catalog) {

        var host = catalog.querySelector(
            '.sos-catalog-tools-host'
        );


        if (!host) {
            return;
        }


        /*
         * Prevent duplicate toolbars.
         */

        if (
            host.querySelector('.sos-catalog-tools')
        ) {
            return;
        }


        var placeholder =
            host.getAttribute(
                'data-search-placeholder'
            ) ||
            'Search...';


        /*
         * Main tools container.
         *
         * The sos-frame-* classes preserve the
         * existing Frame Skins design.
         *
         * The sos-catalog-* classes are used
         * by the generic JavaScript.
         */

        var tools =
            document.createElement('div');

        tools.className =
            'sos-frame-category-tools ' +
            'sos-catalog-tools';


        /* -------------------------------------------------
           SEARCH BAR
           ------------------------------------------------- */

        var search =
            document.createElement('input');

        search.type = 'text';

        search.className =
            'sos-frame-search ' +
            'sos-catalog-search';

        search.placeholder = placeholder;

        search.setAttribute(
            'autocomplete',
            'off'
        );


        tools.appendChild(search);


        /* -------------------------------------------------
           LETTER FILTER CONTAINER
           ------------------------------------------------- */

        var letters =
            document.createElement('div');

        letters.className =
            'sos-frame-letter-filter ' +
            'sos-catalog-letter-filter';


        /* -------------------------------------------------
           ALL BUTTON
           ------------------------------------------------- */

        var allButton =
            document.createElement('button');

        allButton.type = 'button';

        allButton.className =
            'sos-frame-filter ' +
            'sos-catalog-filter ' +
            'is-active';

        allButton.setAttribute(
            'data-letter',
            'ALL'
        );

        allButton.textContent = 'ALL';

        letters.appendChild(allButton);


        /* -------------------------------------------------
           A TO Z BUTTONS
           ------------------------------------------------- */

        var alphabet =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


        alphabet.split('').forEach(
            function (letter) {

                var button =
                    document.createElement(
                        'button'
                    );

                button.type = 'button';

                button.className =
                    'sos-frame-filter ' +
                    'sos-catalog-filter';

                button.setAttribute(
                    'data-letter',
                    letter
                );

                button.textContent = letter;

                letters.appendChild(button);

            }
        );


        tools.appendChild(letters);

        host.appendChild(tools);

    }


    /* =====================================================
       INITIALIZE ONE CATALOG
       ===================================================== */

    function initCatalog(catalog) {

        if (
            catalog.getAttribute(
                'data-sos-catalog-ready'
            ) === 'yes'
        ) {
            return;
        }


        /*
         * First create the toolbar.
         */

        createCatalogTools(catalog);


        var searchInput =
            catalog.querySelector(
                '.sos-catalog-search'
            );


        var filterButtons =
            catalog.querySelectorAll(
                '.sos-catalog-filter'
            );


        var cards =
            catalog.querySelectorAll(
                '.sos-catalog-card'
            );


        var noResults =
            catalog.querySelector(
                '.sos-catalog-no-results'
            );


        if (!cards.length) {
    return;
}


/*
 * Automatically sort all cards A-Z
 * before activating search and filters.
 */

sortCatalogCards(cards);


catalog.setAttribute(
    'data-sos-catalog-ready',
    'yes'
);

        var activeLetter = 'ALL';


        /* =================================================
           FILTER CARDS
           ================================================= */

        function updateCatalog() {

            var searchValue = '';

            if (searchInput) {

                searchValue =
                    normalizeText(
                        searchInput.value
                    );

            }


            var visibleCards = 0;


            Array.prototype.forEach.call(
                cards,
                function (card) {

                    var cardName =
                        card.getAttribute(
                            'data-name'
                        ) || '';


                    var cardLetter =
                        (
                            card.getAttribute(
                                'data-letter'
                            ) || ''
                        )
                        .toUpperCase()
                        .trim();


                    var matchesSearch =
                        !searchValue ||
                        normalizeText(cardName)
                            .indexOf(
                                searchValue
                            ) !== -1;


                    var matchesLetter =
                        activeLetter === 'ALL' ||
                        cardLetter ===
                            activeLetter;


                    if (
                        matchesSearch &&
                        matchesLetter
                    ) {

                        card.style.display = '';

                        visibleCards++;

                    } else {

                        card.style.display =
                            'none';

                    }

                }
            );


            /* ---------------------------------------------
               NO RESULTS
               --------------------------------------------- */

            if (noResults) {

                noResults.style.display =
                    visibleCards === 0
                        ? ''
                        : 'none';

            }

        }


        /* =================================================
           SEARCH EVENT
           ================================================= */

        if (searchInput) {

            searchInput.addEventListener(
                'input',
                updateCatalog
            );

        }


        /* =================================================
           LETTER BUTTON EVENTS
           ================================================= */

        Array.prototype.forEach.call(
            filterButtons,
            function (button) {

                button.addEventListener(
                    'click',
                    function () {

                        activeLetter =
                            (
                                button.getAttribute(
                                    'data-letter'
                                ) || 'ALL'
                            )
                            .toUpperCase();


                        /*
                         * Remove active state.
                         */

                        Array.prototype.forEach.call(
                            filterButtons,
                            function (
                                otherButton
                            ) {

                                otherButton
                                    .classList
                                    .remove(
                                        'is-active'
                                    );

                            }
                        );


                        /*
                         * Activate clicked button.
                         */

                        button.classList.add(
                            'is-active'
                        );


                        updateCatalog();

                    }
                );

            }
        );


        /*
         * Initial state.
         */

        updateCatalog();

    }


    /* =====================================================
       INITIALIZE ALL CATALOGS
       ===================================================== */

    function initAllCatalogs(root) {

        var scope =
            root &&
            root.querySelectorAll
                ? root
                : document;


        if (
            scope.matches &&
            scope.matches('.sos-catalog')
        ) {

            initCatalog(scope);

        }


        var catalogs =
            scope.querySelectorAll(
                '.sos-catalog'
            );


        Array.prototype.forEach.call(
            catalogs,
            function (catalog) {

                initCatalog(catalog);

            }
        );

    }


    /* =====================================================
       MEDIAWIKI / FANDOM
       ===================================================== */

    if (
        typeof mw !== 'undefined' &&
        mw.hook
    ) {

        mw.hook(
            'wikipage.content'
        ).add(
            function (content) {

                var root =
                    content &&
                    content[0]
                        ? content[0]
                        : document;


                initAllCatalogs(root);

            }
        );

    }


    /*
     * Fallback for normal page loading.
     */

    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            function () {

                initAllCatalogs(
                    document
                );

            }
        );

    } else {

        initAllCatalogs(
            document
        );

    }

})();


/* =========================================================
   CATEGORY LIBRARY 2026
   Universal category filtering system
   ========================================================= */

$(function () {

    $('.sos-category-library').each(function () {

        const library = $(this);

        const grid =
            library.find('.sos-category-library-grid').first();

        const cards =
            grid.find('[data-name][data-subcategory]');

        const subcategoryHost =
            library.find('.sos-category-library-subcategory-host').first();

        const searchHost =
            library.find('.sos-category-library-search-host').first();

        const countDisplay =
            library.find('.sos-category-library-count').first();

        const noResults =
            library.find('.sos-category-library-no-results').first();


        /* =====================================================
           SUBCATEGORY DATA
           ===================================================== */

        const subcategoryData =
            subcategoryHost.attr('data-subcategories') || '';

        const subcategoryLabel =
            subcategoryHost.attr('data-label') ||
            'All Subcategories';

        const subcategories =
            subcategoryData
                .split(';;')
                .map(function (item) {
                    return item.trim();
                })
                .filter(Boolean);


        /* =====================================================
           CREATE DROPDOWN
           ===================================================== */

        const select = $('<select>', {
            class: 'sos-category-library-subcategory-select'
        });


        select.append(
            $('<option>', {
                value: 'all',
                text: subcategoryLabel
            })
        );


        subcategories.forEach(function (subcategory) {

            select.append(
                $('<option>', {
                    value: subcategory,
                    text: subcategory
                })
            );

        });


        subcategoryHost.append(select);


        /* =====================================================
           CREATE SEARCH FIELD
           ===================================================== */

        const searchPlaceholder =
            searchHost.attr('data-placeholder') ||
            'Search...';


        const search = $('<input>', {
            type: 'text',
            class: 'sos-category-library-search',
            placeholder: searchPlaceholder
        });


        searchHost.append(search);


        /* =====================================================
           NORMALIZE TEXT
           ===================================================== */

        function normalizeText(text) {

            return String(text || '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .trim();

        }


        /* =====================================================
           AUTOMATIC ALPHABETICAL ORDER
           ===================================================== */

        const sortedCards = cards.get().sort(function (a, b) {

            const nameA =
                normalizeText($(a).attr('data-name'));

            const nameB =
                normalizeText($(b).attr('data-name'));

            return nameA.localeCompare(nameB);

        });


        $(sortedCards).detach().appendTo(grid);


        /* =====================================================
           FILTER STATE
           ===================================================== */

        let activeLetter = 'all';


        /* =====================================================
           APPLY FILTERS
           ===================================================== */

        function applyFilters() {

            const selectedSubcategory =
                normalizeText(select.val());

            const searchTerm =
                normalizeText(search.val());

            let visibleCount = 0;


            $(sortedCards).each(function () {

                const card = $(this);

                const rawName =
                    card.attr('data-name') || '';

                const name =
                    normalizeText(rawName);

                const subcategory =
                    normalizeText(
                        card.attr('data-subcategory')
                    );


                /* SUBCATEGORY */

                const subcategoryMatch =
                    selectedSubcategory === 'all' ||
                    subcategory === selectedSubcategory;


                /* SEARCH */

                const searchMatch =
                    !searchTerm ||
                    name.indexOf(searchTerm) !== -1;


                /* LETTER */

                let letterMatch = true;


                if (activeLetter !== 'all') {

                    const firstCharacter =
                        normalizeText(rawName)
                            .charAt(0)
                            .toUpperCase();


                    if (activeLetter === '#') {

                        letterMatch =
                            !/^[A-Z]$/.test(firstCharacter);

                    } else {

                        letterMatch =
                            firstCharacter === activeLetter;

                    }

                }


                /* FINAL RESULT */

                const visible =
                    subcategoryMatch &&
                    searchMatch &&
                    letterMatch;


                card.toggle(visible);


                if (visible) {
                    visibleCount++;
                }

            });


            /* COUNT */

            countDisplay.text(
                visibleCount +
                (visibleCount === 1 ? ' item' : ' items')
            );


            /* NO RESULTS */

            if (visibleCount === 0) {
                noResults.show();
            } else {
                noResults.hide();
            }

        }


        /* =====================================================
           EVENTS
           ===================================================== */

        select.on('change', applyFilters);

        search.on('input', applyFilters);


        library
            .find('.sos-category-library-filter')
            .on('click', function () {

                const filter = $(this);

                activeLetter =
                    filter.attr('data-letter') || 'all';


                library
                    .find('.sos-category-library-filter')
                    .removeClass('is-active');


                filter.addClass('is-active');

                applyFilters();

            });


        /* =====================================================
           INITIAL DISPLAY
           ===================================================== */

        applyFilters();

    });

});


/* =========================================================
   STATE OF SURVIVAL WIKI
   HEROES HUB 2026 - DIRECTORY FILTERS
   ========================================================= */

/* HEROES HUB 2026 - Integrated into MediaWiki:Common.js (V6)
   Hero Directory progressive enhancement. Scoped to .sos-heroes-hub.
   Do not paste inside wikitext, TemplateStyles CSS, or raw HTML.
   Fandom community JS must be enabled and any edited JS approved.
*/
(function () {
  'use strict';

  function boot(scope) {
    var root = scope && scope.querySelectorAll ? scope : document;
    var hubs = root.querySelectorAll('.sos-heroes-hub');
    if (root.classList && root.classList.contains('sos-heroes-hub')) {
      hubs = [root];
    }
    Array.prototype.forEach.call(hubs, initHub);
  }

  function initHub(hub) {
    if (hub.getAttribute('data-heroes-filter-init') === '1') return;
    var toolbar = hub.querySelector('.sos-heroes-filters');
    if (!toolbar) return;
    var sections = Array.prototype.slice.call(hub.querySelectorAll('.sos-heroes-directory-section'));
    var cards = Array.prototype.slice.call(hub.querySelectorAll('.sos-heroes-directory-section .sos-heroes-card'));
    if (!cards.length) return;
    hub.setAttribute('data-heroes-filter-init', '1');

    function tr(attr, fallback) { return hub.getAttribute(attr) || fallback; }
    function key(s) {
      var normalized = String(s || '').trim().toLowerCase();
      if (normalized.normalize) {
        normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      }
      return normalized;
    }

    // Heroes Hub: sort by generation, then name (A-Z).
    function sortHeroCards() {
      function sortName(card) {
        return key(card.getAttribute('data-hero-name') || '')
          .replace(/^[^a-z0-9]+/g, '');
      }
      function firstGeneration(card) {
        var values = (card.getAttribute('data-hero-generations') || '').match(/\d+/g) || [];
        var first = Infinity;
        values.forEach(function (value) {
          var generation = parseInt(value, 10);
          if (generation > 0 && generation < first) first = generation;
        });
        return first;
      }
      sections.forEach(function (section) {
        var grid = section.querySelector('.sos-heroes-cards');
        if (!grid) return;
        var items = cards.filter(function (card) { return card.parentNode === grid; });
        if (items.length < 2) return;
        var byGeneration = section.id === 'sos-heroes-generations';
        items.sort(function (a, b) {
          if (byGeneration) {
            var genA = firstGeneration(a);
            var genB = firstGeneration(b);
            if (genA !== genB) return genA < genB ? -1 : 1;
          }
          return sortName(a).localeCompare(sortName(b), 'en', { sensitivity: 'base' });
        });
        var fragment = document.createDocumentFragment();
        items.forEach(function (card) { fragment.appendChild(card); });
        grid.appendChild(fragment);
      });
    }
    sortHeroCards();

    function el(tag, className, textContent) {
      var node = document.createElement(tag);
      if (className) node.className = className;
      if (textContent !== undefined) node.textContent = textContent;
      return node;
    }
    function labelOf(prefix, val) {
      return tr('data-label-' + prefix + '-' + key(val).replace(/\s+/g, '-'), val);
    }
    function field(title, name, values) {
      var wrap = el('div', 'sos-heroes-filter-field');
      var label = el('label', '', title);
      var select = el('select', '');
      select.setAttribute('aria-label', title);
      select.setAttribute('data-filter-name', name);
      var all = el('option', '', tr('data-filter-all', 'All'));
      all.value = '';
      select.appendChild(all);
      values.forEach(function (v) {
        var val = typeof v === 'string' ? v : v.value;
        var txt = typeof v === 'string' ? labelOf(name, val) : v.label;
        var option = el('option', '', txt);
        option.value = val;
        select.appendChild(option);
      });
      wrap.appendChild(label);
      wrap.appendChild(select);
      return { wrap: wrap, control: select };
    }

    var grid = el('div', 'sos-heroes-filter-grid');
    var searchWrap = el('div', 'sos-heroes-filter-field');
    var searchLabel = el('label', '', tr('data-filter-search', 'Search for a hero...'));
    var search = el('input', '');
    search.type = 'search';
    search.placeholder = tr('data-filter-search', 'Search for a hero...');
    search.setAttribute('aria-label', search.placeholder);
    searchWrap.appendChild(searchLabel);
    searchWrap.appendChild(search);
    grid.appendChild(searchWrap);

    var generationValues = [];
    var maxGen = 29;
    cards.forEach(function (card) {
      var raw = card.getAttribute('data-hero-generations') || '';
      raw.split(/[,;/\s]+/).forEach(function (part) {
        var n = parseInt(part, 10);
        if (String(n) === part && n > maxGen && n < 1000) maxGen = n;
      });
    });
    for (var g = maxGen; g >= 1; g--) {
      generationValues.push({ value: String(g), label: tr('data-filter-generation', 'Generation') + ' ' + g });
    }

    var gen = field(tr('data-filter-generation', 'Generation'), 'generation', generationValues);
    var type = field(tr('data-filter-type', 'Troop Type'), 'type', ['Infantry','Rider','Hunter']);
    var style = field(tr('data-filter-style', 'Hero Style'), 'style', ['Control','Resilience','Berserk','Resonance','Coming Soon']);
    var rarity = field(tr('data-filter-rarity', 'Rarity'), 'rarity', ['Rare','Epic','Legend','Special']);
    var benefit = field(tr('data-filter-benefit', 'Benefit'), 'benefit', ['Development','Express','Gather','Infected','Patrol','Rally','Siege','Trap']);
    var specialType = field(tr('data-filter-specialtype', 'Special Status'), 'specialtype', [
      { value: 'Standard', label: tr('data-label-specialtype-standard', 'Basic') },
      { value: 'Operative', label: tr('data-label-specialtype-operative', 'Special Operative') },
      { value: 'Upgradeable', label: tr('data-label-specialtype-upgradeable', 'Can Evolve') }
    ]);
    [gen,type,style,rarity,benefit,specialType].forEach(function (part) { grid.appendChild(part.wrap); });
    toolbar.appendChild(grid);

    var footer = el('div', 'sos-heroes-filter-footer');
    var count = el('div', 'sos-heroes-filter-count');
    count.setAttribute('aria-live', 'polite');
    var actions = el('div', 'sos-heroes-filter-actions');
    var gallery = el('button', '', tr('data-filter-gallery', 'Gallery View'));
    gallery.type = 'button'; gallery.setAttribute('aria-pressed', 'true');
    var compact = el('button', '', tr('data-filter-compact', 'Compact View'));
    compact.type = 'button'; compact.setAttribute('aria-pressed', 'false');
    var reset = el('button', '', tr('data-filter-reset', 'Reset Filters'));
    reset.type = 'button';
    actions.appendChild(gallery); actions.appendChild(compact); actions.appendChild(reset);
    footer.appendChild(count); footer.appendChild(actions); toolbar.appendChild(footer);
    var empty = el('div', 'sos-heroes-no-results', tr('data-filter-empty', 'No heroes match these filters.'));
    empty.hidden = true;
    toolbar.appendChild(empty);

    function splitTokens(s) { return key(s).split(/[,;/\s]+/).filter(Boolean); }
    function matches(card, choice, attr) {
      if (!choice) return true;
      var val = card.getAttribute(attr) || '';
      if (attr === 'data-hero-generations') {
        return splitTokens(val).indexOf(key(choice)) !== -1;
      }
      return val.split(/[;,]/).some(function (part) { return key(part) === key(choice); });
    }
    function benefitMatches(card, choice) {
      return !choice || matches(card, choice, 'data-hero-benefit') || matches(card, choice, 'data-hero-benefit2');
    }
    function specialTypeMatches(card, choice) {
      if (!choice) return true;
      var status = key(card.getAttribute('data-hero-special-status'));
      var upgrade = key(card.getAttribute('data-hero-operative-upgrade'));
      if (choice === 'Upgradeable') return status === 'standard' && upgrade === 'yes';
      return status === key(choice);
    }
    function filterCards() {
      var q = key(search.value);
      var active = Boolean(q || gen.control.value || type.control.value || style.control.value || rarity.control.value || benefit.control.value || specialType.control.value);
      var visible = 0;
      cards.forEach(function (card) {
        var match = (!q || key(card.getAttribute('data-hero-name') || card.textContent).indexOf(q) !== -1) &&
          matches(card, gen.control.value, 'data-hero-generations') &&
          matches(card, type.control.value, 'data-hero-type') &&
          matches(card, style.control.value, 'data-hero-style') &&
          matches(card, rarity.control.value, 'data-hero-rarity') &&
          benefitMatches(card, benefit.control.value) &&
          specialTypeMatches(card, specialType.control.value);
        card.hidden = !match;
        if (match) visible++;
      });
      sections.forEach(function (section) {
        var hasCard = Array.prototype.some.call(section.querySelectorAll('.sos-heroes-card'), function (card) { return !card.hidden; });
        var isPlaceholder = Boolean(section.querySelector('.sos-heroes-coming-placeholder'));
        section.hidden = active && !hasCard;
        if (!active && isPlaceholder) section.hidden = false;
      });
      count.textContent = visible + ' ' + tr('data-filter-count', 'heroes found');
      empty.hidden = visible !== 0 || !active;
    }
    function display(mode) {
      var isCompact = mode === 'compact';
      hub.classList.toggle('sos-heroes-compact-view', isCompact);
      gallery.setAttribute('aria-pressed', String(!isCompact));
      compact.setAttribute('aria-pressed', String(isCompact));
    }
    [gen.control,type.control,style.control,rarity.control,benefit.control,specialType.control].forEach(function (s) {
      s.addEventListener('change', filterCards);
    });
    search.addEventListener('input', filterCards);
    reset.addEventListener('click', function () {
      search.value = '';
      [gen.control,type.control,style.control,rarity.control,benefit.control,specialType.control].forEach(function (s) {s.value = '';});
      filterCards();
    });
    gallery.addEventListener('click', function () { display('gallery'); });
    compact.addEventListener('click', function () { display('compact'); });
    filterCards();
  }

  if (typeof mw !== 'undefined' && mw.hook) {
    mw.hook('wikipage.content').add(function ($content) {
      boot($content && $content[0] ? $content[0] : document);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { boot(document); });
  } else {
    boot(document);
  }
}());