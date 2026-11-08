/* =====================================================================
   IGDRASYL | MediaWiki:Common.js
   Revision: The Living Archive

   Reader experience and editor conveniences for FandomDesktop.
   Works with MediaWiki:Common.css (classes .ig-*, tokens --ig-*).

   What it does
   01  New Page shortcut in the community and sticky headers
   02  Back to top button
   03  Reading progress line
   04  Section permalinks (copy a link to any heading)
   05  Spoilers that reveal on click, Enter or Space
   06  Accessible custom accordions, navboxes and spoiler panels
   07  Opt-in table search (data-ig-filterable)
   08  Copy buttons on code blocks
   09  Stillness: one control that quiets every animation, remembered
   10  Scroll reveal for headings, panels and illustrations
   11  Float guard: article images never bleed into the next section
   12  Image arrival: loading images fade in instead of popping
   13  Spotlight and tilt on cards and relic panels
   14  Counters that count up once when first seen
   15  Cipher text that resolves from shifting glyphs
   16  The celestial readout: Heilon by day, Selûne by night
   17  Gentle parallax for elements marked data-ig-parallax
   18  The atmosphere layer: leaves of Irminsul, Gihon motes, Selûne's glow

   Rules it keeps
   No third-party code, network calls, auto-editing or analytics.
   No change to wiki content, canon, global navigation or ads.
   ES5 syntax only, so Fandom's script review accepts it unchanged.
   Every motion feature respects prefers-reduced-motion and Stillness.

   INSTALL: igdrasyl.fandom.com/wiki/MediaWiki:Common.js
   NOTE: Fandom must enable site JavaScript and approve each revision.
   ===================================================================== */
/* global mw, jQuery */
(function ($, mw, window, document) {
    'use strict';

    if (!$ || !mw || !mw.loader || !mw.config || window.IgdrasylCommonJSLoaded) {
        return;
    }
    window.IgdrasylCommonJSLoaded = true;

    /* Switch any optional enhancement off here without removing its code. */
    var IG = {
        newPageButton: true,
        backToTop: true,
        readingProgress: true,
        sectionPermalinks: true,
        interactiveSpoilers: true,
        collapsiblePanels: true,
        searchableTables: true,
        codeCopyButtons: true,
        stillnessToggle: true,
        scrollReveal: true,
        floatGuard: true,
        imageArrival: true,
        spotlight: true,
        tilt: true,
        counters: true,
        cipher: true,
        celestial: true,
        parallax: true,
        atmosphere: true,
        backToTopAfter: 520,
        atmosphereMinWidth: 900,
        stillnessKey: 'igdrasyl-stillness'
    };

    var html = document.documentElement;
    html.classList.add('ig-js');

    /* Stillness is applied before anything else so nothing flickers into motion. */
    function readStillness() {
        try { return window.localStorage.getItem(IG.stillnessKey) === '1'; } catch (ignore) { return false; }
    }
    function writeStillness(on) {
        try { window.localStorage.setItem(IG.stillnessKey, on ? '1' : '0'); } catch (ignore) { /* private mode */ }
    }
    if (readStillness()) { html.classList.add('ig-still'); }

    mw.loader.using(['mediawiki.util']).then(function () {
        $(function () {
            var isArticleView = mw.config.get('wgAction') === 'view' &&
                Number(mw.config.get('wgNamespaceNumber')) >= 0;
            var reducedMotionQuery = window.matchMedia ?
                window.matchMedia('(prefers-reduced-motion: reduce)') : null;
            var finePointer = window.matchMedia ?
                window.matchMedia('(hover: hover) and (pointer: fine)').matches : false;
            var createPageUrl = mw.util.getUrl('Special:CreatePage');
            var root = getArticleRoot();
            var progressBar = null;
            var topButton = null;
            var scrollQueued = false;
            var lastHeaderCheck = 0;
            var revealObserver = null;
            var seenObserver = null;
            var guardTimer = null;
            var parallaxNodes = [];
            var atmosphere = null;

            if (mw.config.get('wgIsMainPage')) { html.classList.add('ig-mainpage'); }
            html.setAttribute('data-ig-ns', String(mw.config.get('wgNamespaceNumber')));

            function element(tag, className, text) {
                var node = document.createElement(tag);
                if (className) { node.className = className; }
                if (typeof text === 'string') { node.textContent = text; }
                return node;
            }

            function each(list, fn) {
                Array.prototype.forEach.call(list || [], fn);
            }

            function getArticleRoot() {
                return document.querySelector('.page-content .mw-parser-output') ||
                    document.querySelector('.page-content');
            }

            function motionAllowed() {
                var reduced = reducedMotionQuery ? reducedMotionQuery.matches : false;
                return !reduced && !html.classList.contains('ig-still');
            }

            function notice(message) {
                if (typeof mw.notify === 'function') {
                    mw.notify(message, { title: 'Igdrasyl', autoHide: true });
                }
            }

            function insideInfobox(node) {
                return !!(node.closest && node.closest('.portable-infobox'));
            }

            /* Only approved fonts, through the --ig-font-* tokens. */
            function addEnhancementStyles() {
                if (document.getElementById('ig-commonjs-styles')) { return; }
                var styles = element('style');
                styles.id = 'ig-commonjs-styles';
                styles.textContent = [
                    '.fandom-sticky-header .ig-sticky-newpage{height:32px;margin-right:5px;padding:3px 10px 0;min-width:34px;justify-content:center;}',
                    '.fandom-sticky-header .ig-sticky-newpage__label{display:none;}',
                    '.fandom-sticky-header .ig-sticky-newpage__icon{font-size:21px;line-height:1;}',
                    '.ig-reading-progress{position:fixed;left:0;bottom:0;z-index:21;width:100%;height:3px;pointer-events:none;opacity:0;transition:opacity .2s ease;}',
                    '.ig-reading-progress.is-visible{opacity:1;}',
                    '.ig-reading-progress__fill{height:100%;width:100%;transform:scaleX(0);transform-origin:left center;background:linear-gradient(90deg,var(--ig-gihon),var(--ig-root-gold),var(--ig-gihon));box-shadow:0 0 5px var(--ig-glow);}',
                    '.ig-section-permalink{display:inline-flex;vertical-align:middle;align-items:center;justify-content:center;min-width:25px;min-height:25px;margin-left:9px;padding:0 4px;border:1px solid transparent;border-radius:3px;background:transparent;color:var(--ig-text-mute);font:600 15px/1 var(--ig-font-ui);cursor:pointer;opacity:.56;}',
                    '.page-content h2:hover .ig-section-permalink,.page-content h3:hover .ig-section-permalink,.ig-section-permalink:focus-visible{opacity:1;color:var(--ig-accent-hot);border-color:var(--ig-edge);}',
                    '.ig-section-permalink:focus-visible,.ig-code-copy:focus-visible,.ig-table-filter__input:focus-visible{outline:2px solid var(--ig-accent-hot);outline-offset:2px;}',
                    '.ig-code-wrap{position:relative;}',
                    '.ig-code-copy{position:absolute;top:7px;right:7px;z-index:1;padding:5px 9px;background:var(--ig-surface-2);color:var(--ig-accent-hot);border:1px solid var(--ig-edge);border-radius:3px;font:600 11px/1.3 var(--ig-font-ui);cursor:pointer;}',
                    '.ig-code-copy:hover{background:var(--ig-accent);color:var(--ig-on-accent);}',
                    '.ig-table-filter{display:flex;align-items:center;flex-wrap:wrap;gap:9px;margin:13px 0 6px;padding:9px 11px;background:var(--ig-surface-2);border:1px solid var(--ig-edge);}',
                    '.ig-table-filter__label{color:var(--ig-text-dim);font:600 12px/1.4 var(--ig-font-ui);letter-spacing:.04em;}',
                    '.ig-table-filter__input{flex:1 1 175px;min-width:100px;padding:7px 9px;background:var(--ig-surface);color:var(--ig-text);border:1px solid var(--ig-line-strong);border-radius:2px;font:400 13px/1.3 var(--ig-font-ui);}',
                    '.ig-table-filter__count{color:var(--ig-text-mute);font:400 12px/1.3 var(--ig-font-meta);}',
                    '.ig-spoiler[data-ig-spoiler-ready="1"]:focus-visible{outline:2px solid var(--ig-accent-hot);outline-offset:3px;}',
                    '.ig-accordion__head[role="button"]:focus-visible,.ig-navbox__head[role="button"]:focus-visible,.ig-spoiler-panel__head[role="button"]:focus-visible{outline:2px solid var(--ig-accent-hot);outline-offset:-3px;}',
                    '.ig-js-collapsed > .ig-accordion__content,.ig-js-collapsed > .ig-spoiler-panel__content,.ig-js-collapsed > .ig-navbox__content,.ig-js-collapsed > .ig-navbox__row,.ig-js-collapsed > .ig-navbox__above,.ig-js-collapsed > .ig-navbox__below{display:none!important;}',
                    '.ig-sr-only{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}',
                    '@media print{.ig-reading-progress,.ig-section-permalink,.ig-code-copy,.ig-table-filter{display:none!important;}}',
                    '@media (prefers-reduced-motion:reduce){.ig-reading-progress,.ig-section-permalink{transition:none!important;}}'
                ].join('\n');
                (document.head || document.documentElement).appendChild(styles);
            }

            /* 01. "New Page" joins Fandom's existing header shortcut tools,
               in both the community header and the sticky header. */
            function addNewPageButton() {
                if (!IG.newPageButton || !mw.config.get('wgUserName')) { return; }
                var hosts = document.querySelectorAll(
                    '.fandom-community-header .wiki-tools, ' +
                    '.fandom-sticky-header .wiki-tools'
                );
                /* Fallback for older desktop layouts without header shortcuts. */
                if (!hosts.length) {
                    hosts = document.querySelectorAll('.page-header__actions');
                }
                each(hosts, function (host, index) {
                    if (host.querySelector('.ig-sticky-newpage')) { return; }
                    var link = element('a', 'ig-sticky-newpage');
                    link.id = 'ig-newpage-shortcut-' +
                        (host.closest('.fandom-sticky-header') ? 'sticky' :
                            host.closest('.fandom-community-header') ? 'community' : 'page-' + index);
                    link.href = createPageUrl;
                    link.title = 'Create a new article on Igdrasyl';
                    link.setAttribute('aria-label', 'Create a new page');
                    var icon = element('span', 'ig-sticky-newpage__icon', '+');
                    icon.setAttribute('aria-hidden', 'true');
                    var label = element('span', 'ig-sticky-newpage__label', 'New Page');
                    link.appendChild(icon);
                    link.appendChild(label);
                    host.insertBefore(link, host.firstChild);
                });
            }

            /* 02. Back to top, matching Common.css section 64. */
            function addBackToTop() {
                if (!IG.backToTop || topButton) { return; }
                topButton = element('button', 'ig-back-to-top');
                topButton.type = 'button';
                topButton.id = 'ig-back-to-top';
                topButton.title = 'Back to top';
                topButton.setAttribute('aria-label', 'Back to top of the page');
                var arrow = element('span', 'ig-back-to-top__arrow', '↑');
                arrow.setAttribute('aria-hidden', 'true');
                topButton.appendChild(arrow);
                topButton.appendChild(element('span', 'ig-back-to-top__label', 'Top'));
                topButton.addEventListener('click', function () {
                    window.scrollTo({ top: 0, behavior: motionAllowed() ? 'smooth' : 'auto' });
                });
                document.body.appendChild(topButton);
            }

            /* 03. Thin reading progress line along the bottom of the viewport. */
            function addReadingProgress() {
                if (!IG.readingProgress || !isArticleView || progressBar || !root) { return; }
                progressBar = element('div', 'ig-reading-progress');
                progressBar.setAttribute('aria-hidden', 'true');
                progressBar.appendChild(element('div', 'ig-reading-progress__fill'));
                document.body.appendChild(progressBar);
            }

            function updateScrollUI() {
                scrollQueued = false;
                var y = window.pageYOffset || document.documentElement.scrollTop || 0;
                var viewH = window.innerHeight || document.documentElement.clientHeight;
                /* Re-attach if Fandom recreates its sticky header after scrolling. */
                if (IG.newPageButton && y > 100 && Date.now() - lastHeaderCheck > 1200) {
                    lastHeaderCheck = Date.now();
                    addNewPageButton();
                }
                if (topButton) {
                    topButton.classList.toggle('is-visible', y > IG.backToTopAfter);
                }
                if (progressBar && root && document.documentElement.contains(root)) {
                    var rect = root.getBoundingClientRect();
                    var articleTop = rect.top + y;
                    var articleEnd = rect.bottom + y - viewH * 0.6;
                    var travel = Math.max(1, articleEnd - articleTop);
                    var fraction = Math.max(0, Math.min(1, (y - articleTop) / travel));
                    progressBar.firstChild.style.transform = 'scaleX(' + fraction.toFixed(4) + ')';
                    progressBar.classList.toggle('is-visible', y > articleTop + 90);
                }
                updateParallax(viewH);
            }

            function onScroll() {
                if (scrollQueued) { return; }
                scrollQueued = true;
                window.requestAnimationFrame(updateScrollUI);
            }

            /* Clipboard: modern API, with a legacy fallback. */
            function copyText(value, button) {
                function finish(ok) {
                    if (!ok) { notice('Copy failed. Select the text and copy it by hand.'); return; }
                    var original = button.textContent;
                    button.textContent = 'Copied';
                    window.setTimeout(function () { button.textContent = original; }, 1500);
                }
                if (window.navigator.clipboard && window.navigator.clipboard.writeText) {
                    window.navigator.clipboard.writeText(value).then(function () {
                        finish(true);
                    }, function () {
                        finish(fallbackCopy(value));
                    });
                } else {
                    finish(fallbackCopy(value));
                }
            }

            function fallbackCopy(value) {
                var field = element('textarea');
                field.value = value;
                field.setAttribute('readonly', '');
                field.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
                document.body.appendChild(field);
                field.select();
                var ok = false;
                try { ok = document.execCommand('copy'); } catch (ignore) { ok = false; }
                if (field.parentNode) { field.parentNode.removeChild(field); }
                return ok;
            }

            /* 04. Copy accurate deep links from headings, without replacing [edit]. */
            function addSectionPermalinks(scope) {
                if (!IG.sectionPermalinks) { return; }
                each(scope.querySelectorAll('h2, h3'), function (heading) {
                    if (!heading.closest('.page-content') || insideInfobox(heading)) { return; }
                    if (heading.querySelector('.ig-section-permalink')) { return; }
                    var headline = heading.querySelector('.mw-headline[id]');
                    var id = headline ? headline.id : heading.id;
                    if (!id) { return; }
                    var button = element('button', 'ig-section-permalink', '§');
                    button.type = 'button';
                    button.title = 'Copy link to this section';
                    button.setAttribute('aria-label', 'Copy link to section: ' +
                        (headline || heading).textContent.trim());
                    button.addEventListener('click', function () {
                        var url = window.location.href.split('#')[0] + '#' + encodeURIComponent(id);
                        copyText(url, button);
                    });
                    heading.appendChild(button);
                });
            }

            /* 05. Spoilers: click, Enter or Space to reveal; again to conceal. */
            function addInteractiveSpoilers(scope) {
                if (!IG.interactiveSpoilers) { return; }
                each(scope.querySelectorAll('.ig-spoiler'), function (spoiler) {
                    if (spoiler.getAttribute('data-ig-spoiler-ready') || spoiler.hasAttribute('data-ig-no-reveal')) { return; }
                    if (spoiler.querySelector('button,a,input,select,textarea')) { return; }
                    spoiler.setAttribute('data-ig-spoiler-ready', '1');
                    if (!spoiler.hasAttribute('tabindex')) { spoiler.tabIndex = 0; }
                    spoiler.setAttribute('role', 'button');
                    spoiler.setAttribute('aria-label', 'Reveal or conceal spoiler');
                    spoiler.setAttribute('aria-pressed', spoiler.classList.contains('ig-spoiler-revealed') ? 'true' : 'false');
                    function toggleSpoiler() {
                        var open = spoiler.classList.toggle('ig-spoiler-revealed');
                        spoiler.setAttribute('aria-pressed', open ? 'true' : 'false');
                    }
                    spoiler.addEventListener('click', toggleSpoiler);
                    spoiler.addEventListener('keydown', function (event) {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            toggleSpoiler();
                        }
                    });
                });
            }

            /* 06. Igdrasyl accordions, navboxes and spoiler panels.
               Respects MediaWiki's native mw-collapsible when present. */
            function addCollapsiblePanels(scope) {
                if (!IG.collapsiblePanels) { return; }
                var configs = [
                    ['.ig-accordion', '.ig-accordion__head', '.ig-accordion__content'],
                    ['.ig-spoiler-panel', '.ig-spoiler-panel__head', '.ig-spoiler-panel__content'],
                    ['.ig-navbox', '.ig-navbox__head', '.ig-navbox__content,.ig-navbox__row,.ig-navbox__above,.ig-navbox__below']
                ];
                configs.forEach(function (config) {
                    each(scope.querySelectorAll(config[0]), function (panel) {
                        if (panel.getAttribute('data-ig-toggle-ready')) { return; }
                        var head = panel.querySelector(config[1]);
                        if (!head || head.closest(config[0]) !== panel) { return; }
                        var children = Array.prototype.filter.call(panel.children, function (node) {
                            return node.matches(config[2]);
                        });
                        if (!children.length) { return; }
                        panel.setAttribute('data-ig-toggle-ready', '1');
                        if (!head.matches('button')) {
                            head.setAttribute('role', 'button');
                            head.setAttribute('tabindex', '0');
                        }
                        head.setAttribute('aria-expanded', panel.classList.contains('mw-collapsed') ? 'false' : 'true');
                        var usesNative = panel.classList.contains('mw-collapsible');
                        if (!usesNative && panel.classList.contains('mw-collapsed')) {
                            panel.classList.add('ig-js-collapsed');
                        }
                        function sync() {
                            head.setAttribute('aria-expanded', panel.classList.contains('mw-collapsed') ? 'false' : 'true');
                            scheduleFloatGuard();
                        }
                        function toggle() {
                            if (usesNative) {
                                var nativeLink = panel.querySelector('.mw-collapsible-toggle a, .mw-collapsible-toggle button');
                                if (nativeLink) {
                                    nativeLink.click();
                                    window.setTimeout(sync, 0);
                                    return;
                                }
                            }
                            var collapsed = panel.classList.toggle('mw-collapsed');
                            panel.classList.toggle('ig-js-collapsed', collapsed);
                            sync();
                        }
                        head.addEventListener('click', function (event) {
                            if (event.target !== head && event.target.closest('a,button,input,select,textarea')) { return; }
                            toggle();
                        });
                        head.addEventListener('keydown', function (event) {
                            if (event.key !== 'Enter' && event.key !== ' ') { return; }
                            if (event.target !== head || head.matches('button')) { return; }
                            event.preventDefault();
                            toggle();
                        });
                    });
                });
            }

            /* 07. Opt-in table search: add data-ig-filterable to any wiki table.
               Does not modify rows, their content or the page source. */
            function addSearchableTables(scope) {
                if (!IG.searchableTables) { return; }
                each(scope.querySelectorAll('table[data-ig-filterable], table.ig-filterable'), function (table) {
                    if (table.getAttribute('data-ig-filter-ready')) { return; }
                    var rows = Array.prototype.filter.call(table.querySelectorAll('tbody tr'), function (row) {
                        return !!row.querySelector('td');
                    });
                    if (!rows.length) { return; }
                    table.setAttribute('data-ig-filter-ready', '1');
                    var bar = element('div', 'ig-table-filter');
                    var id = 'ig-table-search-' + Math.random().toString(36).slice(2, 9);
                    var label = element('label', 'ig-table-filter__label', 'Search this table');
                    label.htmlFor = id;
                    var input = element('input', 'ig-table-filter__input');
                    input.id = id;
                    input.type = 'search';
                    input.placeholder = 'Filter entries…';
                    input.autocomplete = 'off';
                    var counter = element('span', 'ig-table-filter__count', rows.length + ' entries');
                    counter.setAttribute('aria-live', 'polite');
                    bar.appendChild(label);
                    bar.appendChild(input);
                    bar.appendChild(counter);
                    table.parentNode.insertBefore(bar, table);
                    input.addEventListener('input', function () {
                        var term = input.value.trim().toLocaleLowerCase();
                        var shown = 0;
                        rows.forEach(function (row) {
                            var match = !term || row.textContent.toLocaleLowerCase().indexOf(term) !== -1;
                            row.hidden = !match;
                            row.style.display = match ? '' : 'none';
                            if (match) { shown++; }
                        });
                        counter.textContent = shown + ' / ' + rows.length + ' entries';
                        scheduleFloatGuard();
                    });
                });
            }

            /* 08. Copy buttons on preformatted examples. */
            function addCodeCopyButtons(scope) {
                if (!IG.codeCopyButtons) { return; }
                each(scope.querySelectorAll('pre'), function (pre) {
                    if (!pre.closest('.page-content')) { return; }
                    if (pre.getAttribute('data-ig-code-ready') || pre.closest('.mw-highlight')) { return; }
                    if (!pre.textContent.trim() || pre.closest('form, .mw-editform')) { return; }
                    pre.setAttribute('data-ig-code-ready', '1');
                    var wrapper = element('div', 'ig-code-wrap');
                    pre.parentNode.insertBefore(wrapper, pre);
                    wrapper.appendChild(pre);
                    var copy = element('button', 'ig-code-copy', 'Copy');
                    copy.type = 'button';
                    copy.setAttribute('aria-label', 'Copy this code block');
                    copy.addEventListener('click', function () { copyText(pre.textContent, copy); });
                    wrapper.appendChild(copy);
                });
            }

            /* 09. Stillness toggle: quiets the whole archive for this reader. */
            function addStillnessToggle() {
                if (!IG.stillnessToggle || document.getElementById('ig-ambience-toggle')) { return; }
                if (mw.config.get('wgAction') !== 'view') { return; }
                var button = element('button', 'ig-ambience-toggle');
                button.type = 'button';
                button.id = 'ig-ambience-toggle';
                var mark = element('span', 'ig-ambience-toggle__mark', '✦');
                mark.setAttribute('aria-hidden', 'true');
                var label = element('span', 'ig-ambience-toggle__label');
                button.appendChild(mark);
                button.appendChild(label);
                function render() {
                    var still = html.classList.contains('ig-still');
                    label.textContent = still ? 'Wake the archive' : 'Still the archive';
                    button.title = still ? 'Turn animations back on' : 'Turn animations off';
                    button.setAttribute('aria-pressed', still ? 'true' : 'false');
                    button.setAttribute('aria-label', still ? 'Animations are off. Turn them on.' : 'Animations are on. Turn them off.');
                }
                button.addEventListener('click', function () {
                    var still = !html.classList.contains('ig-still');
                    html.classList.toggle('ig-still', still);
                    writeStillness(still);
                    render();
                    if (still) {
                        stopAtmosphere();
                        resetTilts();
                    } else {
                        startAtmosphere();
                    }
                });
                render();
                document.body.appendChild(button);
            }

            /* One shared observer for "do this once, the first time it is seen". */
            function whenSeen(node, callback) {
                if (!('IntersectionObserver' in window)) { callback(node); return; }
                if (!seenObserver) {
                    seenObserver = new window.IntersectionObserver(function (entries) {
                        entries.forEach(function (entry) {
                            if (!entry.isIntersecting) { return; }
                            seenObserver.unobserve(entry.target);
                            var list = entry.target.igSeenCallbacks || [];
                            entry.target.igSeenCallbacks = [];
                            list.forEach(function (fn) { fn(entry.target); });
                        });
                    }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
                }
                node.igSeenCallbacks = node.igSeenCallbacks || [];
                node.igSeenCallbacks.push(callback);
                seenObserver.observe(node);
            }

            /* 10. Scroll reveal. Nothing is hidden unless the observer exists
               and motion is allowed, so content can never be stranded unseen. */
            var REVEAL_SELECTOR = [
                'h2:not(.pi-title):not(.pi-header)',
                '.ig-card', '.ig-roster__item', '.ig-feature', '.ig-document',
                '.ig-timeline__entry', '.ig-relic-panel', '.ig-figure', '.thumb',
                'figure', '.ig-pullquote', '.ig-quote', 'blockquote', '.ig-callout',
                '.ig-organization', '.ig-location', '.ig-starfield', '.ig-grief',
                '.ig-threads', '.ig-directory-tile', '.ig-character-gallery__item',
                '.ig-stats', '.ig-labors > li', '.ig-verdict', '.ig-image-strip',
                '.ig-map-panel', '.ig-conversation', 'table.wikitable', '[data-ig-reveal]'
            ].join(',');
            var STAGGER_PARENTS = '.ig-card-grid,.ig-roster,.ig-directory-grid,.ig-character-gallery,.ig-labors,.ig-figure-row,[data-ig-stagger]';

            function addScrollReveal(scope) {
                if (!IG.scrollReveal || !isArticleView || !motionAllowed()) { return; }
                if (!('IntersectionObserver' in window)) { return; }
                var area = (scope === document) ? root : scope;
                if (!area || !area.querySelectorAll) { return; }
                if (!revealObserver) {
                    revealObserver = new window.IntersectionObserver(function (entries) {
                        entries.forEach(function (entry) {
                            if (!entry.isIntersecting) { return; }
                            entry.target.classList.add('is-revealed');
                            revealObserver.unobserve(entry.target);
                        });
                    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
                }
                each(area.querySelectorAll(REVEAL_SELECTOR), function (node) {
                    if (node.classList.contains('ig-reveal') || node.hasAttribute('data-ig-no-reveal')) { return; }
                    if (insideInfobox(node) || node.closest('.navbox, .ig-navbox, .ig-no-motion')) { return; }
                    if (node.parentElement && node.parentElement.closest('.ig-reveal')) { return; }
                    if (node.matches('.tright, .ig-figure--right, figure.mw-halign-right')) {
                        node.classList.add('ig-reveal--right');
                    } else if (node.matches('.tleft, .ig-figure--left, figure.mw-halign-left')) {
                        node.classList.add('ig-reveal--left');
                    } else if (node.matches('.ig-figure, .thumb, figure, .ig-starfield, .ig-relic-panel')) {
                        node.classList.add('ig-reveal--bloom');
                    }
                    /* data-ig-reveal="left|right|bloom" picks a direction by hand. */
                    var wanted = node.getAttribute('data-ig-reveal');
                    if (wanted === 'left' || wanted === 'right' || wanted === 'bloom') {
                        node.classList.add('ig-reveal--' + wanted);
                    }
                    var parent = node.parentElement;
                    if (parent && parent.matches(STAGGER_PARENTS)) {
                        var index = Array.prototype.indexOf.call(parent.children, node);
                        node.style.setProperty('--ig-reveal-delay', ((index % 8) * 0.07).toFixed(2) + 's');
                    }
                    node.classList.add('ig-reveal');
                    revealObserver.observe(node);
                });
                html.classList.add('ig-reveal-ready');
            }

            /* 11. Float guard. Infoboxes may run the length of an article, but an
               illustration belongs to its own section. When an article image from
               one section would hang down into the next, the next heading clears it. */
            var FLOAT_SELECTOR = '.tright,.tleft,figure.mw-halign-right,figure.mw-halign-left,' +
                '.ig-figure--right,.ig-figure--left,.floatright,.floatleft';

            function floatSide(node) {
                if (node.matches('.tleft, figure.mw-halign-left, .ig-figure--left, .floatleft')) { return 'left'; }
                return 'right';
            }

            function runFloatGuard() {
                guardTimer = null;
                if (!IG.floatGuard || !isArticleView) { return; }
                root = getArticleRoot();
                if (!root) { return; }
                var floats = Array.prototype.filter.call(root.querySelectorAll(FLOAT_SELECTOR), function (node) {
                    if (insideInfobox(node)) { return false; }
                    var outer = node.parentElement && node.parentElement.closest(FLOAT_SELECTOR);
                    return !outer && window.getComputedStyle(node).cssFloat !== 'none';
                });
                var headings = Array.prototype.filter.call(root.querySelectorAll('h2'), function (heading) {
                    return !insideInfobox(heading) && !heading.closest('.navbox, .ig-navbox, .ig-card, .ig-feature');
                });
                headings.forEach(function (heading) {
                    var box = heading.closest('.mw-heading') || heading;
                    box.classList.remove('ig-clear-right', 'ig-clear-left');
                });
                if (!floats.length) { return; }
                headings.forEach(function (heading) {
                    var box = heading.closest('.mw-heading') || heading;
                    var top = box.getBoundingClientRect().top;
                    floats.forEach(function (fig) {
                        /* Only images that come before this heading in the page. */
                        if (!(fig.compareDocumentPosition(box) & 4)) { return; }
                        if (fig.getBoundingClientRect().bottom > top + 1) {
                            box.classList.add(floatSide(fig) === 'left' ? 'ig-clear-left' : 'ig-clear-right');
                            top = box.getBoundingClientRect().top;
                        }
                    });
                });
            }

            function scheduleFloatGuard() {
                if (!IG.floatGuard) { return; }
                if (guardTimer) { window.clearTimeout(guardTimer); }
                guardTimer = window.setTimeout(runFloatGuard, 120);
            }

            /* 12. Image arrival: images still loading fade in when ready. */
            function addImageArrival(scope) {
                if (!IG.imageArrival || !isArticleView) { return; }
                var area = (scope === document) ? root : scope;
                if (!area || !area.querySelectorAll) { return; }
                each(area.querySelectorAll('img'), function (img) {
                    if (img.getAttribute('data-ig-img-ready')) { return; }
                    img.setAttribute('data-ig-img-ready', '1');
                    if (img.complete || !motionAllowed()) { return; }
                    img.classList.add('ig-img-pending');
                    function arrive() {
                        img.classList.remove('ig-img-pending');
                        img.classList.add('ig-img-arrived');
                        img.removeEventListener('load', arrive);
                        img.removeEventListener('error', arrive);
                    }
                    img.addEventListener('load', arrive);
                    img.addEventListener('error', arrive);
                    /* Never leave an image invisible if the load event is missed. */
                    window.setTimeout(arrive, 4000);
                });
            }

            /* 13. Spotlight and tilt. */
            var SPOT_SELECTOR = '.ig-card,.ig-roster__item,.ig-directory-tile,.ig-relic-panel,' +
                '.ig-feature,.ig-character-gallery__item,.ig-spot,.ig-tilt-on';
            var TILT_SELECTOR = '.ig-card,.ig-roster__item,.ig-directory-tile,.ig-character-gallery__item,.ig-tilt-on';

            function resetTilts() {
                each(document.querySelectorAll('.ig-tilt'), function (node) {
                    node.style.removeProperty('--ig-rx');
                    node.style.removeProperty('--ig-ry');
                    node.classList.remove('is-tilting');
                });
            }

            function addSpotlightAndTilt(scope) {
                if (!finePointer || (!IG.spotlight && !IG.tilt)) { return; }
                each(scope.querySelectorAll(SPOT_SELECTOR), function (node) {
                    if (node.getAttribute('data-ig-spot-ready')) { return; }
                    node.setAttribute('data-ig-spot-ready', '1');
                    var canTilt = IG.tilt && node.matches(TILT_SELECTOR) && !node.closest('.ig-no-motion');
                    if (canTilt) { node.classList.add('ig-tilt'); }
                    var queued = false;
                    var lastX = 0;
                    var lastY = 0;
                    function paint() {
                        queued = false;
                        var rect = node.getBoundingClientRect();
                        if (!rect.width || !rect.height) { return; }
                        var x = lastX - rect.left;
                        var y = lastY - rect.top;
                        if (IG.spotlight) {
                            node.style.setProperty('--ig-mx', x.toFixed(0) + 'px');
                            node.style.setProperty('--ig-my', y.toFixed(0) + 'px');
                        }
                        if (canTilt && motionAllowed()) {
                            var ry = ((x / rect.width) - 0.5) * 7;
                            var rx = (0.5 - (y / rect.height)) * 5;
                            node.style.setProperty('--ig-rx', rx.toFixed(2) + 'deg');
                            node.style.setProperty('--ig-ry', ry.toFixed(2) + 'deg');
                            node.classList.add('is-tilting');
                        }
                    }
                    node.addEventListener('mousemove', function (event) {
                        lastX = event.clientX;
                        lastY = event.clientY;
                        if (!queued) {
                            queued = true;
                            window.requestAnimationFrame(paint);
                        }
                    });
                    node.addEventListener('mouseleave', function () {
                        if (!canTilt) { return; }
                        node.classList.remove('is-tilting');
                        node.style.removeProperty('--ig-rx');
                        node.style.removeProperty('--ig-ry');
                    });
                });
            }

            /* 14. Counters: <span data-ig-count="1000">1,000</span> */
            function addCounters(scope) {
                if (!IG.counters) { return; }
                each(scope.querySelectorAll('[data-ig-count]'), function (node) {
                    if (node.getAttribute('data-ig-count-ready')) { return; }
                    node.setAttribute('data-ig-count-ready', '1');
                    var target = parseFloat(node.getAttribute('data-ig-count'));
                    if (isNaN(target)) { return; }
                    var decimals = parseInt(node.getAttribute('data-ig-decimals') || '0', 10) || 0;
                    var finalText = node.textContent;
                    function format(value) {
                        return value.toLocaleString(undefined, {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals
                        });
                    }
                    whenSeen(node, function () {
                        if (!motionAllowed()) { return; }
                        var start = null;
                        var duration = 1500;
                        node.setAttribute('aria-label', finalText);
                        function frame(now) {
                            if (start === null) { start = now; }
                            var t = Math.min(1, (now - start) / duration);
                            var eased = 1 - Math.pow(1 - t, 3);
                            node.textContent = format(target * eased);
                            if (t < 1) {
                                window.requestAnimationFrame(frame);
                            } else {
                                node.textContent = finalText;
                                node.removeAttribute('aria-label');
                            }
                        }
                        window.requestAnimationFrame(frame);
                    });
                });
            }

            /* 15. Cipher text: resolves from shifting glyphs once, when seen.
               A hidden copy carries the true line for screen readers throughout. */
            var CIPHER_GLYPHS = '◆◇✦✧⟡⋄∴∵⁂※⌖⌬';
            function addCipher(scope) {
                if (!IG.cipher) { return; }
                each(scope.querySelectorAll('.ig-cipher'), function (node) {
                    if (node.getAttribute('data-ig-cipher-ready')) { return; }
                    node.setAttribute('data-ig-cipher-ready', '1');
                    if (node.children.length) { return; } /* plain text lines only */
                    var original = node.textContent;
                    if (!original.trim()) { return; }
                    whenSeen(node, function () {
                        if (!motionAllowed()) { return; }
                        var visible = element('span', '', original);
                        visible.setAttribute('aria-hidden', 'true');
                        var spoken = element('span', 'ig-sr-only', original);
                        node.textContent = '';
                        node.appendChild(visible);
                        node.appendChild(spoken);
                        node.classList.add('is-ciphering');
                        var length = original.length;
                        var start = null;
                        var duration = Math.min(1800, 500 + length * 35);
                        function frame(now) {
                            if (start === null) { start = now; }
                            var progress = Math.min(1, (now - start) / duration);
                            var settled = Math.floor(progress * length);
                            var out = '';
                            for (var i = 0; i < length; i++) {
                                var ch = original.charAt(i);
                                if (i < settled || ch === ' ') {
                                    out += ch;
                                } else {
                                    out += CIPHER_GLYPHS.charAt(Math.floor(Math.random() * CIPHER_GLYPHS.length));
                                }
                            }
                            visible.textContent = out;
                            if (progress < 1) {
                                window.requestAnimationFrame(frame);
                            } else {
                                node.textContent = original;
                                node.classList.remove('is-ciphering');
                            }
                        }
                        window.requestAnimationFrame(frame);
                    });
                });
            }

            /* 16. Celestial readout, following the reader's own clock. */
            var CELESTIAL = {
                dawn: 'Heilon climbs out of the dark',
                day: 'Heilon stands over the world',
                dusk: 'Heilon sinks and the Named Fires wake',
                night: 'Selûne holds the north, as she always has'
            };
            function celestialPhase() {
                var hour = new Date().getHours();
                if (hour >= 5 && hour < 8) { return 'dawn'; }
                if (hour >= 8 && hour < 18) { return 'day'; }
                if (hour >= 18 && hour < 21) { return 'dusk'; }
                return 'night';
            }
            function updateCelestial(scope) {
                if (!IG.celestial) { return; }
                var phase = celestialPhase();
                each((scope || document).querySelectorAll('.ig-celestial'), function (node) {
                    node.setAttribute('data-ig-phase', phase);
                    var label = node.querySelector('.ig-celestial__label');
                    if (label && (!label.textContent.trim() || label.getAttribute('data-ig-auto') === '1')) {
                        label.setAttribute('data-ig-auto', '1');
                        label.textContent = CELESTIAL[phase];
                    }
                    if (!node.hasAttribute('role')) {
                        node.setAttribute('role', 'img');
                        node.setAttribute('aria-label', CELESTIAL[phase]);
                    }
                });
            }

            /* 17. Parallax: data-ig-parallax="0.15" drifts an element as you scroll. */
            function collectParallax(scope) {
                if (!IG.parallax) { return; }
                each(scope.querySelectorAll('[data-ig-parallax]'), function (node) {
                    if (node.getAttribute('data-ig-parallax-ready')) { return; }
                    node.setAttribute('data-ig-parallax-ready', '1');
                    var factor = parseFloat(node.getAttribute('data-ig-parallax'));
                    if (isNaN(factor)) { return; }
                    parallaxNodes.push({ node: node, factor: Math.max(-0.6, Math.min(0.6, factor)) });
                });
            }
            function updateParallax(viewH) {
                if (!parallaxNodes.length) { return; }
                var allowed = motionAllowed();
                parallaxNodes.forEach(function (item) {
                    if (!allowed) { item.node.style.transform = ''; return; }
                    var rect = item.node.getBoundingClientRect();
                    if (rect.bottom < -200 || rect.top > viewH + 200) { return; }
                    var offset = (rect.top + rect.height / 2 - viewH / 2) * item.factor;
                    item.node.style.transform = 'translate3d(0,' + (-offset).toFixed(1) + 'px,0)';
                });
            }

            /* 18. The atmosphere layer. One canvas, behind the page frame.
               Daybough: drifting green and gold leaves of Irminsul.
               Nightbough: crimson leaves, rising Gihon motes, Selûne's fixed glow. */
            function createAtmosphere() {
                var canvas = element('canvas', 'ig-ambient');
                canvas.setAttribute('aria-hidden', 'true');
                var ctx = canvas.getContext && canvas.getContext('2d');
                if (!ctx) { return null; }
                var state = {
                    canvas: canvas,
                    ctx: ctx,
                    leaves: [],
                    motes: [],
                    width: 0,
                    height: 0,
                    ratio: 1,
                    running: false,
                    frameId: 0,
                    last: 0,
                    time: 0,
                    night: true
                };
                var DAY = ['rgba(93,140,110,', 'rgba(205,174,120,', 'rgba(128,158,96,', 'rgba(38,92,83,'];
                var NIGHT = ['rgba(165,78,96,', 'rgba(138,58,78,', 'rgba(205,174,120,', 'rgba(183,97,115,'];

                function rand(min, max) { return min + Math.random() * (max - min); }

                function makeLeaf(anywhere) {
                    var palette = state.night ? NIGHT : DAY;
                    return {
                        x: rand(-20, state.width + 20),
                        y: anywhere ? rand(-state.height, state.height) : rand(-80, -10),
                        size: rand(4, 9),
                        fall: rand(0.25, 0.7),
                        sway: rand(14, 42),
                        phase: rand(0, Math.PI * 2),
                        spin: rand(0.004, 0.012),
                        angle: rand(0, Math.PI * 2),
                        color: palette[Math.floor(Math.random() * palette.length)],
                        alpha: rand(0.28, 0.6),
                        baseX: 0
                    };
                }
                function makeMote(anywhere) {
                    return {
                        x: rand(0, state.width),
                        y: anywhere ? rand(0, state.height) : state.height + rand(5, 40),
                        r: rand(0.8, 2.1),
                        rise: rand(0.08, 0.3),
                        drift: rand(-0.12, 0.12),
                        twinkle: rand(0, Math.PI * 2),
                        speed: rand(0.01, 0.03)
                    };
                }
                function populate() {
                    var count = Math.max(10, Math.min(22, Math.round(state.width / 90)));
                    state.leaves = [];
                    state.motes = [];
                    for (var i = 0; i < count; i++) {
                        var leaf = makeLeaf(true);
                        leaf.baseX = leaf.x;
                        state.leaves.push(leaf);
                    }
                    if (state.night) {
                        for (var j = 0; j < count; j++) { state.motes.push(makeMote(true)); }
                    }
                }
                function resize() {
                    state.ratio = Math.min(2, window.devicePixelRatio || 1);
                    state.width = window.innerWidth;
                    state.height = window.innerHeight;
                    canvas.width = Math.round(state.width * state.ratio);
                    canvas.height = Math.round(state.height * state.ratio);
                    ctx.setTransform(state.ratio, 0, 0, state.ratio, 0, 0);
                }
                function readTheme() {
                    var light = document.body.classList.contains('theme-fandomdesktop-light') ||
                        document.body.getAttribute('data-theme') === 'light';
                    var night = !light;
                    if (night !== state.night) {
                        state.night = night;
                        populate();
                    }
                }
                function drawSky() {
                    var g;
                    if (state.night) {
                        /* Selûne: fixed in the north, a cold steady halo. */
                        var mx = state.width * 0.86;
                        var my = state.height * 0.09;
                        g = ctx.createRadialGradient(mx, my, 0, mx, my, state.width * 0.32);
                        g.addColorStop(0, 'rgba(201,211,228,0.16)');
                        g.addColorStop(0.35, 'rgba(201,211,228,0.05)');
                        g.addColorStop(1, 'rgba(201,211,228,0)');
                        ctx.fillStyle = g;
                        ctx.fillRect(0, 0, state.width, state.height);
                        ctx.beginPath();
                        ctx.arc(mx, my, 3.2, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(236,240,247,0.55)';
                        ctx.fill();
                    } else {
                        /* Heilon: a warm wash from the upper left. */
                        g = ctx.createRadialGradient(state.width * 0.12, -40, 0, state.width * 0.12, -40, state.width * 0.55);
                        g.addColorStop(0, 'rgba(226,200,148,0.16)');
                        g.addColorStop(1, 'rgba(226,200,148,0)');
                        ctx.fillStyle = g;
                        ctx.fillRect(0, 0, state.width, state.height);
                    }
                }
                function drawLeaf(leaf) {
                    var flutter = Math.cos(leaf.angle * 1.7);
                    ctx.save();
                    ctx.translate(leaf.x, leaf.y);
                    ctx.rotate(leaf.angle);
                    ctx.scale(1, 0.35 + Math.abs(flutter) * 0.65);
                    ctx.beginPath();
                    ctx.moveTo(0, -leaf.size);
                    ctx.quadraticCurveTo(leaf.size * 0.85, 0, 0, leaf.size);
                    ctx.quadraticCurveTo(-leaf.size * 0.85, 0, 0, -leaf.size);
                    ctx.fillStyle = leaf.color + leaf.alpha.toFixed(2) + ')';
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(0, -leaf.size * 0.85);
                    ctx.lineTo(0, leaf.size * 0.85);
                    ctx.strokeStyle = 'rgba(0,0,0,' + (leaf.alpha * 0.25).toFixed(2) + ')';
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                    ctx.restore();
                }
                function step(now) {
                    if (!state.running) { return; }
                    state.frameId = window.requestAnimationFrame(step);
                    if (document.hidden) { return; }
                    if (now - state.last < 33) { return; } /* about thirty frames a second */
                    var delta = Math.min(3, (now - state.last) / 16.7);
                    state.last = now;
                    state.time += delta;
                    var wind = Math.sin(state.time * 0.004) * 0.35 + Math.sin(state.time * 0.0011) * 0.25;
                    ctx.clearRect(0, 0, state.width, state.height);
                    drawSky();
                    state.leaves.forEach(function (leaf, index) {
                        leaf.y += leaf.fall * delta;
                        leaf.baseX += wind * delta;
                        leaf.x = leaf.baseX + Math.sin(state.time * 0.02 + leaf.phase) * leaf.sway;
                        leaf.angle += leaf.spin * delta;
                        if (leaf.y > state.height + 30 || leaf.x < -60 || leaf.x > state.width + 60) {
                            var fresh = makeLeaf(false);
                            fresh.baseX = fresh.x;
                            state.leaves[index] = fresh;
                            return;
                        }
                        drawLeaf(leaf);
                    });
                    if (state.night) {
                        state.motes.forEach(function (mote, index) {
                            mote.y -= mote.rise * delta;
                            mote.x += mote.drift * delta;
                            mote.twinkle += mote.speed * delta;
                            if (mote.y < -10) { state.motes[index] = makeMote(false); return; }
                            var a = 0.25 + Math.sin(mote.twinkle) * 0.25 + 0.2;
                            ctx.beginPath();
                            ctx.arc(mote.x, mote.y, mote.r, 0, Math.PI * 2);
                            ctx.fillStyle = 'rgba(160,235,221,' + a.toFixed(2) + ')';
                            ctx.shadowColor = 'rgba(117,213,197,0.8)';
                            ctx.shadowBlur = 6;
                            ctx.fill();
                            ctx.shadowBlur = 0;
                        });
                    }
                }
                state.start = function () {
                    if (state.running) { return; }
                    if (!canvas.parentNode) { document.body.insertBefore(canvas, document.body.firstChild); }
                    resize();
                    state.night = !(document.body.classList.contains('theme-fandomdesktop-light') ||
                        document.body.getAttribute('data-theme') === 'light');
                    populate();
                    state.running = true;
                    state.last = 0;
                    state.frameId = window.requestAnimationFrame(step);
                    window.setTimeout(function () { canvas.classList.add('is-awake'); }, 60);
                };
                state.stop = function () {
                    state.running = false;
                    if (state.frameId) { window.cancelAnimationFrame(state.frameId); }
                    canvas.classList.remove('is-awake');
                    ctx.clearRect(0, 0, state.width, state.height);
                };
                state.resize = function () {
                    if (!state.running) { return; }
                    resize();
                    populate();
                };
                state.readTheme = readTheme;
                return state;
            }

            function atmosphereWanted() {
                return IG.atmosphere && motionAllowed() &&
                    mw.config.get('wgAction') === 'view' &&
                    window.innerWidth >= IG.atmosphereMinWidth;
            }
            function startAtmosphere() {
                if (!atmosphereWanted()) { return; }
                if (!atmosphere) { atmosphere = createAtmosphere(); }
                if (atmosphere) { atmosphere.start(); }
            }
            function stopAtmosphere() {
                if (atmosphere) { atmosphere.stop(); }
            }

            function initializeContent(scope) {
                if (!isArticleView || !scope || !scope.querySelectorAll) { return; }
                addSectionPermalinks(scope);
                addInteractiveSpoilers(scope);
                addCollapsiblePanels(scope);
                addSearchableTables(scope);
                addCodeCopyButtons(scope);
                addImageArrival(scope);
                addScrollReveal(scope);
                addSpotlightAndTilt(scope);
                addCounters(scope);
                addCipher(scope);
                updateCelestial(scope);
                collectParallax(scope);
                scheduleFloatGuard();
            }

            /* Start. */
            addEnhancementStyles();
            addNewPageButton();
            addBackToTop();
            addReadingProgress();
            addStillnessToggle();
            initializeContent(document);
            updateScrollUI();
            startAtmosphere();

            window.addEventListener('scroll', onScroll, { passive: true });
            window.addEventListener('resize', function () {
                onScroll();
                scheduleFloatGuard();
                if (atmosphere) {
                    if (atmosphereWanted()) {
                        if (atmosphere.running) { atmosphere.resize(); } else { atmosphere.start(); }
                    } else {
                        atmosphere.stop();
                    }
                }
            }, { passive: true });
            window.addEventListener('load', scheduleFloatGuard);

            /* Late images (including Fandom's lazy loader) re-check the float guard. */
            if (root) {
                root.addEventListener('load', function (event) {
                    if (event.target && event.target.tagName === 'IMG') { scheduleFloatGuard(); }
                }, true);
            }
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(scheduleFloatGuard);
            }

            /* Follow the system motion setting live. */
            if (reducedMotionQuery) {
                var onMotionChange = function () {
                    if (motionAllowed()) { startAtmosphere(); } else { stopAtmosphere(); resetTilts(); }
                };
                if (reducedMotionQuery.addEventListener) {
                    reducedMotionQuery.addEventListener('change', onMotionChange);
                } else if (reducedMotionQuery.addListener) {
                    reducedMotionQuery.addListener(onMotionChange);
                }
            }

            /* Follow a theme switch without a reload. */
            if ('MutationObserver' in window) {
                new window.MutationObserver(function () {
                    if (atmosphere && atmosphere.running) { atmosphere.readTheme(); }
                }).observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });
            }

            /* Keep the celestial readout honest through a long reading session. */
            window.setInterval(function () { updateCelestial(document); }, 600000);

            /* Content inserted later by MediaWiki (previews, live edits). */
            mw.hook('wikipage.content').add(function ($content) {
                root = getArticleRoot();
                if ($content && $content[0]) { initializeContent($content[0]); }
                addNewPageButton();
                addReadingProgress();
                onScroll();
            });

            /* Retry only during the initial Fandom header hydration window. */
            [350, 1000, 2500, 5000, 9000].forEach(function (delay) {
                window.setTimeout(addNewPageButton, delay);
            });
        });
    }, function (error) {
        if (mw.log && mw.log.warn) { mw.log.warn('Igdrasyl Common.js: mediawiki.util unavailable', error); }
    });
})(window.jQuery, window.mw, window, document);