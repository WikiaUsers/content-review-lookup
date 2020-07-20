/*
 * JS Custom Link
 *
 * This JavaScript snippet processes custom links that otherwise may not be supported
 * by the MediaWiki software. Should be used sparingly, if at all.
 *
 * Usage:
 * <span class="jscustomlink" data-href="https://www.google.com" data-title="Google" data-target="_blank">my link</span>
 *
 * The above is roughly equivalent to the following wiki markup:
 * [https://www.google.com my link]
 *
 * class="jscustomlink" is required.
 * data-href="URI" is required. This is the URI where clicking the link will take you to.
 * data-title="Google" is optional, can be omitted. It is the title of the link when hovering over with the mouse.
 * data-target="_blank" is optional, can be omitted. It makes the link open in a new (blank) tab.
 */
$(function () {
    $('.jscustomlink').each(function () {
        var $span = $(this),
            href = $span.attr('data-href'),
            title, target, a;
 
        if (typeof href === "string" && href.length !== 0) {
            title = $span.attr('data-title');
            target = $span.attr('data-target');
            a = document.createElement("a");
            a.href = href;
            a.textContent = $span.text();
 
            console.log(title);
 
            if (typeof title === "string" && title.length !== 0) {
                a.setAttribute("title", title);
            }
            if (typeof target === "string" && target.length !== 0) {
                a.setAttribute("target", target);
            }
 
            $span.empty();
            $span.html(a);
        }
    });
});

/* By [[w:User:Lunarity]]
 * For more information, see [[Template:CustomRBE]]
 */
$(function($) {
    var defaultShowText = '[Show]';
    function toggle() {
        var $this = $(this);
        if ($this.hasClass('inline-collapsible-hidden')) {
            $this.html($this.data('content')).removeClass('inline-collapsible-hidden');
        } else {
            $this.text($this.data('showtext') || defaultShowText).addClass('inline-collapsible-hidden');
        }
    }
    $('.inline-collapsible').each(function() {
         var $this = $(this);
         $this.data('content', $this.html())
             .click(toggle)
             ;
         toggle.call(this);
    });
});
/* End */

/* Adding links to On the Wiki tab - From Runescape Wiki */
$(function() {
    $('.WikiHeader nav ul li.marked ul').append('<li style="background-color:#40e020"><a class="subnav-2a" href="/wiki/Bloons Wiki:Policies">Guidelines and Policies</a></li>');
/*  $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Bloons Wiki:Requests for Rollbacker">Rollbacker nominations</a></li>'); */
});
/* End */

/* "Username" template - from PvZ Wiki */
$(function() {
  if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
  $('span.insertusername').html(mw.config.get('wgUserName'));
});
/* End */

/* Ajax-refresh button config options */
window.ajaxPages = [
    "Special:Contributions",
    "Special:Log",
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:Watchlist",
    "Special:AbuseLog"
];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
/* End */

/* Purge Button settings */
window.PurgeButtonText = 'Purge';

/* UserTags settings */
window.UserTagsJS = {
	modules: {},
	tags: {
        // global rights
		'staff': { link:'w:Community Central:Staff', order: -200 },
	   	'helper': { link:'w:Help:Helpers', order: -190 },
		'vstf': { link:'w:Help:VSTF', order: -180 },
		'voldev': { link:'w:c:dev:Volunteer Developers', order: -170 },
		'util': { link:'Help:User_access_levels#Utilites', order: -160 },
		'council': { link:'w:Help:Community Council', order: -150 },
		'vanguard': { link:'Help:Vanguard', order: -140 },
		'wikiastars': { link:'homepage:Stars', order: -130 },
		'adminmentor': { link:'w:Admin Support:Main Page', order: -120 },
		'authenticated': { link:'Bloons Wiki:Authenticated', order: -110 },
		'checkuser-global': { u:'Global Checkuser', link:'w:help:checkuser', order: -100 },

        // local rights
		'founder': { link:'w:Help:Founders', order: 0 },
		'bureaucrat': { link:'Bloons Wiki:Bureaucrats', order: 1 },
		'retired bureaucrat': { u:'Retired Bureaucrat', link:'Bloons Wiki:Bureaucrats', order: 1 },
		'sysop': { u:'Admin', link:'Bloons Wiki:Administrators', order: 2 },
		'content-moderator': { link:'Bloons Wiki:Content-moderator', order: 3 },
		'rollback': { link:'Bloons Wiki:Rollback', order: 4 },
        // 'patroller': { link:'w:Help:Recent changes patrol' },
		'threadmoderator': { link:'Bloons Wiki:Threadmoderator', order: 5 },
		'chatmoderator': { link:'Bloons Wiki:Chat moderators', order: 6 },
		'newsmoderator': { u:'News Moderator', link:'Blog:News', order: 7 },
		'checkuser': { link:'w:help:checkuser', order: 8 },

        // bots
		'bot-global': { link:'Bloons Wiki:Bot-global', order: 100 },
		'bot': { link:'Bloons Wiki:Bots', order: 101 },

        // special tags
		'nonuser': { link:'Special:ActiveUsers', order: 1e101 },
		'newuser': { link:'Bloons Wiki:Users', order: 1e102 },
		'notautoconfirmed': { link:'Bloons Wiki:Users', order: 1e103 },
		'inactive': { link:'Special:ActiveUsers', order: 1e104 },

        // blocked/banned users' tags
		'bannedfromchat': { link:'Bloons Wiki:Chat', order: 1e105 },
		'blocked': { link:'Bloons Wiki:Policies', order: 1e106 }
	}
};

UserTagsJS.modules.nonuser = true; // mark users with no edits
UserTagsJS.modules.autoconfirmed = true; // mark autoconfirmed users
UserTagsJS.modules.isblocked = true; // mark blocked users on MonoBook
//UserTagsJS.modules.newuser = true; // mark new users - probably not needed when the line below works

UserTagsJS.modules.newuser = {
//	days: 7, // must have been on the Wiki for X days
//	edits: 15, // and have at least X edits to remove the tag
	namespace: 0, // edits must be made to articles to count
	computation: function(days, edits) {
        // Return false = not newuser, return true = newuser
		return edits < 20 && (edits < 10 || days < 7) && days < 21;
	}
	// NOTE: Computation would be mutually exclusive with days/edits, those params would stop working when you define your own function.
};

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: false // 0 article edits = inactive
};

UserTagsJS.modules.mwGroups = [
     // add corresponding tags to users
    'bureaucrat',
    'chatmoderator',
    'rollback',
    'content-moderator',
    'threadmoderator',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
    'checkuser',
    'checkuser-global',
    'vanguard',
    'voldev',
    'util',
    'council',
    'vstf',
    'helper',
    'adminmentor',
    'staff'
];

// adding tags to users
UserTagsJS.modules.custom = {
//  'somebody': ['inactive'], // Force inactive group instead of relying on the inactive module
//  'CreeperSlimePig': ['newsmoderator'],
    'Roberto1205': ['retired bureaucrat'],
    'SW8573': ['inactive'],
    'Zelda311': ['founder', 'retired bureaucrat'],
    'Abuse filter': ['bot'] // add bot tag as it is an automated software
};

// removing tags to users
UserTagsJS.modules.userfilter = {
//  'somebody': ['inactive'] // 'somebody' is never marked as inactive, even when he is
    'Abuse filter': ['nonuser'] // remove 'Never Edited' tag
};

UserTagsJS.modules.metafilter = {
    'sysop': ['bot'], // remove sysop tag from bots
    'bot': ['bot-global'], // remove bot tag from global bots
    'inactive': ['bot', 'bot-global', 'util', 'council', 'vstf', 'helper', 'staff', 'adminmentor'], // remove inactive tag from bots & global users
	'newuser': ['bot', 'bot-global', 'util', 'council', 'vstf', 'helper', 'staff', 'adminmentor'] // remove newuser tag from bots & global users
};
/* End */	

/* LockOldBlogs settings */
window.LockOldBlogs = {
    expiryDays: 30,      // lock blogs after "expiryDays" days
    expiryMessage: "This blog is considered archived because it hasn't been commented on in over <expiryDays> days. To disable the auto-archiving on your post you can add it to the \"Never archived posts\" category.",
    nonexpiryCategory: "Never archived posts"
};
/* End */

/* FastDelete settings */
window.fdButtons = [];

fdButtons[fdButtons.length] = {
	'summary': 'Spam',
	'label': 'Spam'
};

//fdButtons[fdButtons.length] = {
//	'summary': 'Vandalism',
//	'label': 'Vandalism'
//};
/* End */

/* RevealAnonIP */
window.RevealAnonIP = {
    permissions : ['user']
// Syntax -     permissions : ['GROUP1', 'GROUP2', 'GROUP3']
};
/* End RevealAnonIP */

/* SocialMediaButtons */
window.SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
/* End  SocialMediaButtons */

/* LockForums configuration - full list on dev wiki */
window.LockForums = {
    expiryDays: 45,
    warningDays: 15,
    disableOn: ["30891", "48182", "48183", "86964", "98484"],
    banners: true
}; 
/* End config */

/* Change chat description
 * Source: mlp wiki
 */

// Change chat description
/* disabled
if ($('section.ChatModule').length > 0){
	$.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result){
		if ($('p.chat-name').length > 0){
			$('p.chat-name').html(result);
		}else{
			var chatDescInt = setInterval(function() {
				if ($('p.chat-name').length > 0){
					$('p.chat-name').html(result);
					clearInterval(chatDescInt);
				}
			}, 50);
		}
	});
}
*/
/* End change chat description */

/* Custom edit buttons
 * For source mode use only
 */
if ( mwCustomEditButtons ) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
        "speedTip": "Redirect",
        "tagOpen": "#REDIRECT [[",
        "tagClose": "]]",
        "sampleText": "Target page"
    };
}
/* End custom edit buttons */