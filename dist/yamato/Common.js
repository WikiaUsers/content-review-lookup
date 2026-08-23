/* =========================================================
 * LinkPreview configuration
 * ========================================================= */

window.pPreview = $.extend(true, window.pPreview, {
    RegExp: (window.pPreview || {}).RegExp || {}
});

window.pPreview.mline = 5;
window.pPreview.textAlign = 'left';
window.pPreview.prefetch = true;

window.pPreview.RegExp.noinclude = [
    ".NoLinkPreview",
    ".context-link",
    ".notice",
    ".LinkPreview-ignore",
    ".quote",
    ".mw-ext-cite-error",
    ".error",
    ".caption",
    ".image.caption",
    ".blockquote",
    ".references",
    ".reference",
    ".sup.reference"
];

window.pPreview.RegExp.iimages = [
    /White[_%20]Calaklum[_%20]side/i,
    /Site[-_]favicon/i
];

window.pPreview.showNoImagePlaceholder = false;


/* =========================================================
 * Formatted LinkPreview
 * ========================================================= */

(function () {

    /*
     * Cache the FINAL cleaned HTML rather than the raw article.
     *
     * Example:
     *
     * cache["Garmillas"] =
     *     "<p><b>Garmillas</b> ...</p>"
     */
    var cache = {};

    /*
     * CSS classes whose styling should survive into LinkPreview.
     */
    var allowedClasses = [
        'garmillas',
        'iscandar',
        'bolar',
        'gatlantis'
    ];


    /* =====================================================
     * Get MediaWiki title from a link
     * ===================================================== */

    function getTitleFromLink(link) {

        if (!link) {
            return null;
        }

        var href = link.getAttribute('href');

        if (!href) {
            return null;
        }

        var match = href.match(/\/wiki\/([^#?]+)/);

        if (!match) {
            return null;
        }

        return decodeURIComponent(match[1])
            .replace(/_/g, ' ');
    }


    /* =====================================================
     * Clean parsed article HTML
     * ===================================================== */

    function cleanHTML(output) {

        if (!output) {
            return '';
        }

        var container = document.createElement('div');


        /*
         * Only take the introductory paragraphs.
         */
        output.querySelectorAll(':scope > p').forEach(function (p) {

            var clone = p.cloneNode(true);


            /*
             * Remove whitespace and <br> elements at the
             * beginning of the paragraph.
             */
            while (clone.firstChild) {

                var first = clone.firstChild;

                if (
                    first.nodeType === Node.TEXT_NODE &&
                    !first.textContent.trim()
                ) {
                    first.remove();
                    continue;
                }

                if (
                    first.nodeType === Node.ELEMENT_NODE &&
                    first.tagName === 'BR'
                ) {
                    first.remove();
                    continue;
                }

                break;
            }


            /*
             * Remove whitespace and <br> elements at the end.
             */
            while (clone.lastChild) {

                var last = clone.lastChild;

                if (
                    last.nodeType === Node.TEXT_NODE &&
                    !last.textContent.trim()
                ) {
                    last.remove();
                    continue;
                }

                if (
                    last.nodeType === Node.ELEMENT_NODE &&
                    last.tagName === 'BR'
                ) {
                    last.remove();
                    continue;
                }

                break;
            }


            /*
             * Ignore completely empty paragraphs.
             */
            if (clone.textContent.trim()) {
                container.appendChild(clone);
            }

        });


        /* =================================================
         * Remove unwanted elements
         * ================================================= */

        container.querySelectorAll(
            'sup.reference,' +
            '.reference,' +
            '.references,' +
            '.mw-references-wrap,' +
            'table,' +
            'img,' +
            'script,' +
            'style,' +
            'noscript'
        ).forEach(function (element) {

            element.remove();

        });


        /* =================================================
         * Remove links but retain their text
         * ================================================= */

        container.querySelectorAll('a').forEach(function (a) {

            a.replaceWith(
                document.createTextNode(a.textContent)
            );

        });


        /* =================================================
         * Preserve allowed font classes
         * ================================================= */

        container.querySelectorAll('span').forEach(function (span) {

            var classes = allowedClasses.filter(function (className) {

                return span.classList.contains(className);

            });


            if (classes.length) {

                /*
                 * Keep only the class attribute.
                 */
                span.removeAttribute('id');
                span.removeAttribute('style');

                span.className = classes.join(' ');

            } else {

                /*
                 * Other spans become plain text.
                 */
                span.replaceWith(
                    document.createTextNode(
                        span.textContent
                    )
                );

            }

        });


        /*
         * Remove whitespace-only nodes directly inside
         * the container.
         */
        Array.from(container.childNodes).forEach(function (node) {

            if (
                node.nodeType === Node.TEXT_NODE &&
                !node.textContent.trim()
            ) {
                node.remove();
            }

        });


        return container.innerHTML.trim();
    }


    /* =====================================================
     * Fetch + parse + CLEAN + CACHE
     * ===================================================== */

    function getArticle(title) {

        /*
         * If we've already started fetching this article,
         * return the existing Promise.
         */
        if (cache[title]) {
            return cache[title];
        }


        /*
         * Store the Promise itself.
         *
         * This is important because multiple events can request
         * the same article at the same time.
         */
        cache[title] = fetch(
            '/api.php?action=parse' +
            '&page=' + encodeURIComponent(title) +
            '&prop=text' +
            '&redirects=true' +
            '&format=json'
        )
        .then(function (response) {

            return response.json();

        })
        .then(function (data) {

            if (
                !data.parse ||
                !data.parse.text
            ) {
                return '';
            }


            /*
             * Parse MediaWiki's rendered HTML.
             */
            var doc = new DOMParser().parseFromString(
                data.parse.text['*'],
                'text/html'
            );


            var output =
                doc.querySelector('.mw-parser-output');


            if (!output) {
                return '';
            }


            /*
             * IMPORTANT:
             *
             * Clean the HTML NOW, before putting it into
             * the cache.
             */
            return cleanHTML(output);

        })
        .catch(function (error) {

            console.error(
                'LinkPreview formatted HTML error:',
                error
            );

            /*
             * Allow a failed request to be retried.
             */
            delete cache[title];

            return '';

        });


        return cache[title];
    }


    /* =====================================================
     * PREFETCH
     *
     * Start our request as soon as the mouse enters a wiki
     * link, rather than waiting for LinkPreview itself.
     * ===================================================== */

    $(document).on(
        'mouseenter',
        'a[href*="/wiki/"]',
        function () {

            /*
             * Ignore links inside the preview itself.
             */
            if (
                $(this).closest('.npage-preview').length
            ) {
                return;
            }


            var title = getTitleFromLink(this);


            if (title) {

                /*
                 * Start fetching immediately.
                 *
                 * We don't need to wait for the Promise here.
                 */
                getArticle(title);

            }

        }
    );


    /* =====================================================
     * LINKPREVIEW DISPLAY
     * ===================================================== */

    mw.hook('ppreview.show').add(function (pp) {

        var $preview = $(pp);

        var $text =
            $preview.find('.npage-preview-text');


        if (!$text.length) {
            return;
        }


        /* =================================================
         * Find the link responsible for THIS preview
         * ================================================= */

        var elements =
            document.querySelectorAll(':hover');

        var link = null;


        for (
            var i = elements.length - 1;
            i >= 0;
            i--
        ) {

            if (
                elements[i].tagName === 'A' &&
                elements[i].href &&
                elements[i].href.indexOf('/wiki/') !== -1 &&
                !elements[i].closest('.npage-preview')
            ) {

                link = elements[i];
                break;

            }

        }


        var title =
            getTitleFromLink(link);


        if (!title) {
            return;
        }


        /* =================================================
         * Hide the ENTIRE preview while our formatted HTML
         * is being obtained.
         * ================================================= */

        $preview.css(
            'visibility',
            'hidden'
        );


        /*
         * getArticle() will normally already have a Promise
         * running because of our mouseenter prefetch.
         */
        getArticle(title).then(function (html) {

            if (!html) {

                /*
                 * Fall back to normal LinkPreview if our
                 * request failed.
                 */
                $preview.css(
                    'visibility',
                    ''
                );

                return;
            }


            /* =============================================
             * Insert cached CLEAN HTML
             * ============================================= */

            $text.html(html);


            /*
             * Preserve LinkPreview's alignment.
             */
            $text.css(
                'text-align',
                window.pPreview.textAlign || 'left'
            );


            /*
             * Force layout calculation before revealing
             * the preview.
             */
            $preview[0].offsetHeight;


            /*
             * Show the completed preview.
             */
            $preview.css(
                'visibility',
                'visible'
            );

        });

    });

})();
var $previewImage = $preview.find('img').first();

if ($previewImage.length) {
    var imageSrc = $previewImage.attr('src') || '';

    if (/White.*Calaklum.*side/i.test(imageSrc)) {
        $previewImage.remove();
    }
}