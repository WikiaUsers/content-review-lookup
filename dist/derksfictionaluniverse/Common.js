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