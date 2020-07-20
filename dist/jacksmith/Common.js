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
        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Jacksmith Wiki:Policies">Our Policies</a></li>');
/*        $('.WikiHeader nav ul li.marked ul').append('<li><a class="subnav-2a" href="/wiki/Bloons Wiki:Requests for Rollbacker">Rollbacker nominations</a></li>'); */
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
                'patroller': { u:'Watchman', f:'Watchgirl', link:'Help:Recent changes patrol' },
		'chatmoderator': { u:'Spy', link:'Jacksmith Wiki:Chat moderators' },
		'rollback': { u:'Mage', link:'Jacksmith Wiki:Rollback' },
		'sysop': { u:'Blacksmith', link:'Jacksmith Wiki:Administrators' },
		'bureaucrat': {  u:'Elector', f:'Electress', link:'Jacksmith Wiki:Bureaucrats' },
		'retired bureaucrat': { u:'Retired Elector', link:'Jacksmith Wiki:Bureaucrats' },
		'lead bureaucrat': { u:'Lead Elector', f:'Lead Electress', link:'Jacksmith Wiki:Bureaucrats' },
		'bureaucrat hand': { u:'Hand of the Electors', f:'Hand of the Electresses', link:'Jacksmith Wiki:Bureaucrats' },
		'social media manager': { u:'Social Geek', f:'Social Butterfly', link:'Jacksmith Wiki:Social Media Manager' },
                'architect': { u:'Architect', link:'Jacksmith Wiki:Architects' },
                'whipmaster': { u:'WhipMaster', f:'Dominatrix', link:'Jacksmith Wiki:WhipMasters' },
                'lead whipmaster': { u:'Supreme WhipMaster', f:'Supreme Dominatrix', link:'Jacksmith Wiki:WhipMasters' },
                'drill instructor': { u:'Drill Instructor', link:'Jacksmith Wiki:WhipMasters' },
		'founder': { link:'w:Help:Founders' },
		'bot': { u:'Spirit', link:'Jacksmith Wiki:Bots' },
		'bot-global': { link:'Jacksmith Wiki:Bot-global' },
		'checkuser': { link:'w:help:checkuser' },
		'checkuser-global': { u:'Global Checkuser', link:'w:help:checkuser' },
		'authenticated': { link:'Jacksmith Wiki:Authenticated' },
		'wikiastars': { link:'homepage:Stars' },
		'util': { link:'Help:User_access_levels#Utilites' },
		'council': { link:'w:Help:Community Council' },
		'vstf': { link:'w:Help:VSTF' },
		'helper': { link:'w:Help:Helpers' },
		'adminmentor': { link:'w:Admin Support:Main Page' },
		'staff': { link:'w:Community Central:Staff' },
		'inactive': { link:'Special:ActiveUsers' },
		'nonuser': { link:'Special:ActiveUsers' },
		'newuser': { link:'Jacksmith Wiki:Users' },
		'notautoconfirmed': { link:'Jacksmith Wiki:Users' },
		'bannedfromchat': { link:'Jacksmith Wiki:Chat' },
		'blocked': { link:'Jacksmith Wiki:Policies' }
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
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'checkuser', 'checkuser-global', 'util', 'architect', 'whipmaster']; // add corresponding tags to users
// adding tags to users
UserTagsJS.modules.custom = {
//	'somebody': ['inactive'], // Force inactive group instead of relying on the inactive module
	'Nukes88': ['founder', 'retired bureaucrat'],
        'Brooke Gonzales': ['patroller', 'bureaucrat hand', 'lead whipmaster'], // Add patroller
        'ViviannaCoffee': ['lead bureaucrat'], // Add lead bureaucrat
        'Sophia McLaren-Cobb': ['social media manager'] //Add social butterfly
         
};
// removing tags to users
UserTagsJS.modules.userfilter = {
//	'somebody': ['inactive'], // 'somebody' is never marked as inactive, even when he is
        'Brooke Gonzales': ['sysop', 'inactive'], // Remove admin and inactive tags from [[User:Brooke Gonzales]]
        'Sophia McLaren-Cobb': ['sysop'], // Remove admin tag from [[User:Sophia McLaren-Cobb]]
        'ViviannaCoffee': ['sysop', 'inactive'] // Remove admin and inactive tags from [[User:ViviannaCoffee]]
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



/* FastDelete settings */
var fdButtons = [];

fdButtons[fdButtons.length] = {
	'summary': 'Spam',
	'label': 'Spam'
};

fdButtons[fdButtons.length] = {
  'summary': '[[Help:Vandalism|Vandalism]]',
  'label': 'Vandalism'
};

fdButtons[fdButtons.length] = {
  'summary': 'Housekeeping',
  'label': 'Clean-up'
};

fdButtons[fdButtons.length] = {
  'summary': 'Inappropriate content',
  'label': 'Content'
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
        "MediaWiki:Common.js/displayClock.js",          //UTC Clock
        "MediaWiki:Common.js/EditGreeting.js",          //Edit greeting button
        "MediaWiki:Common.js/ShowHide.js",              //From dev
        "MediaWiki:Common.js/standardeditsummaries.js", //From runescape
        "MediaWiki:Common.js/extraRollbacks.js",        //Add extra rollback buttons
        "MediaWiki:Common.js/CEB.js",                   //Add custom edit buttons
        "MediaWiki:Common.js/popupsNav.js",
        "MediaWiki:Common.js/profileRedesign.js",
        "w:c:dev:LockOldBlogs/code.js",                 //Disables commenting on old blogs
        "w:c:dev:Countdown/code.js",                    //Countdown timer
        "w:c:dev:UserTags/code.js",                     //Inactive tag + UserBadges + more new functions
        "w:c:dev:FastDelete/code.js",                   //FastDelete
        "w:c:dev:RevealAnonIP/code.js",                 //Reveals anon IPs
        "w:c:dev:User Rights Reasons Dropdown/code.js", //Adds dropdown menu for Special:UserRights
        "w:c:dev:SignatureCheck/code.js"
    ]
});

/* Change chat description
 * First seen (aka borrowed) at my little pony wiki
 */

function changeChatDesc() {
try {
if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
$('p.chat-name').html(''+chatDesc+'');
setTimeout("changeChatDesc()", 200);
}
 
}catch (err){
setTimeout("changeChatDesc()", 200);
}
};
 
$(document).ready(function (){changeChatDesc()});
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