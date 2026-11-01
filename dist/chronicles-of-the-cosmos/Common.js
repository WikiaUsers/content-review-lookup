/* =====================================================================
   CHRONICLES OF THE COSMOS WIKI — COMMON.JS
   1. Back to top button        (styled by .cc-back-to-top in Common.css)
   2. Spoiler tap and keyboard reveal (.cc-spoiler, .spoiler, .cc-redact)
   3. Add New Page button in the sticky header (styled by .cc-sticky-newpage)
   4. Hold position: halts or resumes the moving sky (styled by .cc-hold-toggle)
   5. Translated speech: swaps alien script and translation (.cc-xeno)
   Written in plain ES5 so it passes Fandom's script review.
   ===================================================================== */
(function (window, document, mw) {
    'use strict';

    if (window.ccCommonLoaded) {
        return;
    }
    window.ccCommonLoaded = true;

    var reduceMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Storage can be blocked by privacy settings, so every call is guarded */
    function readSetting(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }
    function writeSetting(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            /* The setting simply will not persist */
        }
    }

    /* - - - - - 1. BACK TO TOP - - - - - */
    function initBackToTop() {
        if (document.querySelector('.cc-back-to-top')) {
            return;
        }
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'cc-back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML =
            '<span class="cc-back-to-top__arrow" aria-hidden="true">▲</span>' +
            '<span class="cc-back-to-top__label">Top</span>';
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
    /* Hover decrypts on desktop through CSS alone. This adds tap to reveal
       for touch screens and Enter or Space for keyboards. */
    function toggleSpoiler(el) {
        var revealed = el.classList.toggle('cc-spoiler-revealed');
        el.setAttribute('aria-pressed', revealed ? 'true' : 'false');
    }

    function initSpoilers(root) {
        var blurs = root.querySelectorAll('.cc-spoiler:not([data-cc-ready])');
        Array.prototype.forEach.call(blurs, function (el) {
            el.setAttribute('data-cc-ready', '1');
            el.setAttribute('tabindex', '0');
            el.setAttribute('role', 'button');
            el.setAttribute('aria-pressed', 'false');
            if (!el.hasAttribute('aria-label') && !el.hasAttribute('title')) {
                el.setAttribute('title', 'Spoiler: tap or press Enter to decrypt');
            }
            el.addEventListener('click', function (event) {
                /* Let links inside a revealed spoiler work normally */
                if (event.target.closest('a') && el.classList.contains('cc-spoiler-revealed')) {
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
        var bars = root.querySelectorAll('.spoiler:not([tabindex]), .cc-redact:not([tabindex])');
        Array.prototype.forEach.call(bars, function (el) {
            el.setAttribute('tabindex', '0');
        });
    }

    /* - - - - - 3. ADD NEW PAGE IN THE STICKY HEADER - - - - - */
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
        link.className = 'cc-sticky-newpage';
        link.href = createPageUrl();
        link.title = 'Add a new page';
        link.innerHTML =
            '<svg class="cc-sticky-newpage__icon" viewBox="0 0 18 18" width="14" height="14" aria-hidden="true">' +
            '<path d="M9 2v14M2 9h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
            '</svg>' +
            '<span class="cc-sticky-newpage__label">New Page</span>';

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
        if (!header || header.querySelector('.cc-sticky-newpage')) {
            return !!header;
        }
        var button = buildNewPageButton();
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

    /* - - - - - 4. HOLD POSITION - - - - - */
    /* A small corner control that stops the stars or clouds drifting past.
       The choice is remembered on this device. Readers whose system asks
       for reduced motion never see the control: the sky is already still. */
    var HOLD_KEY = 'cc-hold-position';

    function applyHold(held, button) {
        document.body.classList.toggle('cc-hold-position', held);
        if (button) {
            button.setAttribute('aria-pressed', held ? 'true' : 'false');
            button.querySelector('.cc-hold-toggle__label').textContent = held ? 'Resume drift' : 'Hold position';
            button.title = held ? 'Let the sky move again' : 'Stop the moving sky';
        }
    }

    function initHoldPosition() {
        if (reduceMotion || document.querySelector('.cc-hold-toggle')) {
            return;
        }
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'cc-hold-toggle';
        button.innerHTML =
            '<span class="cc-hold-toggle__light" aria-hidden="true"></span>' +
            '<span class="cc-hold-toggle__label">Hold position</span>';
        document.body.appendChild(button);

        applyHold(readSetting(HOLD_KEY) === '1', button);

        button.addEventListener('click', function () {
            var held = !document.body.classList.contains('cc-hold-position');
            applyHold(held, button);
            writeSetting(HOLD_KEY, held ? '1' : '0');
        });
    }

    /* - - - - - 5. TRANSLATED SPEECH - - - - - */
    /* A .cc-xeno block shows the alien script and its translation together.
       Each tap or Enter cycles: both, script only, translation only. */
    var XENO_STATES = ['', 'is-native-only', 'is-gloss-only'];
    var XENO_LABELS = ['Showing script and translation', 'Showing script only', 'Showing translation only'];

    function cycleXeno(el) {
        var current = parseInt(el.getAttribute('data-cc-state') || '0', 10);
        var next = (current + 1) % XENO_STATES.length;
        if (XENO_STATES[current]) {
            el.classList.remove(XENO_STATES[current]);
        }
        if (XENO_STATES[next]) {
            el.classList.add(XENO_STATES[next]);
        }
        el.setAttribute('data-cc-state', String(next));
        el.setAttribute('aria-label', XENO_LABELS[next] + '. Press Enter to change.');
    }

    function initXeno(root) {
        var blocks = root.querySelectorAll('.cc-xeno:not([data-cc-ready])');
        Array.prototype.forEach.call(blocks, function (el) {
            el.setAttribute('data-cc-ready', '1');
            el.setAttribute('data-cc-state', '0');
            el.setAttribute('tabindex', '0');
            el.setAttribute('role', 'button');
            el.setAttribute('aria-label', XENO_LABELS[0] + '. Press Enter to change.');
            el.addEventListener('click', function (event) {
                if (event.target.closest('a')) {
                    return;
                }
                cycleXeno(el);
            });
            el.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                    event.preventDefault();
                    cycleXeno(el);
                }
            });
        });
    }

    /* - - - - - START - - - - - */
    function initContent($content) {
        var root = ($content && $content[0]) || document;
        initSpoilers(root);
        initXeno(root);
    }

    function start() {
        initBackToTop();
        initHoldPosition();
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