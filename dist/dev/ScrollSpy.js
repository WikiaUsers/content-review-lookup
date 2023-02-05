/*
 * @module			ScrollSpy.js
 * @description		Moves table of contents to the right rail and highlights
                    the current section that the user scrolled in.
 * @author			Polymeric
 * @license			CC-BY-SA 3.0
*/

mw.hook('wikipage.content').add(function() {
    'use strict';

    // Double run protection.
    if (window.scrollSpyLoaded || !document.getElementById('toc')) return;

    window.scrollSpyLoaded = true;

    importArticle({ article: 'u:dev:MediaWiki:ScrollSpy.css' });

    const toc = document.getElementById('toc'),
          railModules = document.querySelector('.WikiaRail > .sticky-modules-wrapper'),
          tocModule = document.createElement('section'),
          sections = document.querySelectorAll(':is(h2, h3, h4, h5, h6) > .mw-headline');

    function appendTocToRail() {
        tocModule.classList.add('railModule', 'rail-module');
        tocModule.setAttribute('id', 'toc-module');
        tocModule.appendChild(toc);
        railModules.prepend(tocModule);
    }

    function scrollSpyInit() {
        appendTocToRail();

        sections.forEach(function(elem) {
            attachViewportObserver(elem);
        });
    }

    function attachViewportObserver(elem) {
        const observerConfig = {
            // Use the viewport as the observer.
            root: null,
            // Do something once each element is fully visible into the viewport.
            threshold: 1
        };

        const observer = new IntersectionObserver(function(e) {
            e.forEach(function(e) {
                // Wether or not a observed element is visible, trigger a function
                // depending on the case.
                e.isIntersecting ? handleIntersection() : handleNoIntersection();
            });
        }, observerConfig);

        observer.observe(elem);

        // Remove highlight from previous active section (if there's any) and highlight
        // the currently active section in the table of contents.
        function handleIntersection() {
            const tocActiveLink = toc.querySelector('li.is-active'),
                  currentSectionId = elem.getAttribute('id'),
                  currentTocSectionHref = toc.querySelector('a[href="#' + currentSectionId + '"]');

            if (tocActiveLink) tocActiveLink.classList.remove('is-active');
            currentTocSectionHref.parentElement.classList.add('is-active');
        }
    }

    // Remove highlight from previos active section (if there's any) if the user's
    // scroll position is lower or greater than the first or last section headline's
    // positions respectively.
    function handleNoIntersection() {
        const tocActiveLink = toc.querySelector('li.is-active'),
              scrollPos = window.scrollY,
              firstSectionPos = sections[0].offsetTop,
              lastSectionPos = sections[sections.length - 1].offsetTop;

        if (tocActiveLink && (scrollPos < firstSectionPos || scrollPos > lastSectionPos)) tocActiveLink.classList.remove('is-active');
    }

    scrollSpyInit();
});