importArticles({
	type: "script",
	articles: [
        "MediaWiki:Common.js/slider.js", /* "Slider" header for main page */     
	]
});

/* Social Module */
        var homeSocial =
                '<table>' +
                    '<tr>' +
                        '<td colspan="2">' +
                            '<iframe style="border: 0; height: 300px; margin: 0; overflow: hidden; width: 296px;" src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fsnkwiki&amp;header=true&amp;height=300&amp;heightcolorscheme=light&amp;show_faces=true&amp;small_header=true&amp;stream=true&amp;width=296" scrolling="yes"></iframe>' +
                        '</td>' +
                    '</tr>' +
                    
                '</table>';
 
        $('div#social-module').html(homeSocial); 
        }
 
});

// Module
    var socialModule =
    '<section class="module" id="SocialModule">' +
        '<h2>Follow us!</h2>' +
        '<table>' +
            '<tr>' +
                '<td colspan="2">' +
                    '<iframe style="border: 0; height: 231px; margin: 0; overflow: hidden; width: 268px;" src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fsnkwiki&amp;width=268&amp;heightcolorscheme=light&amp;show_faces=true&amp;header=true&amp;stream=false&amp;show_border=true" scrolling="no"></iframe>' +
                '</td>' +
            '</tr>' +
                    '</table>' +
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