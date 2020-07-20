/* Any JavaScript here will be loaded for all users on every page load. */
/*
 * Loads ext.geshi.local as it's not loaded by default.
 * @example https://dev.wikia.com/wiki/Thread:5735
 */
;(function ($, mw) {
    if (
        [1200, 1201].indexOf(mw.config.get('wgNamespaceNumber')) !== -1 &&
        $('.mw-geshi').length
    ) {
        mw.loader.load('ext.geshi.local');
    }
})(jQuery, mediaWiki);