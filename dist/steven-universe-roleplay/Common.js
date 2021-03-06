/* Makes username template work */
function userNameReplace() {
    "use strict";
    var disableUsernameReplace;
    if (disableUsernameReplace || mw.config.get('wgUserName') === null) {
        return;
    }
    $("span.insertusername").html(mw.config.get('wgUserName'));
}
addOnloadHook(userNameReplace);
 
/* User Tags */
window.UserTagsJS = {
    tags: {
        bureaucrat: {
            link: 'Special:ListUsers/bureaucrat'
        },
        bot: {
           link: 'Special:Listusers/bot'
        },
        chatmoderator: {
            link: 'Special:ListUsers/chatmoderator'
        },
        imagecontrol: {
    u: 'imagecontrol',
    link: 'Special:ListUsers/imagecontrol'
},
        rollback: {
            link: 'Special:ListUsers/rollback'
        },
        sysop: {
            link: 'Special:ListUsers/sysop'
    },
        moderator: {
            link: 'Special:ListUsers/moderator'
        }
    },
    modules: {
        autoconfirmed: true,
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'bannedfromchat',
            'bureaucrat',
            'chatmoderator',
            'sysop',
            'rollback',
            'bot',
            'imagecontrol',
            'moderator'
        ],
        newuser: true
    }
};

/* AjaxRC */
window.ajaxPages = ["Blog:Recent_posts","Special:Chat","Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
window.ajaxIndicator = 'https://vignette.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
 
//—————————————————————————————— ! ! ! ———————————————————————————————//
/* Import scripts. NOTE: Place scripts configurations above this line */
 
importArticles({
    type: 'script',
    articles: [
        'u:dev:MassProtect/code.js',        //Mass protection.
        'u:dev:AjaxBatchDelete/code.2.js',  //Mass deletion.
        'u:dev:BackToTopButton/code.js',    //Back to top button.
        'u:dev:WallGreetingButton/code.js', //Message walls greetings. 
        'u:dev:UserTags/code.js',           //Customizes user tags.
        'u:dev:SignatureCheck/code.js',     //Talk pages vestige.
        'u:dev:ReferencePopups/code.js',    //Allowes to make very neat things :0
        'u:dev:PurgeButton/code.js',        //Refresh button.
        'u:dev:LockOldBlogs/code.js',       //Automatically locks old blogposts.
        'u:dev:FloatingToc/code.js',        //Makes the toc more mobile.
        'u:dev:LockForums/code.js',         //Automatically locks old forums. 
        'u:dev:Countdown/code.js',          //Countdowns.
        'u:dev:YoutubePlayer/code.js'       //Revives MPC
    ]
});

/* Mass Categorization */
massCategorizationDelay = 1000;
importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');

/* Portable infoboxes colors */
(function() {
	// Function to check for Portable Infoboxes, and change their color
	var changeColors = function() {
		var PIs = $('.portable-infobox');
		if (PIs.length) PIs.each(function() {
			var $PI = $(this);
			$PImg = $('.pi-image-thumbnail',this);
			$prev = $(this).prev();
			if ($prev.text()) $PImg.css({
                 width: $prev.text(),
                 height: 'auto'
            });
			color = '',
				classNames = $PI.attr('class').split(' ');
			for (var i = 0; i < classNames.length; i++) {
				if (classNames[i].indexOf('pi-theme-_') !== -1) {
					color = classNames[i].replace('pi-theme-_', '');
					break;
				}
			}
			if (color) $PI.css('border', '2px solid #' + color);
		});
	};
	changeColors();
})();

window.YoutubePlayerDisableAutoplay = true;