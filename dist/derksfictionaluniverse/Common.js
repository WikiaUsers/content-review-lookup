/* Any JavaScript here will be loaded for all users on every page load. */

/* Automatically request higher-resolution Fandom article thumbnails. */
(function () {
    'use strict';

    var SCALE = 2;
    var MAX_WIDTH = 2048;
    var states = new WeakMap();
    var sizePattern = /\/scale-to-width-down\/(\d+)\/?$/;

    function improve(image) {
        if (image.tagName !== 'IMG') return;

        var src = image.getAttribute('src') || '';
        var previous = states.get(image);

        /* Do not repeatedly enlarge an image or retry a failed version. */
        if (previous && (src === previous.larger ||
                (previous.failed && src === previous.original))) return;

        /* Preserve images that already have responsive-image handling. */
        if (image.closest('picture') ||
                image.getAttribute('srcset') ||
                image.getAttribute('data-srcset')) return;

        /* Require existing display dimensions. */
        if (!(Number(image.getAttribute('width')) > 0) ||
                !(Number(image.getAttribute('height')) > 0)) return;

        var url;

        try {
            url = new URL(src, document.baseURI);
        } catch (error) {
            return;
        }

        /* Only process ordinary Fandom image thumbnails. */
        if (url.protocol !== 'https:' ||
                url.hostname !== 'static.wikia.nocookie.net') return;

        if (!/\.(svg|png|jpe?g|webp)\/revision\//i.test(url.pathname)) return;

        var match = url.pathname.match(sizePattern);
        if (!match) return;

        var width = Number(match[1]);
        var largerWidth = Math.min(width * SCALE, MAX_WIDTH);

        if (!(width > 0) || largerWidth <= width) return;

        url.pathname = url.pathname.replace(
            sizePattern,
            '/scale-to-width-down/' + largerWidth
        );

        states.set(image, {
            original: src,
            larger: url.href,
            failed: false
        });

        /* Change the downloaded image; retain its existing dimensions. */
        image.setAttribute('src', url.href);
    }

    function scan(node) {
        if (node.nodeType !== 1) return;

        if (node.tagName === 'IMG') improve(node);

        node.querySelectorAll('img').forEach(improve);
    }

    function start() {
        var content = document.getElementById('mw-content-text');

        if (!content || content.hasAttribute('data-sharper-images')) return;

        content.setAttribute('data-sharper-images', 'true');

        /* Restore the original if a larger thumbnail cannot be loaded. */
        content.addEventListener('error', function (event) {
            var image = event.target;
            var state = states.get(image);

            if (!state ||
                    image.getAttribute('src') !== state.larger) return;

            state.failed = true;
            image.setAttribute('src', state.original);
        }, true);

        /* Handle images inserted or loaded after the page first appears. */
        new MutationObserver(function (changes) {
            changes.forEach(function (change) {
                if (change.type === 'attributes') {
                    improve(change.target);
                } else {
                    change.addedNodes.forEach(scan);
                }
            });
        }).observe(content, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [
                'src',
                'width',
                'height',
                'srcset',
                'data-srcset'
            ]
        });

        scan(content);
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            start,
            { once: true }
        );
    } else {
        start();
    }
}());

/* Accent-insensitive article suggestions for Fandom desktop.
 * Uses ES5-compatible syntax for Fandom's JavaScript validator.
 */
(function () {
    'use strict';

    mw.loader.using(['mediawiki.api', 'mediawiki.util']).then(function () {
        if (document.readyState !== 'loading') return;
        return new Promise(function (resolve) {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
        });
    }).then(function () {
        if (document.getElementById('accent-title-suggestions')) return;

        var SELECTOR = 'input.search-app__input';
        var CACHE_KEY = 'accentTitles:v1:' + mw.config.get('wgDBname');
        var CACHE_AGE = 6 * 60 * 60 * 1000;
        var api = new mw.Api();
        var index, indexTime = 0, pending, retryAfter = 0;
        var input, root, timer, generation = 0, selected = -1;
        var links = [], savedAttributes;
        var panel = document.createElement('div');

        panel.id = 'accent-title-suggestions';
        panel.hidden = true;
        panel.setAttribute('role', 'listbox');
        panel.setAttribute('aria-label', 'Articles on this wiki');
        document.body.appendChild(panel);

        mw.util.addCSS([
            '#accent-title-suggestions { position:fixed; z-index:2000001;',
            'box-sizing:border-box; overflow:auto; max-height:320px;',
            'background:var(--theme-page-background-color,#fff);',
            'color:var(--theme-page-text-color,#222);',
            'border:1px solid var(--theme-border-color,#bbb);',
            'border-radius:4px; box-shadow:0 4px 16px #0003;',
            'font:14px/1.4 sans-serif; }',
            '#accent-title-suggestions[hidden] { display:none !important; }',
            '#accent-title-suggestions .accent-heading { padding:8px 12px;',
            'font-size:12px; opacity:.75; border-bottom:1px solid #8884; }',
            '#accent-title-suggestions a { display:block; padding:8px 12px;',
            'color:inherit; text-decoration:none; overflow-wrap:anywhere; }',
            '#accent-title-suggestions a:hover,',
            '#accent-title-suggestions a[aria-selected="true"] {',
            'background:var(--theme-link-color,#146eb4); color:#fff; }',
            '.accent-search-active .search-app__suggestions-box {',
            'display:none !important; }'
        ].join('\n'));

        function fold(text) {
            return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                .toLowerCase().replace(/\u00f8/g, 'o').replace(/\u00e6/g, 'ae')
                .replace(/\u0153/g, 'oe').replace(/\u00df/g, 'ss')
                .replace(/[\u2010-\u2015]/g, '-').replace(/[_\s]+/g, ' ').trim();
        }

        function buildIndex(titles, time) {
            indexTime = time;
            index = titles.map(function (title) {
                return { title: title, key: fold(title) };
            });
            return index;
        }

        function loadTitles() {
            if (index && Date.now() - indexTime < CACHE_AGE) {
                return Promise.resolve(index);
            }

            if (pending) return pending;

            try {
                var cache = JSON.parse(localStorage.getItem(CACHE_KEY));
                if (cache && Number.isFinite(cache.time) &&
                    Date.now() >= cache.time &&
                    Date.now() - cache.time < CACHE_AGE &&
                    Array.isArray(cache.titles) &&
                    cache.titles.every(function (t) {
                        return typeof t === 'string';
                    })) {
                    return Promise.resolve(buildIndex(cache.titles, cache.time));
                }
            } catch (ignore) {}

            if (Date.now() < retryAfter) return Promise.resolve(null);

            pending = Promise.resolve().then(function () {
                var titles = [];

                function nextBatch(continuation) {
                    return Promise.resolve(api.get(Object.assign({
                        action: 'query',
                        list: 'allpages',
                        apnamespace: 0,
                        apfilterredir: 'nonredirects',
                        aplimit: 500,
                        formatversion: 2
                    }, continuation))).then(function (data) {
                        if (!data.query || !Array.isArray(data.query.allpages)) {
                            throw new Error('Unexpected article-list response.');
                        }

                        data.query.allpages.forEach(function (page) {
                            if (typeof page.title === 'string') {
                                titles.push(page.title);
                            }
                        });

                        return data.continue ? nextBatch(data.continue) : titles;
                    });
                }

                return nextBatch({});
            }).then(function (titles) {
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        time: Date.now(),
                        titles: titles
                    }));
                } catch (ignore) {}

                return buildIndex(titles, Date.now());
            }).then(function (entries) {
                pending = null;
                return entries;
            }, function (error) {
                pending = null;
                retryAfter = Date.now() + 60000;
                console.warn('Accent title search could not load articles.', error);
                return null;
            });

            return pending;
        }

        function close() {
            generation++;
            clearTimeout(timer);
            panel.hidden = true;

            if (root) root.classList.remove('accent-search-active');

            if (input && savedAttributes) {
                Object.keys(savedAttributes).forEach(function (name) {
                    if (savedAttributes[name] === null) {
                        input.removeAttribute(name);
                    } else {
                        input.setAttribute(name, savedAttributes[name]);
                    }
                });
            }

            savedAttributes = null;
            selected = -1;
        }

        function position() {
            if (panel.hidden) return;

            var rect = input.getBoundingClientRect();

            if (!input.isConnected || !rect.width || !rect.height ||
                rect.bottom <= 0 || rect.top >= window.innerHeight) {
                return close();
            }

            var width = Math.min(Math.max(rect.width, 260), window.innerWidth - 16);
            panel.style.width = width + 'px';
            panel.style.left = Math.max(
                8,
                Math.min(rect.left, window.innerWidth - width - 8)
            ) + 'px';

            var below = window.innerHeight - rect.bottom - 12;
            var above = rect.top - 12;
            var opensBelow = below >= Math.min(200, above);
            var height = Math.max(0, Math.min(320, opensBelow ? below : above));

            panel.style.maxHeight = height + 'px';
            panel.style.top = (
                opensBelow ?
                    rect.bottom + 4 :
                    Math.max(8, rect.top - Math.min(panel.scrollHeight, height) - 4)
            ) + 'px';
        }

        function render(matches) {
            panel.replaceChildren();

            var heading = document.createElement('div');
            heading.className = 'accent-heading';
            heading.textContent = 'Articles on this wiki';
            heading.setAttribute('role', 'presentation');
            panel.appendChild(heading);

            links = matches.map(function (match, i) {
                var link = document.createElement('a');
                link.textContent = match.title;
                link.href = mw.util.getUrl(match.title);
                link.id = 'accent-title-option-' + i;
                link.setAttribute('role', 'option');
                link.setAttribute('aria-selected', 'false');
                panel.appendChild(link);
                return link;
            });

            savedAttributes = {};
            [
                'role',
                'aria-controls',
                'aria-expanded',
                'aria-autocomplete',
                'aria-activedescendant'
            ].forEach(function (name) {
                savedAttributes[name] = input.getAttribute(name);
            });

            input.setAttribute('role', 'combobox');
            input.setAttribute('aria-controls', panel.id);
            input.setAttribute('aria-expanded', 'true');
            input.setAttribute('aria-autocomplete', 'list');
            input.removeAttribute('aria-activedescendant');

            root = input.closest('.search-container') ||
                input.closest('.search-app__wrapper') ||
                input.parentElement;

            root.classList.add('accent-search-active');
            panel.hidden = false;
            position();
        }

        function update(field, ticket) {
            var query = fold(field.value);
            if (query.length < 2) return;

            loadTitles().then(function (entries) {
                if (!entries || ticket !== generation ||
                    document.activeElement !== field ||
                    !field.isConnected) {
                    return;
                }

                var matches = [];

                entries.forEach(function (entry) {
                    var at = entry.key.indexOf(query);
                    if (at < 0) return;

                    var rank = entry.key === query ? 0 :
                        at === 0 ? 1 :
                        /[\s(\/-]/.test(entry.key.charAt(at - 1)) ? 2 : 3;

                    matches.push({ title: entry.title, rank: rank });
                });

                matches.sort(function (a, b) {
                    return a.rank - b.rank || a.title.localeCompare(b.title);
                });

                if (matches.length) render(matches.slice(0, 8));
            });
        }

        function schedule(event) {
            if (!event.target.matches(SELECTOR)) return;

            close();
            input = event.target;

            if (event.isComposing) return;

            var ticket = generation;
            var field = input;

            timer = setTimeout(function () {
                update(field, ticket);
            }, 140);
        }

        document.addEventListener('input', schedule, true);
        document.addEventListener('focusin', schedule, true);
        document.addEventListener('compositionstart', function (event) {
            if (event.target.matches(SELECTOR)) close();
        }, true);
        document.addEventListener('compositionend', schedule, true);

        window.addEventListener('pointerdown', function (event) {
            if (panel.contains(event.target)) {
                event.stopImmediatePropagation();
                if (event.button === 0) event.preventDefault();
            } else if (event.target !== input) {
                close();
            }
        }, true);

        ['mousedown', 'click', 'auxclick'].forEach(function (type) {
            window.addEventListener(type, function (event) {
                if (panel.contains(event.target)) {
                    event.stopImmediatePropagation();
                }
            }, true);
        });

        document.addEventListener('focusout', function (event) {
            if (event.target === input && !panel.contains(event.relatedTarget)) {
                close();
            }
        }, true);

        window.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && event.target.matches(SELECTOR)) {
                close();
                return;
            }

            if (panel.hidden || event.target !== input || event.isComposing) return;

            if (event.key === 'Tab') {
                close();
                return;
            }

            if (event.ctrlKey || event.metaKey || event.altKey) return;
            if (['ArrowDown', 'ArrowUp', 'Enter'].indexOf(event.key) < 0) return;

            event.preventDefault();
            event.stopImmediatePropagation();

            if (event.key === 'Enter') {
                window.location.assign(
                    selected >= 0 ?
                        links[selected].href :
                        mw.util.getUrl('Special:Search', { query: input.value })
                );
                return;
            }

            selected = event.key === 'ArrowDown' ?
                (selected + 1) % links.length :
                (selected < 0 ?
                    links.length - 1 :
                    (selected + links.length - 1) % links.length);

            links.forEach(function (link, i) {
                link.setAttribute('aria-selected', String(i === selected));
            });

            input.setAttribute('aria-activedescendant', links[selected].id);
            links[selected].scrollIntoView({ block: 'nearest' });
        }, true);

        window.addEventListener('resize', position);
        document.addEventListener('scroll', function (event) {
            if (!panel.contains(event.target)) position();
        }, true);

        if (document.activeElement && document.activeElement.matches(SELECTOR)) {
            schedule({ target: document.activeElement });
        }
    });
}());