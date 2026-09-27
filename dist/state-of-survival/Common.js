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