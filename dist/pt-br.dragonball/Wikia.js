$(window).load(function () {
    'use strict';
    // Module
    var socialModule =
    '<section class="rail-module" id="SocialModule">' +
        '<h2>Curta nossa página no Facebook!</h2>' +
        '<iframe style="border: 0; height: 231px; margin: 0; overflow: hidden;" src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FDBWikiBR&amp;heightcolorscheme=light&amp;show_faces=true&amp;header=true&amp;stream=false&amp;show_border=true" scrolling="no"></iframe>' +
    '</section>';
 
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

//botar o discord imbaixo do feice
$('.DiscordIntegratorModule').insertAfter('.rail-module#SocialModule');