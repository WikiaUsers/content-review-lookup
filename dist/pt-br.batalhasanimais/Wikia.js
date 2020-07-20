$(window).load(function () {
    'use strict';
 
    // Inserts the module
    if (mw.config.get('wgIsMainpage') !== true) { // Checks if it's not the homepage
        if ($('#TOP_RIGHT_BOXAD').length) { // Checks if there are ads
            $('#TOP_RIGHT_BOXAD').after(socialModule, $('#WikiaRecentActivity')); // Inserts module and Recent Wiki Activity (if there is) below ads
        } else if (mw.config.get('wgPageName') === 'Special:WikiActivity') { // If there are no ads, checks if it's Special:WikiActivity
            $('#WikiaRail').prepend(socialModule, $('.CommunityCornerModule')); // Inserts module and Community Corner at the top of the sidebar
        } else { // If there are no ads and it isn't Special:WikiActivity
            $('#WikiaRail').prepend(socialModule, $('#WikiaRecentActivity')); // Inserts modules at the top of the sidebar
        }
    }
});