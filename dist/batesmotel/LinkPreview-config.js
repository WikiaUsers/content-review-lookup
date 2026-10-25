/*
 * Bates Motel Wiki — LinkPreview Configuration
 * Content exclusions, performance and images
 */

window.pPreview = window.pPreview || {};
window.pPreview.RegExp = window.pPreview.RegExp || {};

/* ========================================
   CONTENT EXCLUSIONS
   ======================================== */

window.pPreview.RegExp.noinclude = (
    window.pPreview.RegExp.noinclude || []
).concat([
    '.quote',

    // Universal class for notices or custom content
    '.LinkPreview-ignore',

    // Related blog cards
    '.bm-related-blog',

    // Navigation and article notices
    '.navbox',
    '.navigation-not-searchable',
    '.ambox',
    '.notice',
    '.metadata',

    // References and contents
    '.toc',
    '.reflist',
    '.references',
    '.mw-references-wrap'
]);

/* Exclude unwanted images from previews */

window.pPreview.RegExp.iimages = (
    window.pPreview.RegExp.iimages || []
).concat([
    /NormanConstruction\.png/i
]);

window.pPreview.RegExp.iclasses = (
    window.pPreview.RegExp.iclasses || []
).concat([
    'image'
]);

/* ========================================
   PERFORMANCE
   ======================================== */

// Prefer the API: one request instead of
// retrieving and parsing the full article.
window.pPreview.apid = false;

/* ========================================
   IMAGE SETTINGS
   ======================================== */

// URLs for Fandom-hosted images can be added here.
// A missing-image fallback is configured below.
//
// window.pPreview.defimage = 'FULL_IMAGE_URL';
   window.pPreview.noimage = 'https://static.wikia.nocookie.net/batesmotel/images/6/60/Norman_and_Norma_candid.webp/revision/latest?cb=20261019141431';

/* ========================================
   DEBUGGING
   ======================================== */

window.pPreview.debug = false;

window.pPreview.prefetch = true;


/*
 * Bates Motel Wiki — LinkPreview File Thumbnail Fix v2
 * Shows the correct file image without a placeholder flash.
 *
 * REPLACES the previous file-thumbnail patch.
 */
(function () {
    'use strict';

    let hoveredTitle = null;
    let hoveredInlineThumb = null;

    const cache = new Map();
    const versionByPopup = new WeakMap();

    const apiReady = mw.loader.using('mediawiki.api').then(function () {
        return new mw.Api();
    });

    function fileTitle(href) {
        try {
            const url = new URL(href, location.href);
            if (url.origin !== location.origin) return null;

            let title = null;

            if (url.pathname.startsWith('/wiki/')) {
                title = decodeURIComponent(url.pathname.slice(6));
            } else if (url.pathname.endsWith('/index.php')) {
                title = url.searchParams.get('title');
            }

            if (!title) return null;

            title = title.replace(/_/g, ' ');

            return /^(File|Image):/i.test(title)
                ? title.replace(/^Image:/i, 'File:')
                : null;
        } catch (e) {
            return null;
        }
    }

    /*
     * Find an image already loaded on the page.
     * Only accept images linking to the SAME file.
     */
    function nearbyThumbnail(anchor, title) {
        const locations = [
            anchor.parentElement,
            anchor.closest('li, tr, .category-page__member, .gallerybox')
        ];

        for (const location of locations) {
            if (!location) continue;

            for (const candidate of location.querySelectorAll('a[href]')) {
                if (fileTitle(candidate.href) !== title) continue;

                const img = candidate.querySelector('img');

                if (img && img.complete && img.naturalWidth > 0) {
                    return img.currentSrc || img.src;
                }
            }
        }

        return null;
    }

    /*
     * Retrieve and preload a real file thumbnail.
     * Results are cached for subsequent hovers.
     */
    function imageFor(title) {
        if (cache.has(title)) return cache.get(title);

        const request = apiReady.then(function (api) {
            return api.get({
                action: 'query',
                prop: 'imageinfo',
                titles: title,
                iiprop: 'url',
                iiurlwidth: 450,
                formatversion: 2
            });
        }).then(function (response) {
            const pages = response &&
                response.query &&
                response.query.pages;

            const page = Array.isArray(pages)
                ? pages[0]
                : Object.values(pages || {})[0];

            const info = page &&
                page.imageinfo &&
                page.imageinfo[0];

            return info && (info.thumburl || info.url) || null;
        }).then(function (url) {
            if (!url) return null;

            // Wait for the real image to finish loading.
            return new Promise(function (resolve) {
                const img = new Image();

                img.onload = function () {
                    resolve(url);
                };

                img.onerror = function () {
                    resolve(null);
                };

                img.src = url;
            });
        });

        cache.set(title, request);

        if (cache.size > 100) {
            cache.delete(cache.keys().next().value);
        }

        request.catch(function () {
            if (cache.get(title) === request) {
                cache.delete(title);
            }
        });

        return request;
    }

    /*
     * Begin fetching immediately when the mouse
     * enters a file link, BEFORE LinkPreview opens.
     */
    document.addEventListener('mouseover', function (event) {
        const el = event.target;

        const anchor = el instanceof Element
            ? el.closest('a[href]')
            : null;

        if (!anchor || anchor.closest('.npage-preview')) return;

        hoveredTitle = fileTitle(anchor.href);

        hoveredInlineThumb = hoveredTitle
            ? nearbyThumbnail(anchor, hoveredTitle)
            : null;

        if (hoveredTitle) {
            imageFor(hoveredTitle).catch(function () {});
        }
    }, true);

    /*
     * Insert the correct image into the popup.
     */
    function useImage(root, url, title) {
        const img = document.createElement('img');

        img.src = url;
        img.alt = title.replace(/^File:/i, '');

        img.style.cssText =
            'display:block;' +
            'width:auto;' +
            'height:auto;' +
            'max-width:100%;' +
            'max-height:260px;' +
            'object-fit:contain;' +
            'margin:0 auto;';

        const previous = root.querySelector('img');

        if (previous) {
            previous.replaceWith(img);
        } else {
            root.insertBefore(img, root.firstChild);
        }

        root.classList.remove(
            'pp-adaptive',
            'pp-imgonly-landscape',
            'pp-imgonly-portrait',
            'pp-withtext-landscape',
            'pp-withtext-portrait'
        );
    }

    /*
     * Control when LinkPreview becomes visible.
     * Never expose the temporary placeholder for
     * file pages while the actual image is loading.
     */
    mw.hook('ppreview.show').add(function (popup) {
        const root = $(popup).get(0);

        if (!root) return;

        const version = (versionByPopup.get(root) || 0) + 1;
        versionByPopup.set(root, version);

        root.style.removeProperty('visibility');

        const title = hoveredTitle;

        // Preserve ordinary article previews.
        if (!title) return;

        const inlineThumb = hoveredInlineThumb;

        if (inlineThumb) {
            // Already loaded: show it immediately.
            useImage(root, inlineThumb, title);
        } else {
            // Hide the placeholder until ready.
            root.style.setProperty(
                'visibility',
                'hidden',
                'important'
            );
        }

        imageFor(title).then(function (url) {
            if (versionByPopup.get(root) !== version) return;

            if (url) {
                // Replace with the proper 450px thumbnail.
                useImage(root, url, title);
            }

            // Reveal the completed preview.
            // If loading failed, allow the original fallback.
            root.style.removeProperty('visibility');

        }).catch(function (error) {
            if (versionByPopup.get(root) !== version) return;

            root.style.removeProperty('visibility');

            console.warn(
                '[LinkPreview files] Could not load:',
                title,
                error
            );
        });
    });
}());