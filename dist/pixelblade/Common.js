// MediaWiki:Common.js

// Ensure the toggle runs after page load
mw.hook('wikipage.content').add(function ($content) {
    // Bind your custom toggle
    $('.mw-customtoggle-pixelnav').each(function () {
        var $btn = $(this),
            targetID = 'mw-customcollapsible-pixelnav';

        // Initialize the collapsible if it isn't already
        if (!$.fn.makeCollapsible) {
            // Fandom provides mw.loader for collapsibles
            mw.loader.using('mediawiki.CollapsibleTabber', function () {
                $btn.makeCollapsible({
                    target: '#' + targetID,
                    collapsed: true
                });
            });
        } else {
            // Fallback
            $btn.on('click', function () {
                $('#' + targetID).toggleClass('mw-collapsed mw-collapsible');
            });
        }
    });
});