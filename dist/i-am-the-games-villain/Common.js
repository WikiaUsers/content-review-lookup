/* BEGIN TGV LARGE INSIGNIAS v1 — 2026-10-02
 * Enlarges existing insignia markers only: 48px desktop / 40px narrow screens.
 * Keeps Fandom's own markers, click handlers, filters, coordinates and popups.
 * No external imports, API writes, tracking, or changes to saved map JSON.
 * Remove this labelled block to undo. If the alternate renderer is unavailable,
 * canvas pixels and positions are not modified. Fandom review still applies.
 */
(function () {
    'use strict';
    if (mw.config.get('wgAction') !== 'view') { return; }

    var TEST_MAP = null; // Set to 'Dorian' to restrict future compatibility tests.
    var crestName = /insignia|insgina|insgnia|redhorah[_ ]reconstructed[_ ]dragon[_ ]seal/i;
    var watched = new WeakSet();
    var styleId = 'tgv-large-insignias-v1';

    function isCrest(icon) {
        if (!icon) { return false; }
        var text = typeof icon === 'string' ? icon : (icon.title || icon.url || '');
        try { text = decodeURIComponent(text); } catch (ignore) { /* Keep original. */ }
        return crestName.test(text);
    }

    function eligible(map) {
        return (!TEST_MAP || map.name === TEST_MAP) &&
            (map.markers || []).concat(map.categories || []).some(function (item) {
                return isCrest(item.icon);
            });
    }

    function configure() {
        var maps = mw.config.get('interactiveMaps') || {};
        Object.keys(maps).forEach(function (key) {
            if (eligible(maps[key])) {
                // Verified with Fandom's native renderer in official test mode.
                // Do this immediately, before the map mounts, not after a delay.
                maps[key].canvasEngineDisabled = true;
            }
        });
    }

    function installStyle() {
        if (document.getElementById(styleId)) { return; }
        var style = document.createElement('style');
        style.id = styleId;
        style.textContent = [
            '.tgv-large-crests .leaflet-marker-icon.tgv-crest-marker {',
            'width:48px!important;height:48px!important;',
            'margin-left:-24px!important;margin-top:-48px!important;',
            'background:transparent!important;border:0!important;',
            '}',
            '.tgv-large-crests .tgv-crest-marker > img {',
            'display:block!important;width:100%!important;height:100%!important;',
            'min-width:0!important;max-width:none!important;',
            'object-fit:contain;object-position:center bottom;',
            'margin:0!important;padding:0!important;border:0!important;',
            'transform:none!important;transition:none!important;animation:none!important;',
            '}',
            '.tgv-large-crests .tgv-crest-marker:focus-visible {',
            'outline:2px solid #d9b8ff;outline-offset:3px;',
            '}',
            '@media (max-width:600px) {',
            '.tgv-large-crests .leaflet-marker-icon.tgv-crest-marker {',
            'width:40px!important;height:40px!important;',
            'margin-left:-20px!important;margin-top:-40px!important;',
            '}}'
        ].join('\n');
        document.head.appendChild(style);
    }

    function markCrests(root) {
        root.querySelectorAll('.leaflet-marker-pane > .leaflet-marker-icon > img').forEach(function (image) {
            if (isCrest(image.getAttribute('src'))) {
                var mapElement = image.closest('.interactive-maps__map');
                if (!mapElement) { return; }
                mapElement.classList.add('tgv-large-crests');
                image.parentElement.classList.add('tgv-crest-marker');
            }
        });
    }

    function enhance() {
        var maps = mw.config.get('interactiveMaps') || {};
        Object.keys(maps).forEach(function (key) {
            if (!eligible(maps[key])) { return; }
            Array.from(document.getElementsByClassName(key)).forEach(function (root) {
                if (watched.has(root)) { return; }
                watched.add(root);
                // Do not alter the placeholder root: Fandom's lazy initializer
                // expects its original class attribute before mounting embeds.
                markCrests(root);
                // Filters and fullscreen may recreate native marker elements.
                // Ignore attributes: Leaflet updates transforms while panning.
                new MutationObserver(function () { markCrests(root); })
                    .observe(root, { childList: true, subtree: true });
            });
        });
    }

    configure();
    installStyle();
    mw.hook('wikipage.content').add(function () {
        configure();
        enhance();
    });
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhance, { once: true });
    } else {
        enhance();
    }
}());
/* END TGV LARGE INSIGNIAS v1 */