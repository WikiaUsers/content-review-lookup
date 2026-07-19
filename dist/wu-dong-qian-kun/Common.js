/* Enable the modern Back to Top button */
window.BackToTopModern = true;

/**
 * Link Preview
 * ------------
 * Global configuration for article link previews.
 *
 * This customizes preview behavior, filters unnecessary content,
 * and improves readability throughout the wiki.
 */

window.pPreview = $.extend(true, window.pPreview, {
    RegExp: (window.pPreview || {}).RegExp || {}
});

/* Hide the "No Image" placeholder when the preview has no image and no text. */
window.pPreview.showNoImagePlaceholder = false;

/* Disable previews for technical namespaces. */
window.pPreview.RegExp.ipages = [
    /^Template:/,
    /^Module:/,
    /^Special:/
];

mw.hook('ppreview.ready').add(function (Settings) {

    const exclude = [
        // Citation references
        '.reference',
        'sup.reference',
        '.mw-references-wrap',
        '.references',
        'ol.references',
        '.mw-ref',

        // Navigation
        '.navbox',

        // Authority control
        '.authority-control',

        // File captions
        '.thumbcaption',

        // Templates
        '.quote',
        '.tabs'
    ];

    Settings.RegExp.noinclude = Settings.RegExp.noinclude || [];

    exclude.forEach(function (selector) {
        if (!Settings.RegExp.noinclude.includes(selector)) {
            Settings.RegExp.noinclude.push(selector);
        }
    });

});