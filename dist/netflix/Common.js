/* Any JavaScript here will be loaded for all users on every page load. */

/* Categories (for custom background) */
mw.loader.using('mediawiki.util').then(function() {
    mw.config.get('wgCategories').forEach(function(cat) {
        $('body').addClass('cat-' + mw.util.escapeIdForAttribute(cat));
    });
});