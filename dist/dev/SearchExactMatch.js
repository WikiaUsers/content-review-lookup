(function (window, document, mw) {
    'use strict';

    if (!mw || !mw.config) {
        return;
    }

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

    function getApiUrl() {
        return (mw.config.get('wgScriptPath') || '') + '/api.php';
    }

    function getArticleUrl(title) {
        var articlePath = mw.config.get('wgArticlePath') || '/wiki/$1';
        var encoded = encodeURIComponent(title.replace(/ /g, '_'))
            .replace(/%2F/g, '/')
            .replace(/%3A/g, ':');
        return articlePath.replace('$1', encoded);
    }

    function getSearchUrl(query) {
        var scriptPath = mw.config.get('wgScriptPath') || '';
        var params = new URLSearchParams({
            title: 'Special:Search',
            query: query,
            scope: 'internal',
            navigationSearch: 'true'
        });
        return scriptPath + '/index.php?' + params.toString();
    }

    function lookupExactTitle(query) {
        var params = new URLSearchParams({
            action: 'query',
            titles: query,
            redirects: '1',
            format: 'json',
            formatversion: '2'
        });

        return fetch(getApiUrl() + '?' + params.toString(), {
            credentials: 'same-origin'
        }).then(function (response) {
            return response.ok ? response.json() : null;
        }).then(function (data) {
            var pages = data && data.query && data.query.pages;
            var page = pages && pages[0];

            if (page && !page.missing && !page.invalid && page.title) {
                return page.title;
            }
            return null;
        }).catch(function () {
            return null;
        });
    }

    function lookupCaseInsensitive(query) {
        var params = new URLSearchParams({
            action: 'opensearch',
            search: query,
            limit: '1',
            format: 'json'
        });

        return fetch(getApiUrl() + '?' + params.toString(), {
            credentials: 'same-origin'
        }).then(function (response) {
            return response.ok ? response.json() : null;
        }).then(function (data) {
            if (data && Array.isArray(data[1]) && data[1][0]) {
                var title = data[1][0];
                if (title.toLowerCase() === query.toLowerCase()) {
                    return title;
                }
            }
            return null;
        }).catch(function () {
            return null;
        });
    }

    function getExactTitle(query) {
        return Promise.all([
            lookupExactTitle(query),
            lookupCaseInsensitive(query)
        ]).then(function (results) {
            return results[0] || results[1];
        });
    }

    function goToSearch(query) {
        window.location.assign(getSearchUrl(query));
    }

    function goToExactTitleOrSearch(input, query) {
        if (input._exactSearchPending) {
            return;
        }

        input._exactSearchPending = true;

        getExactTitle(query).then(function (title) {
            if (title) {
                window.location.assign(getArticleUrl(title));
                return;
            }

            goToSearch(query);
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
        var isSearchPage = mw.config.get('wgCanonicalSpecialPageName') === 'Search' ||
            mw.config.get('wgPageName') === 'Special:Search';

        if (!isSearchPage) {
            return;
        }

        var params = new URLSearchParams(window.location.search);
        var query = (params.get('query') || params.get('search') || '').trim();

        if (!query || document.documentElement._exactSearchPending) {
            return;
        }

        document.documentElement._exactSearchPending = true;

        var hideStyle = document.createElement('style');
        hideStyle.textContent = 'html { visibility: hidden !important; }';
        (document.head || document.documentElement).appendChild(hideStyle);

        var revealTimeout = setTimeout(reveal, 1500);

        function reveal() {
            clearTimeout(revealTimeout);
            if (hideStyle.parentNode) {
                hideStyle.parentNode.removeChild(hideStyle);
            }
            document.documentElement._exactSearchPending = false;
        }

        getExactTitle(query).then(function (title) {
            if (title) {
                window.location.replace(getArticleUrl(title));
                return;
            }
            reveal();
        }, reveal);
    }

    redirectSearchPageExactMatch();

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
}(window, document, window.mediaWiki || window.mw));