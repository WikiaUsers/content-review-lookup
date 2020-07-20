/**
 * See [[MediaWiki:FileUsageAuto-update/code.js/load.js]] for code!
 * 
 * Loads the script conditionally because of its large size,
 * rather than having a conditional built into the import
 * statement for extendability later.
 */
(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgNamespaceNumber'
    ]);
    if (
        (
            config.wgCanonicalSpecialPageName == 'Movepage' ||
            config.wgNamespaceNumber === 6 ||
            $('.fuau').length > 0
        ) &&
        window.Storage
    ) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:FileUsageAuto-update/code.js/load.js'
        });
    }
})();