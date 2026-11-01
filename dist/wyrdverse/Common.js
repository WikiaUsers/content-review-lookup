/* =====================================================================
   WYRDVERSE WIKI — COMMON.JS
   1. Back to top button        (styled by .wyrd-back-to-top in Common.css)
   2. Spoiler tap and keyboard reveal (.wyrd-spoiler, .spoiler, .wyrd-redact)
   3. Add New Page button in the sticky header (styled by .wyrd-sticky-newpage)
   4. Status and Threat Level pills in infoboxes (styled by .wyrd-status, .wyrd-threat)
   Written in plain ES5 so it passes Fandom's script review.
   ===================================================================== */
(function (window, document, mw) {
    'use strict';

    if (window.wyrdCommonLoaded) {
        return;
    }
    window.wyrdCommonLoaded = true;

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* - - - - - 1. BACK TO TOP - - - - - */
    function initBackToTop() {
        if (document.querySelector('.wyrd-back-to-top')) {
            return;
        }
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'wyrd-back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML =
            '<span class="wyrd-back-to-top__arrow" aria-hidden="true">◆</span>' +
            '<span class="wyrd-back-to-top__label">Top</span>';
        document.body.appendChild(button);

        var threshold = 600;
        var ticking = false;

        function update() {
            var y = window.pageYOffset || document.documentElement.scrollTop;
            if (y > threshold) {
                button.classList.add('is-visible');
            } else {
                button.classList.remove('is-visible');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function () {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        }, { passive: true });

        button.addEventListener('click', function () {
            if (reduceMotion) {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            /* Return keyboard focus to the top of the article */
            var title = document.querySelector('.page-header__title') ||
                document.querySelector('.mw-parser-output');
            if (title) {
                if (!title.hasAttribute('tabindex')) {
                    title.setAttribute('tabindex', '-1');
                }
                title.focus({ preventScroll: true });
            }
        });

        update();
    }

    /* - - - - - 2. SPOILERS - - - - - */
    /* Hover reveals on desktop through CSS alone. This adds tap to reveal
       for touch screens and Enter or Space for keyboards. */
    function toggleSpoiler(el) {
        var revealed = el.classList.toggle('wyrd-spoiler-revealed');
        el.setAttribute('aria-pressed', revealed ? 'true' : 'false');
    }

    function initSpoilers(root) {
        var smoke = root.querySelectorAll('.wyrd-spoiler:not([data-wyrd-ready])');
        Array.prototype.forEach.call(smoke, function (el) {
            el.setAttribute('data-wyrd-ready', '1');
            el.setAttribute('tabindex', '0');
            el.setAttribute('role', 'button');
            el.setAttribute('aria-pressed', 'false');
            if (!el.hasAttribute('aria-label') && !el.hasAttribute('title')) {
                el.setAttribute('title', 'Spoiler: tap or press Enter to reveal');
            }
            el.addEventListener('click', function (event) {
                /* Let links inside a revealed spoiler work normally */
                if (event.target.closest('a') && el.classList.contains('wyrd-spoiler-revealed')) {
                    return;
                }
                event.preventDefault();
                toggleSpoiler(el);
            });
            el.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                    event.preventDefault();
                    toggleSpoiler(el);
                }
            });
        });

        /* Black bar redactions reveal on :focus in CSS, so they only need to be focusable */
        var bars = root.querySelectorAll('.spoiler:not([tabindex]), .wyrd-redact:not([tabindex])');
        Array.prototype.forEach.call(bars, function (el) {
            el.setAttribute('tabindex', '0');
        });
    }

    /* - - - - - 3. ADD NEW PAGE IN THE STICKY HEADER - - - - - */
    /* The sticky header that trails the page has no Add New Page button.
       This places one just before its Save / Watch button. */
    var STICKY_SELECTORS = [
        '.fandom-sticky-header',
        '.community-navigation',
        '#community-navigation'
    ];

    function findStickyHeader() {
        for (var i = 0; i < STICKY_SELECTORS.length; i++) {
            var el = document.querySelector(STICKY_SELECTORS[i]);
            if (el) {
                return el;
            }
        }
        return null;
    }

    function createPageUrl() {
        if (mw && mw.util && mw.util.getUrl) {
            return mw.util.getUrl('Special:CreatePage');
        }
        return '/wiki/Special:CreatePage';
    }

    function buildNewPageButton() {
        var link = document.createElement('a');
        link.className = 'wyrd-sticky-newpage';
        link.href = createPageUrl();
        link.title = 'Add a new page';
        link.innerHTML =
            '<svg class="wyrd-sticky-newpage__icon" viewBox="0 0 18 18" width="14" height="14" aria-hidden="true">' +
            '<path d="M9 2v14M2 9h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
            '</svg>' +
            '<span class="wyrd-sticky-newpage__label">New Page</span>';

        /* Reuse Fandom's own create page dialog when it is available */
        link.addEventListener('click', function (event) {
            var native = document.querySelector('.wiki-tools__add-new-page, .fandom-community-header a[href*="Special:CreatePage"]');
            if (native && native !== link && typeof native.click === 'function') {
                event.preventDefault();
                native.click();
            }
        });
        return link;
    }

    function initStickyNewPage() {
        var header = findStickyHeader();
        if (!header || header.querySelector('.wyrd-sticky-newpage')) {
            return !!header;
        }
        var button = buildNewPageButton();

        /* Place it before the first button on the right side (Save / Watch) */
        var anchor = header.querySelector(
            '.fandom-sticky-header__actions, .page-header__actions, .wds-button, [class*="watch"], [class*="bookmark"]'
        );
        if (anchor && anchor.parentNode) {
            anchor.parentNode.insertBefore(button, anchor);
        } else {
            header.appendChild(button);
        }
        return true;
    }

    /* The sticky header can render a moment after the page, so try a few times */
    function waitForStickyHeader(tries) {
        if (initStickyNewPage() || tries <= 0) {
            return;
        }
        window.setTimeout(function () {
            waitForStickyHeader(tries - 1);
        }, 500);
    }

    /* - - - - - 4. STATUS AND THREAT PILLS - - - - - */
    /* Editors type a plain word into Status or Threat Level. If the first word
       is one of the words below, the value is wrapped in a styled pill.
       Anything else is left exactly as typed. */
    var PILLS = [
        {
            source: 'Status',
            prefix: 'wyrd-status',
            words: {
                alive: 'alive', living: 'alive', active: 'alive', operational: 'alive', intact: 'alive', ongoing: 'alive',
                deceased: 'deceased', dead: 'deceased', slain: 'deceased', killed: 'deceased', destroyed: 'deceased',
                undead: 'undead', turned: 'undead', risen: 'undead', revenant: 'undead',
                missing: 'missing', lost: 'missing', abandoned: 'missing', fugitive: 'missing',
                sealed: 'sealed', bound: 'sealed', hidden: 'sealed', imprisoned: 'sealed', dormant: 'sealed',
                disbanded: 'defunct', defunct: 'defunct', extinct: 'defunct', ruined: 'defunct', concluded: 'defunct', retired: 'defunct',
                unknown: 'unknown'
            }
        },
        {
            source: 'Threat Level',
            prefix: 'wyrd-threat',
            words: {
                negligible: '1', low: '2', moderate: '3', high: '4', severe: '5', catastrophic: '6'
            }
        }
    ];

    function initPills(root) {
        PILLS.forEach(function (pill) {
            var values = root.querySelectorAll(
                '.portable-infobox [data-source="' + pill.source + '"] .pi-data-value:not([data-wyrd-pill])'
            );
            Array.prototype.forEach.call(values, function (el) {
                el.setAttribute('data-wyrd-pill', '1');
                /* Leave lists and multi paragraph values alone */
                if (el.querySelector('ul, ol, p, div, table')) {
                    return;
                }
                var text = (el.textContent || '').replace(/^\s+/, '').toLowerCase();
                var first = text.split(/[\s(,;.:]/)[0];
                var key = pill.words[first];
                if (!key) {
                    return;
                }
                var span = document.createElement('span');
                span.className = pill.prefix + ' ' + pill.prefix + '--' + key;
                while (el.firstChild) {
                    span.appendChild(el.firstChild);
                }
                el.appendChild(span);
            });
        });
    }

    /* - - - - - CONTENT HOOK - - - - - */
    function initContent($content) {
        var root = ($content && $content[0]) || document;
        initSpoilers(root);
        initPills(root);
    }

    /* - - - - - START - - - - - */
    function start() {
        initBackToTop();
        waitForStickyHeader(10);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    /* Runs on page load and again whenever content is replaced (previews, tabbers) */
    if (mw && mw.hook) {
        mw.hook('wikipage.content').add(initContent);
    } else {
        initContent();
    }
}(window, document, window.mw));