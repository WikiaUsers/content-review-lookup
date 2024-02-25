/*
 * @module         ScrollSpy.js
 * @description    Moves table of contents and "auteurs" to the right rail and highlights
                    the current section that the user scrolled in for the table of contents.
 * @author         Polymeric
 * @license        CC-BY-SA 3.0
*/

mw.hook('wikipage.content').add(function() {
    'use strict';

    // Double run protection.
    if (window.scrollSpyLoaded || (!document.getElementById('toc') && !document.getElementById('auteurs'))) return;

    window.scrollSpyLoaded = true;

    importArticle({ article: 'u:dev:MediaWiki:ScrollSpy.css' });

    const railModules = document.querySelector('.WikiaRail > .sticky-modules-wrapper'),
          sections = document.querySelectorAll(':is(h2, h3, h4, h5, h6) > .mw-headline');

    function appendTocToRail() {
        const toc = document.getElementById('toc');
        const tocModule = document.createElement('section');
        tocModule.classList.add('railModule', 'rail-module');
        tocModule.setAttribute('id', 'toc-module');
        tocModule.appendChild(toc);
        railModules.prepend(tocModule);
    }

    function appendAuteursToRail() {
        const auteurs = document.getElementById('auteurs');
        const auteursModule = document.createElement('section');
        auteursModule.classList.add('railModule', 'rail-module');
        auteursModule.setAttribute('id', 'auteurs-module');
        auteursModule.appendChild(auteurs);
        railModules.prepend(auteursModule);
    }

    function scrollSpyInit() {
        if (document.getElementById('toc')) {
            appendTocToRail();
            sections.forEach(function(elem) {
                attachViewportObserver(elem, 'toc');
            });
        }

        if (document.getElementById('auteurs')) {
            appendAuteursToRail();
        }
    }

    function attachViewportObserver(elem, type) {
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
                if (type === 'toc') {
                    e.isIntersecting ? handleIntersectionToc(elem) : handleNoIntersectionToc();
                }
                // Handle other types if necessary
            });
        }, observerConfig);

        observer.observe(elem);
    }

    // Handle intersection for the table of contents
    function handleIntersectionToc(elem) {
        const tocActiveLink = document.getElementById('toc').querySelector('li.is-active'),
              currentSectionId = elem.getAttribute('id'),
              currentTocSectionHref = document.getElementById('toc').querySelector('a[href="#' + currentSectionId + '"]');

        if (tocActiveLink) tocActiveLink.classList.remove('is-active');
        currentTocSectionHref.parentElement.classList.add('is-active');
    }

    // Handle no intersection for the table of contents
    function handleNoIntersectionToc() {
        const tocActiveLink = document.getElementById('toc').querySelector('li.is-active'),
              scrollPos = window.scrollY,
              firstSectionPos = sections[0].offsetTop,
              lastSectionPos = sections[sections.length - 1].offsetTop;

        if (tocActiveLink && (scrollPos < firstSectionPos || scrollPos > lastSectionPos)) tocActiveLink.classList.remove('is-active');
    }

    scrollSpyInit();
});