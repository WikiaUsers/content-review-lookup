/**
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
jQuery(function($) {
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
$(document).ready(function() {
    if ( skin == 'oasis' && $.inArray("staff", wgUserGroups) == -1) {
        $('.WikiHeader nav ul li.marked ul').prepend('<li><a class="subnav-2a" href="/wiki/LogoLine:Policy">Our Policy</a></li>');
/*        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/LogoLine:Requests for rollback">Rollbacker nominations</a></li>'); */
    }
});
/* End */



/* "Username" template - from Avatar Wiki */

$(function() {
  if (typeof wgUserName != 'undefined') {
     $('.insertusername').html(wgUserName);
  }
}); 
/* End */



/* Ajax-refresh button config options */
ajaxPages = ["Special:Contributions","Special:Log","Special:RecentChanges","Special:WikiActivity"];
/* End */



/* UserTags settings */

window.UserTagsJS = {
	modules: {},
	tags: {
//		'patroller': { link:'Help:Recent changes patrol' },
		'newsmoderator': { u:'News Moderator', link:'Blog:News' },
		'chatmoderator': { link:'LogoLine:Chat moderators' },
		'rollback': { link:'Help:User access levels#Rollbackers' },
		'sysop': { u:'Admin', link:'LogoLine:Administrators' },
		'bureaucrat': { link:'Help:User access levels#Bureaucrats' },
		'retired bureaucrat': { u:'Retired Bureaucrat', link:'Help:User access levels#Bureaucrats' },
		'founder': { link:'Help:Founders' },
		'bot': { link:'Help:User access levels#Bots' },
		'bot-global': { link:'Help:User access levels#Bots' },
		'checkuser': { link:'Help:CheckUser' },
		'checkuser-global': { u:'Global CheckUser', link:'Help:CheckUser' },
		'authenticated': { link:'Help:User access levels#Authenticated' },
		'wikiastars': { link:'homepage:Stars' },
		'voldev': { link:'w:c:dev:Volunteer Developers' },
		'util': { link:'Help:User_access_levels#Utilites' },
		'council': { link:'Help:Community Council' },
		'vstf': { link:'Help:VSTF' },
		'helper': { link:'Help:Helpers' },
		'adminmentor': { link:'w:Admin Support:Main Page' },
		'staff': { link:'w:Community Central:Staff' },
		'inactive': { link:'Special:ActiveUsers' },
		'nonuser': { link:'Special:ActiveUsers' },
		'newuser': { link:'Special:ListUsers' },
		'notautoconfirmed': { link:'Help:User access levels#Autoconfirmed_users' },
		'bannedfromchat': { link:'w:Community Central:Chat Guidelines' },
		'blocked': { link:'Logoline:Policy' }
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
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'checkuser', 'checkuser-global', 'voldev', 'util', 'council', 'vstf', 'helper', 'adminmentor', 'staff']; // add corresponding tags to users
// adding tags to users
UserTagsJS.modules.custom = {
//	'somebody': ['inactive'], // Force inactive group instead of relying on the inactive module
	'Bloonstdfan360': ['retired user'],
	'TheCanadianTentinabox': ['blocked user'],
};
// removing tags to users
UserTagsJS.modules.userfilter = {
//	'somebody': ['inactive'] // 'somebody' is never marked as inactive, even when he is
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
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days. To disable the auto-archiving on your post you can add it to the \"Never archived posts\" category.",
    nonexpiryCategory: "Never archived posts"
};
/* End */




/* RevealAnonIP */
window.RevealAnonIP = {
    permissions : ['user']
// Syntax -     permissions : ['GROUP1', 'GROUP2', 'GROUP3']
};
/* End RevealAnonIP */


importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/ajaxrefresh.js",           //Auto-refresh
        "MediaWiki:Common.js/chat.js",                  //Test only
        "MediaWiki:Chat headline",
        "MediaWiki:Common.js/displayTimer.js",          //UTC Clock
        "MediaWiki:Common.js/EditGreeting.js",          //Edit greeting button
        "MediaWiki:Common.js/ShowHide.js",              //From dev
        "w:c:dev:LockOldBlogs/code.js",                 //Disables commenting on old blogs
        "w:c:dev:Countdown/code.js",                    //Countdown timer
        "w:c:dev:UserTags/code.js",                     //Inactive tag + UserBadges + more new functions
        "w:c:dev:FastDelete/code.js",                   //FastDelete
//      "w:c:dev:FloatingToc/code.js",                   //Floating ToC
        "w:c:dev:RevealAnonIP/code.js"                 //Reveals anon IPs
    ]
});

/* Change chat description
 * Source: mlp wiki
 */

// Change chat description
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