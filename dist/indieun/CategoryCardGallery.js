(function () {
    var SORT_OPTIONS = [
        { value: 'alpha_asc',  label: 'A → Z',          group: 'letter' },
        { value: 'alpha_desc', label: 'Z → A',          group: 'letter' },
        { value: 'added_desc', label: 'Recently Added', group: 'date' },
        { value: 'added_asc',  label: 'Oldest Added',   group: 'date' }
    ];
    var DEFAULT_PRELOAD = 'Template:Category Card Gallery Preload';
    var MAX_ITEMS = 1000;
    var DETAIL_CHUNK = 50;
    var CACHE_TTL_MS = 5 * 60 * 1000;
    var SEARCH_DEBOUNCE_MS = 250;

    function getSortConfig(value) {
        for (var i = 0; i < SORT_OPTIONS.length; i++) {
            if (SORT_OPTIONS[i].value === value) return SORT_OPTIONS[i];
        }
        return SORT_OPTIONS[0];
    }

    function isMobile() {
        return window.innerWidth <= 480;
    }

    function normalizeTitle(t) {
        return t.trim().replace(/ /g, '_').toLowerCase();
    }

    function cacheKey(categories) {
        return 'ccg_cache_' + categories.slice().sort().join(',');
    }

    function readCache(categories) {
        try {
            var raw = window.sessionStorage.getItem(cacheKey(categories));
            if (!raw) return null;
            var parsed = JSON.parse(raw);
            if (!parsed || (Date.now() - parsed.ts) > CACHE_TTL_MS) return null;
            return parsed.data;
        } catch (e) {
            return null;
        }
    }

    function writeCache(categories, data) {
        try {
            window.sessionStorage.setItem(cacheKey(categories), JSON.stringify({ ts: Date.now(), data: data }));
        } catch (e) { /* storage full or unavailable - ignore */ }
    }

    // ---- Data fetching ----

    function fetchAllMembers(categories) {
        var byPageId = {};
        var count = 0;

        function fetchOneCategory(cat) {
            var cmcontinue = null;
            function step() {
                if (count >= MAX_ITEMS) return $.Deferred().resolve().promise();
                var params = {
                    action: 'query',
                    list: 'categorymembers',
                    cmtitle: 'Category:' + cat,
                    cmlimit: 500,
                    cmnamespace: 0,
                    cmprop: 'ids|title|timestamp',
                    format: 'json'
                };
                if (cmcontinue) params.cmcontinue = cmcontinue;
                return new mw.Api().get(params).then(function (data) {
                    var members = (data.query && data.query.categorymembers) || [];
                    members.forEach(function (m) {
                        if (!byPageId[m.pageid]) {
                            byPageId[m.pageid] = { title: m.title, timestamp: m.timestamp, pageid: m.pageid };
                            count++;
                        }
                    });
                    if (data.continue && data.continue.cmcontinue && count < MAX_ITEMS) {
                        cmcontinue = data.continue.cmcontinue;
                        return step();
                    }
                });
            }
            return step();
        }

        var chain = $.Deferred().resolve().promise();
        categories.forEach(function (cat) {
            chain = chain.then(function () { return fetchOneCategory(cat); });
        });

        return chain.then(function () {
            var arr = [];
            for (var id in byPageId) if (byPageId.hasOwnProperty(id)) arr.push(byPageId[id]);
            return arr;
        });
    }

    function fetchDetails(members) {
        var thumbSize = isMobile() ? 150 : 300;
        var chunks = [];
        for (var i = 0; i < members.length; i += DETAIL_CHUNK) {
            chunks.push(members.slice(i, i + DETAIL_CHUNK));
        }

        var byTitle = {};
        var chain = $.Deferred().resolve().promise();
        chunks.forEach(function (chunk) {
            chain = chain.then(function () {
                var titles = chunk.map(function (m) { return m.title; });
                return new mw.Api().get({
                    action: 'query',
                    titles: titles.join('|'),
                    prop: 'pageimages|pageprops',
                    piprop: 'thumbnail',
                    pithumbsize: thumbSize,
                    ppprop: 'displaytitle',
                    format: 'json'
                }).then(function (data) {
                    var pages = (data.query && data.query.pages) || {};
                    Object.keys(pages).forEach(function (k) {
                        byTitle[pages[k].title] = pages[k];
                    });
                });
            });
        });

        return chain.then(function () { return byTitle; });
    }

    function buildDataset(members, detailsByTitle) {
        return members.map(function (m) {
            var page = detailsByTitle[m.title] || {};
            var displayName = m.title;
            if (page.pageprops && page.pageprops.displaytitle) {
                var tmp = document.createElement('div');
                tmp.innerHTML = page.pageprops.displaytitle;
                displayName = tmp.textContent || tmp.innerText || m.title;
            }
            return {
                title: m.title,
                displayName: displayName,
                timestamp: m.timestamp,
                thumbnail: page.thumbnail ? page.thumbnail.source : null
            };
        });
    }

    function loadDataset(categories) {
        var cached = readCache(categories);
        if (cached) return $.Deferred().resolve(cached).promise();

        return fetchAllMembers(categories).then(function (members) {
            if (!members.length) return [];
            return fetchDetails(members).then(function (detailsByTitle) {
                var dataset = buildDataset(members, detailsByTitle);
                writeCache(categories, dataset);
                return dataset;
            });
        });
    }

    // ---- Sorting / grouping ----

    function sortDataset(dataset, sortValue) {
        var arr = dataset.slice();
        if (sortValue === 'alpha_asc') {
            arr.sort(function (a, b) { return a.displayName.localeCompare(b.displayName); });
        } else if (sortValue === 'alpha_desc') {
            arr.sort(function (a, b) { return b.displayName.localeCompare(a.displayName); });
        } else if (sortValue === 'added_desc') {
            arr.sort(function (a, b) { return new Date(b.timestamp) - new Date(a.timestamp); });
        } else if (sortValue === 'added_asc') {
            arr.sort(function (a, b) { return new Date(a.timestamp) - new Date(b.timestamp); });
        }
        return arr;
    }

    function groupLabel(item, sortConfig) {
        if (sortConfig.group === 'letter') {
            var ch = item.displayName.trim().charAt(0).toUpperCase();
            return /[A-Z]/.test(ch) ? ch : '#';
        }
        var d = new Date(item.timestamp);
        return d.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
    }

    function groupItems(sortedArr, sortConfig) {
        var groups = [];
        var current = null;
        sortedArr.forEach(function (item) {
            var label = groupLabel(item, sortConfig);
            if (!current || current.label !== label) {
                current = { label: label, items: [] };
                groups.push(current);
            }
            current.items.push(item);
        });
        return groups;
    }

    // ---- Rendering ----

    function renderSkeleton(container, limit) {
        var grid = document.createElement('div');
        grid.className = 'ccg-skeleton-grid';
        for (var i = 0; i < limit; i++) {
            var card = document.createElement('div');
            card.className = 'ccg-skeleton-card';
            var img = document.createElement('div');
            img.className = 'ccg-skeleton-image';
            var line = document.createElement('div');
            line.className = 'ccg-skeleton-line';
            card.appendChild(img);
            card.appendChild(line);
            grid.appendChild(card);
        }
        container.appendChild(grid);
    }

    function clearBody(container) {
        ['.ccg-skeleton-grid', '.ccg-groups', '.ccg-load-more', '.ccg-empty-state', '.ccg-error-state']
            .forEach(function (sel) {
                var el = container.querySelector(sel);
                if (el) el.remove();
            });
    }

    function render(container) {
        var state = container.ccgState;
        clearBody(container);

        var query = state.searchQuery.trim().toLowerCase();
        var filtered = query
            ? state.sortedDataset.filter(function (item) { return item.displayName.toLowerCase().indexOf(query) !== -1; })
            : state.sortedDataset;

        updateStats(container, filtered.length, state.dataset.length);

        if (!state.dataset.length) {
            renderEmptyState(container, 'No pages found in this category yet.');
            return;
        }
        if (!filtered.length) {
            renderEmptyState(container, 'No pages match your search.');
            return;
        }

        var visible = filtered.slice(0, state.renderedCount);
        var groups = groupItems(visible, getSortConfig(state.sort));

        var groupsEl = document.createElement('div');
        groupsEl.className = 'ccg-groups';

        groups.forEach(function (g) {
            var header = document.createElement('div');
            header.className = 'ccg-group-header';
            var text = document.createElement('span');
            text.textContent = g.label;
            var count = document.createElement('span');
            count.className = 'ccg-group-count';
            count.textContent = '(' + g.items.length + ')';
            header.appendChild(text);
            header.appendChild(count);
            groupsEl.appendChild(header);

            var grid = document.createElement('div');
            grid.className = 'ccg-grid';
            g.items.forEach(function (item) {
                grid.appendChild(buildCard(item));
            });
            groupsEl.appendChild(grid);
        });

        container.appendChild(groupsEl);

        if (state.renderedCount < filtered.length) {
            var btn = document.createElement('button');
            btn.className = 'ccg-load-more';
            btn.type = 'button';
            btn.textContent = 'Load More';
            btn.addEventListener('click', function () {
                state.renderedCount += state.limit;
                render(container);
            });
            container.appendChild(btn);
        }
    }

    function buildCard(item) {
        var card = document.createElement('a');
        card.className = 'ccg-card';
        card.href = mw.util.getUrl(item.title);

        var img = document.createElement('img');
        img.className = 'ccg-card-image';
        img.loading = 'lazy';
        img.alt = item.displayName;
        if (item.thumbnail) {
            img.src = item.thumbnail;
        } else {
            img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBTAA7';
        }

        var title = document.createElement('div');
        title.className = 'ccg-card-title';
        title.textContent = item.displayName;

        card.appendChild(img);
        card.appendChild(title);
        return card;
    }

    function updateStats(container, shown, total) {
        var stats = container.querySelector('.ccg-stats');
        if (!stats) return;
        if (shown === total) {
            stats.textContent = total + (total === 1 ? ' page' : ' pages');
        } else {
            stats.textContent = shown + ' of ' + total + ' pages';
        }
    }

    function renderEmptyState(container, message) {
        var el = document.createElement('div');
        el.className = 'ccg-empty-state';
        el.textContent = message;
        container.appendChild(el);
    }

    function renderErrorState(container, onRetry) {
        clearBody(container);
        var el = document.createElement('div');
        el.className = 'ccg-error-state';
        el.setAttribute('role', 'alert');
        var msg = document.createElement('div');
        msg.textContent = 'Couldn\u2019t load this gallery. Check your connection and try again.';
        var btn = document.createElement('button');
        btn.className = 'ccg-retry-btn';
        btn.type = 'button';
        btn.textContent = 'Retry';
        btn.addEventListener('click', onRetry);
        el.appendChild(msg);
        el.appendChild(btn);
        container.appendChild(el);
    }

    // ---- Controls ----

    function buildControls(container) {
        var state = container.ccgState;
        var controls = document.createElement('div');
        controls.className = 'ccg-controls';

        var left = document.createElement('div');
        left.className = 'ccg-controls-left';

        var stats = document.createElement('span');
        stats.className = 'ccg-stats';
        stats.setAttribute('aria-live', 'polite');
        left.appendChild(stats);

        var searchLabel = document.createElement('label');
        searchLabel.className = 'ccg-visually-hidden';
        searchLabel.setAttribute('for', 'ccg-search-' + state.uid);
        searchLabel.textContent = 'Search pages';

        var search = document.createElement('input');
        search.type = 'search';
        search.id = 'ccg-search-' + state.uid;
        search.className = 'ccg-search-input';
        search.placeholder = 'Search...';
        var searchTimer = null;
        search.addEventListener('input', function () {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(function () {
                state.searchQuery = search.value;
                state.renderedCount = state.limit;
                render(container);
            }, SEARCH_DEBOUNCE_MS);
        });

        left.appendChild(searchLabel);
        left.appendChild(search);

        var right = document.createElement('div');
        right.className = 'ccg-controls-right';

        var sortLabel = document.createElement('label');
        sortLabel.className = 'ccg-visually-hidden';
        sortLabel.setAttribute('for', 'ccg-sort-' + state.uid);
        sortLabel.textContent = 'Sort order';

        var select = document.createElement('select');
        select.id = 'ccg-sort-' + state.uid;
        select.className = 'ccg-sort-select';
        SORT_OPTIONS.forEach(function (opt) {
            var o = document.createElement('option');
            o.value = opt.value;
            o.textContent = opt.label;
            if (opt.value === state.sort) o.selected = true;
            select.appendChild(o);
        });
        select.addEventListener('change', function () {
            state.sort = select.value;
            state.sortedDataset = sortDataset(state.dataset, state.sort);
            state.renderedCount = state.limit;
            render(container);
        });

        var randomBtn = document.createElement('button');
        randomBtn.className = 'ccg-random-btn';
        randomBtn.type = 'button';
        randomBtn.textContent = '\uD83C\uDFB2 Random';
        randomBtn.setAttribute('aria-label', 'Go to a random page');
        randomBtn.addEventListener('click', function () {
            if (!state.dataset.length) return;
            var pick = state.dataset[Math.floor(Math.random() * state.dataset.length)];
            window.location.href = mw.util.getUrl(pick.title);
        });

        right.appendChild(sortLabel);
        right.appendChild(select);
        right.appendChild(randomBtn);

        buildCreateControls(container, right);

        controls.appendChild(left);
        controls.appendChild(right);
        container.appendChild(controls);
    }

    function buildCreateControls(container, mountEl) {
        var state = container.ccgState;
        var category = state.categories[0];

        var pagePath = container.dataset.pagepath || '';
        if (pagePath && pagePath.charAt(pagePath.length - 1) !== '/') pagePath += '/';

        var preloadPage = container.dataset.preload || DEFAULT_PRELOAD;
        var addCategory = container.dataset.addcategory === 'yes';

        var createBtn = document.createElement('button');
        createBtn.className = 'ccg-create-btn';
        createBtn.type = 'button';
        createBtn.textContent = '+ Create Page';

        var form = document.createElement('div');
        form.className = 'ccg-create-form';

        if (pagePath) {
            var prefixLabel = document.createElement('span');
            prefixLabel.className = 'ccg-create-prefix';
            prefixLabel.textContent = pagePath;
            form.appendChild(prefixLabel);
        }

        var inputLabel = document.createElement('label');
        inputLabel.className = 'ccg-visually-hidden';
        inputLabel.setAttribute('for', 'ccg-create-input-' + state.uid);
        inputLabel.textContent = 'New page name';

        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'ccg-create-input-' + state.uid;
        input.className = 'ccg-create-input';
        input.placeholder = pagePath ? 'Page_Name' : 'New page title...';

        var goBtn = document.createElement('button');
        goBtn.className = 'ccg-create-go';
        goBtn.type = 'button';
        goBtn.textContent = 'Go';

        var cancelBtn = document.createElement('button');
        cancelBtn.className = 'ccg-create-cancel';
        cancelBtn.type = 'button';
        cancelBtn.textContent = 'Cancel';

        var warning = document.createElement('div');
        warning.className = 'ccg-create-warning';
        warning.setAttribute('role', 'status');

        function openForm() {
            createBtn.style.display = 'none';
            form.classList.add('ccg-open');
            input.focus();
        }
        function closeForm() {
            form.classList.remove('ccg-open');
            createBtn.style.display = '';
            input.value = '';
            warning.textContent = '';
        }
        function navigateToCreate(fullTitle) {
            var params = { action: 'edit', preload: preloadPage };
            if (addCategory) params['preloadparams[]'] = category;
            window.location.href = mw.util.getUrl(fullTitle, params);
        }
        function goToCreate() {
            var raw = input.value.trim();
            if (!raw) { input.focus(); return; }
            var fullTitle = pagePath + raw.replace(/ /g, '_');
            var normalizedTarget = normalizeTitle(fullTitle);

            var existsLocally = state.dataset.some(function (item) {
                return normalizeTitle(item.title) === normalizedTarget;
            });
            if (existsLocally) {
                warning.textContent = 'A page with this name already exists in this list.';
                return;
            }

            goBtn.disabled = true;
            goBtn.textContent = 'Checking...';
            new mw.Api().get({ action: 'query', titles: fullTitle, format: 'json' }).then(function (data) {
                var pages = (data.query && data.query.pages) || {};
                var missing = Object.keys(pages).some(function (k) { return pages[k].missing !== undefined; });
                goBtn.disabled = false;
                goBtn.textContent = 'Go';
                if (!missing) {
                    warning.textContent = 'That page already exists \u2014 opening it for editing.';
                    setTimeout(function () { navigateToCreate(fullTitle); }, 800);
                } else {
                    navigateToCreate(fullTitle);
                }
            }).catch(function () {
                goBtn.disabled = false;
                goBtn.textContent = 'Go';
                navigateToCreate(fullTitle);
            });
        }

        createBtn.addEventListener('click', openForm);
        cancelBtn.addEventListener('click', closeForm);
        goBtn.addEventListener('click', goToCreate);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') goToCreate();
            if (e.key === 'Escape') closeForm();
        });

        form.appendChild(inputLabel);
        form.appendChild(input);
        form.appendChild(goBtn);
        form.appendChild(cancelBtn);
        form.appendChild(warning);

        mountEl.appendChild(createBtn);
        mountEl.appendChild(form);
    }

    // ---- Init ----

    var uidCounter = 0;

    function initGallery(container) {
        var categoriesRaw = container.dataset.category || '';
        var categories = categoriesRaw.split('|').map(function (c) { return c.trim(); }).filter(Boolean);
        if (!categories.length) return;

        uidCounter++;
        container.ccgState = {
            uid: uidCounter,
            categories: categories,
            limit: parseInt(container.dataset.limit, 10) || 12,
            sort: container.dataset.sort || 'alpha_asc',
            dataset: [],
            sortedDataset: [],
            searchQuery: '',
            renderedCount: parseInt(container.dataset.limit, 10) || 12
        };

        buildControls(container);
        renderSkeleton(container, container.ccgState.limit);

        loadDataset(categories).then(function (dataset) {
            container.ccgState.dataset = dataset;
            container.ccgState.sortedDataset = sortDataset(dataset, container.ccgState.sort);
            render(container);
        }).catch(function () {
            renderErrorState(container, function () {
                clearBody(container);
                renderSkeleton(container, container.ccgState.limit);
                initGalleryRetryOnly(container, categories);
            });
        });
    }

    function initGalleryRetryOnly(container, categories) {
        loadDataset(categories).then(function (dataset) {
            container.ccgState.dataset = dataset;
            container.ccgState.sortedDataset = sortDataset(dataset, container.ccgState.sort);
            render(container);
        }).catch(function () {
            renderErrorState(container, function () {
                clearBody(container);
                renderSkeleton(container, container.ccgState.limit);
                initGalleryRetryOnly(container, categories);
            });
        });
    }

    function init() {
        if (typeof mw === 'undefined' || !mw.Api) return;
        document.querySelectorAll('.category-card-gallery').forEach(function (el) {
            if (!el.dataset.loaded) {
                el.dataset.loaded = '1';
                initGallery(el);
            }
        });
    }

    if (typeof mw !== 'undefined' && mw.hook) {
        mw.hook('wikipage.content').add(init);
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }
})();