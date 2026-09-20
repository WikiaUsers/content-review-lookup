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