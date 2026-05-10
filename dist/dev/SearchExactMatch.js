(function (window, document, mw) {
    'use strict';

    if (!mw || !mw.loader) {
        return;
    }

    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
        var api = new mw.Api();
        var searchSelector = [
            '.unified-search__input__field',
            'input[name="query"]',
            'input[name="search"]',
            'input[type="search"]',
            '#searchInput'
        ].join(', ');

        function cancelEvent(e) {
            e.preventDefault();
            e.stopPropagation();

            if (e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }
        }

        function isEnter(e) {
            return e.key === 'Enter' || e.keyCode === 13;
        }

        function isUsableInput(input) {
            var type;

            if (!input || input.tagName !== 'INPUT' || input.disabled) {
                return false;
            }

            type = (input.getAttribute('type') || 'text').toLowerCase();
            return !/^(hidden|button|submit|reset|checkbox|radio|file|image)$/.test(type);
        }

        function firstUsableSearchInput(root) {
            var inputs;
            var i;

            if (!root || !root.querySelectorAll) {
                return null;
            }

            inputs = root.querySelectorAll(searchSelector);

            for (i = 0; i < inputs.length; i++) {
                if (isUsableInput(inputs[i])) {
                    return inputs[i];
                }
            }

            return null;
        }

        function closestSearchInput(target) {
            if (!target || target.nodeType !== 1) {
                return null;
            }

            if (target.matches && target.matches(searchSelector)) {
                return isUsableInput(target) ? target : null;
            }

            if (target.closest) {
                target = target.closest(searchSelector);
                return isUsableInput(target) ? target : null;
            }

            return null;
        }

        function getExactTitle(query) {
            return api.get({
                action: 'query',
                titles: query,
                redirects: 1,
                format: 'json',
                formatversion: 2
            }).then(function (data) {
                var pages = data && data.query && data.query.pages;
                var page = pages && pages[0];

                if (page && !page.missing && !page.invalid && page.title) {
                    return page.title;
                }

                return null;
            }, function () {
                return null;
            });
        }

        function goToSearch(query) {
            window.location.assign(mw.util.getUrl('Special:Search', {
                query: query,
                scope: 'internal',
                navigationSearch: 'true'
            }));
        }

        function goToExactTitleOrSearch(input, query) {
            if (input._exactSearchPending) {
                return;
            }

            input._exactSearchPending = true;

            getExactTitle(query).then(function (title) {
                if (title) {
                    window.location.assign(mw.util.getUrl(title));
                    return;
                }

                goToSearch(query);
            }).always(function () {
                input._exactSearchPending = false;
            });
        }

        function handleSearch(input, e) {
            var query = input.value.trim();

            if (!query) {
                return;
            }

            cancelEvent(e);
            goToExactTitleOrSearch(input, query);
        }

        function redirectSearchPageExactMatch() {
            var params;
            var query;

            if (
                mw.config.get('wgCanonicalSpecialPageName') !== 'Search' &&
                mw.config.get('wgPageName') !== 'Special:Search'
            ) {
                return;
            }

            params = new URLSearchParams(window.location.search);
            query = (params.get('query') || params.get('search') || '').trim();

            if (!query || document.documentElement._exactSearchPending) {
                return;
            }

            document.documentElement._exactSearchPending = true;

            getExactTitle(query).then(function (title) {
                if (title) {
                    window.location.replace(mw.util.getUrl(title));
                }
            }).always(function () {
                document.documentElement._exactSearchPending = false;
            });
        }

        window.addEventListener('keydown', function (e) {
            var input;

            if (!isEnter(e) || e.isComposing) {
                return;
            }

            input = closestSearchInput(e.target);

            if (input) {
                handleSearch(input, e);
            }
        }, true);

        window.addEventListener('submit', function (e) {
            var input = firstUsableSearchInput(e.target);

            if (input) {
                handleSearch(input, e);
            }
        }, true);

        redirectSearchPageExactMatch();
    });
}(window, document, window.mediaWiki || window.mw));