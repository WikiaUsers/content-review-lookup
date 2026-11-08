/* ========================================================================
   DARK UNIVERSE WIKI | MediaWiki:Common.js | VERSION 1.0
   Supports the Dark Universe CSS. ES5 syntax, no external libraries imported.
   1. Back-to-top button
   2. Click/tap/keyboard spoiler reveal
   3. Optional New Page shortcut in Fandom's sticky header
   Keep Fandom's JavaScript review/enablement requirements in mind.
   ======================================================================== */
(function (window, document, mw) {
    'use strict';

    if (window.duCommonLoaded) { return; }
    window.duCommonLoaded = true;

    var reduceMotion = !!(window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    function hasClass(element, name) {
        return !!(element && element.classList && element.classList.contains(name));
    }

    function findParentAnchor(node, root) {
        while (node && node !== root && node !== document) {
            if (node.tagName && node.tagName.toLowerCase() === 'a') { return node; }
            node = node.parentNode;
        }
        return null;
    }

    function toggleSpoiler(element) {
        var revealed = element.classList.toggle('du-spoiler-revealed');
        element.setAttribute('aria-expanded', revealed ? 'true' : 'false');
        element.setAttribute('aria-label', revealed ? 'Hide spoiler' : 'Reveal spoiler');
    }

    function initSpoilers(content) {
        var root = (content && content[0]) || document;
        if (!root || !root.querySelectorAll) { return; }
        var elements = root.querySelectorAll('.du-spoiler:not([data-du-ready])');
        Array.prototype.forEach.call(elements, function (element) {
            element.setAttribute('data-du-ready', '1');
            element.setAttribute('tabindex', '0');
            element.setAttribute('role', 'button');
            element.setAttribute('aria-expanded', 'false');
            element.setAttribute('aria-label', 'Reveal spoiler');
            element.addEventListener('click', function (event) {
                if (findParentAnchor(event.target, element) && hasClass(element, 'du-spoiler-revealed')) {
                    return;
                }
                event.preventDefault();
                toggleSpoiler(element);
            });
            element.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
                    if (findParentAnchor(event.target, element) && event.key === 'Enter' &&
                        hasClass(element, 'du-spoiler-revealed')) { return; }
                    event.preventDefault();
                    toggleSpoiler(element);
                }
            });
        });
        var redactions = root.querySelectorAll('.du-redacted:not([tabindex])');
        Array.prototype.forEach.call(redactions, function (element) {
            element.setAttribute('tabindex', '0');
            element.setAttribute('title', 'Redacted text: focus or hover to read');
        });
    }

    function initBackToTop() {
        if (!document.body || document.querySelector('.du-back-to-top')) { return; }
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'du-back-to-top';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML = '<span class="du-back-to-top__arrow" aria-hidden="true">\u2191</span>' +
            '<span>TOP</span>';
        document.body.appendChild(button);

        var ticking = false;
        function update() {
            var distance = window.pageYOffset || document.documentElement.scrollTop || 0;
            if (distance > 650) { button.classList.add('is-visible'); }
            else { button.classList.remove('is-visible'); }
            ticking = false;
        }
        function scheduleUpdate() {
            if (ticking) { return; }
            ticking = true;
            if (window.requestAnimationFrame) { window.requestAnimationFrame(update); }
            else { window.setTimeout(update, 35); }
        }
        window.addEventListener('scroll', scheduleUpdate);
        button.addEventListener('click', function () {
            if (reduceMotion) { window.scrollTo(0, 0); }
            else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
            var title = document.querySelector('.page-header__title') ||
                document.querySelector('.mw-parser-output');
            if (title) {
                if (!title.hasAttribute('tabindex')) { title.setAttribute('tabindex', '-1'); }
                try { title.focus({ preventScroll: true }); }
                catch (error) { title.focus(); }
            }
        });
        update();
    }

    function createPageUrl() {
        if (mw && mw.util && typeof mw.util.getUrl === 'function') {
            return mw.util.getUrl('Special:CreatePage');
        }
        return '/wiki/Special:CreatePage';
    }

    function addStickyNewPage() {
        /* Only the real sticky header: never inject into the ordinary nav. */
        var header = document.querySelector('.fandom-sticky-header');
        if (!header) { return false; }
        if (header.querySelector('.du-sticky-newpage')) { return true; }
        var actionArea = header.querySelector('.fandom-sticky-header__actions') || header;
        var link = document.createElement('a');
        link.className = 'du-sticky-newpage';
        link.href = createPageUrl();
        link.setAttribute('aria-label', 'Create a new wiki page');
        link.title = 'Create a new page';
        link.innerHTML = '<span class="du-sticky-newpage__icon" aria-hidden="true">+</span>' +
            '<span>New Page</span>';
        var firstButton = actionArea.querySelector('.wds-button,button,[class*="watch"]');
        if (firstButton && firstButton.parentNode === actionArea) {
            actionArea.insertBefore(link, firstButton);
        } else { actionArea.appendChild(link); }
        return true;
    }

    function waitForSticky(attempts) {
        if (addStickyNewPage() || attempts <= 0) { return; }
        window.setTimeout(function () { waitForSticky(attempts - 1); }, 650);
    }

    function start() {
        initBackToTop();
        initSpoilers();
        waitForSticky(14);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else { start(); }

    /* Wiki content can refresh independently of document load (tabs, previews). */
    if (mw && typeof mw.hook === 'function') {
        mw.hook('wikipage.content').add(initSpoilers);
    }
}(window, document, window.mw));