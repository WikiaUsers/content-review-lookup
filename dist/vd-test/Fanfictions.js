// Fonction pour exécuter le code uniquement dans le namespace '0'
function executeInNamespaceZero(callback) {
    if (mw.config.get('wgNamespaceNumber') === 0) {
        callback();
    }
}

// Code à exécuter dans le namespace '0'
executeInNamespaceZero(function() {
    /****** WPF.js ******/
    // Ajouter l'icône du WPF
    $.when($.ready, mw.loader.using(["mediawiki.api"])).then(function() {
        "use strict";

        var wrapperQuery = document.querySelector(".main-container .community-header-wrapper");
        var officialImageQuery = document.querySelector(".main-container .fandom-community-header__community-name-wrapper img.official-community-image");
        
        if (wrapperQuery && !officialImageQuery) {
            var officialImage = $("<img class=\"official-community-image\" src=\"https://static.wikia.nocookie.net/parodies-et-fanfictions/images/e/e6/Site-logo.png/revision/latest?cb=20231026054927&path-prefix=fr\" alt=\"Official Community Image\">");
            officialImage.css({
                "width": "25px",
                "height": "25px"
            });
            $(".main-container .fandom-community-header__top-container .fandom-community-header__community-name-wrapper").append(officialImage);
        }
    });

    // Temps de lecture 
    (function() {
        'use strict';

        function readingTimeInit(i18n) {
            var isInMainNamespace = mw.config.get('wgNamespaceNumber') === 0;

            if (!isInMainNamespace || window.fandomDevDisableBlogReadingTime || window.fandomDevReadingTimeLoaded) return;

            // Double-run protection.
            window.fandomDevReadingTimeLoaded = true;

            var blogContent = document.querySelector('#content .mw-parser-output');

            if (!blogContent) throw new Error('Blog content is missing.');

            var blogImages = blogContent.querySelectorAll('img');
            // The fallback value for words per minute is the approximate average reading
            // speed of an adult (measured in words per minute).
            var wordsPerMinute = typeof window.fandomDevBlogReadingTimeWpm === 'number' ? window.fandomDevBlogReadingTimeWpm : 265;
            // The time needed to read an image varies wildly, so we'll just use some arbitrary
            // medium number to represent the time, in seconds, that it takes to scan an image.
            var imageSeconds = 12;

            var readingSeconds = 0;
            var text = blogContent.textContent.length ? blogContent.textContent.replace(/(\r\n|\n|\r)/gm, '').split(' ') : [];
        
            if (blogImages.length) {
                for (var i = 0; i < blogImages.length; i++) {
                    readingSeconds += imageSeconds;
                }
            }

            // Calculate how many seconds it would take to read the blog without counting
            // empty strings/words.
            var textSeconds = 60 * text.filter(function(word) { return '' !== word }).length / wordsPerMinute;

            readingSeconds += textSeconds;

            // Convert seconds into minutes.
            var readingTime = Math.ceil(readingSeconds / 60);

            // Create elements for reading time display.
            var readingTimeElement = document.createElement('span');
            var readingTimeText = "🪶 Fanfiction • " + readingTime + " minutes de lecture";
            readingTimeElement.className = 'page-header__blog-post-details__reading-time';
            readingTimeElement.style.fontSize = '16px'; // Taille de police de 16px
            readingTimeElement.innerText = readingTimeText;

            // Inject the reading time element below the page header title.
            var pageHeadingTitle = document.querySelector('.page-header__title');
            if (pageHeadingTitle) {
                pageHeadingTitle.insertAdjacentElement('afterend', readingTimeElement);
            }
        }

        mw.hook('dev.i18n').add(function(i18n) {
            i18n.loadMessages('BlogReadingTime').done(function(i18n) {
                readingTimeInit(i18n);
            });
        });

        importArticle({ article: 'u:dev:MediaWiki:I18n-js/code.js' });
    })();


    // Fonction pour attacher les modules "#auteurs-module" et "#toc-module"
    function attachAuthorsAndTOCModule() {
        'use strict';

        // Double run protection.
        if (window.scrollSpyLoaded || (!document.getElementById('toc') && !document.getElementById('auteurs'))) return;

        window.scrollSpyLoaded = true;

        importArticle({ article: 'u:dev:MediaWiki:ScrollSpy.css' });

        var railModules = document.querySelector('.WikiaRail > .sticky-modules-wrapper'),
            rightRail = document.querySelector('.right-rail-wrapper'),
            sections = document.querySelectorAll(':is(h2, h3, h4, h5, h6) > .mw-headline');

        function appendTocToRail() {
            var toc = document.getElementById('toc');
            var tocModule = document.createElement('section');
            tocModule.classList.add('railModule', 'rail-module');
            tocModule.setAttribute('id', 'toc-module');
            tocModule.appendChild(toc);
            railModules.prepend(tocModule);
        }

        function appendAuteursToRail() {
            var auteurs = document.getElementById('auteurs');
            var auteursModule = document.createElement('section');
            auteursModule.classList.add('railModule', 'rail-module');
            auteursModule.setAttribute('id', 'auteurs-module');
            rightRail.insertBefore(auteursModule, railModules);
            auteursModule.appendChild(auteurs);
        }

        function scrollSpyInit() {
            if (document.getElementById('toc')) {
                appendTocToRail();
                for (var i = 0; i < sections.length; i++) {
                    attachViewportObserver(sections[i], 'toc');
                }
            }

            if (document.getElementById('auteurs')) {
                appendAuteursToRail();
            }
        }

        function attachViewportObserver(elem, type) {
            var observerConfig = {
                // Use the viewport as the observer.
                root: null,
                // Do something once each element is fully visible into the viewport.
                threshold: 1
            };

            var observer = new IntersectionObserver(function(e) {
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
            var tocActiveLink = document.getElementById('toc').querySelector('li.is-active'),
                currentSectionId = elem.getAttribute('id'),
                currentTocSectionHref = document.getElementById('toc').querySelector('a[href="#' + currentSectionId + '"]');

            if (tocActiveLink) tocActiveLink.classList.remove('is-active');
            currentTocSectionHref.parentElement.classList.add('is-active');
        }

        // Handle no intersection for the table of contents
        function handleNoIntersectionToc() {
            var tocActiveLink = document.getElementById('toc').querySelector('li.is-active'),
                scrollPos = window.scrollY,
                firstSectionPos = sections[0].offsetTop,
                lastSectionPos = sections[sections.length - 1].offsetTop;

            if (tocActiveLink && (scrollPos < firstSectionPos || scrollPos > lastSectionPos)) tocActiveLink.classList.remove('is-active');
        }

        scrollSpyInit();
    }

    // Exécuter la fonction lorsque le DOM est entièrement chargé
    $(document).ready(function() {
        attachAuthorsAndTOCModule();
    });

    // Barre de progression de lecture
    window.enableReadProgressBarOnArticles = true;

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:ReadProgressBar.js',
        ]
    });
});