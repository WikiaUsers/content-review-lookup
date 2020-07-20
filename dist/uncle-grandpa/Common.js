
/************* General functions *************/

/* Search bar text */
$('.WikiaSearch input[type="text"]').attr('placeholder', 'Good Morning!');

 /* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
 })();

function getElementsByClass (node, className, tagName) {
	if (node.getElementsByClassName && (tagName === undefined || tagName === null || tagName === '*')) return node.getElementsByClassName(className);
	var list = node.getElementsByTagName(tagName?tagName:'*');
	var array = new Array();
	var i = 0;
	for (i in list) {
		if (hasClass(list[i], className))
			array.push(list[i]);
	 }
	return array;
 }

/* Creates the method getElementsByClass, if unsupported from the browser */
if(!document.getElementsByClass) document.getElementsByClass = function(className) {
	return getElementsByClass(document, className, '*');
};

function getElementsByName (name, root) {
 if (root === undefined) root = document;
 var e = root.getElementsByTagName('*');
 var r = new Array();
 for (var i = 0; i < e.length; i++) {
	if (e[i].getAttribute('name') === name) r[r.length] = e[i];
 }
 return r;
}


/************ Script imports ************/

/*** Config area —
 * All configuration for imported scripts must go here, above importArticles().
 ***/

/* AjaxRC config */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];

/* SpoilerAlert config */
// Note: For this script to work you must add <span class="spoiler"></span> to any pages with spoilers
//       A template can be used for this by adding the above span on a template page
SpoilerAlert = {
    isSpoiler: function () {
        return Boolean($('.spoiler').length);
    }
};

/* MessageWallUserTags config */
window.MessageWallUserTags = {
    tagColor: '#08f',
    glow: true,
    glowSize: '10px',
    glowColor: '#fff',
    users: {
        'Mother-zombie'  : 'Bureaucrat • Admin',
        'Mr.Rig_and_Zig' : 'Admin',
        'Starkiller131'  : 'Admin',
        'RyaNayR'        : 'Admin/Coder',
        'Crossovers'     : 'Admin • Cartoonanic (Cartoon Manic)'
        'Piggy Tales'    : 'Admin',
    };
});


/*** importArticles() function —
 * All imported scripts should go here.
 * The importScriptPage() function is deprecated and inefficient and should not be used.
 ***/
importArticles({
    type: 'script',
    articles: [
        'u:dev:AjaxRC/code.js',             // Auto updating recent changes opt-in – See w:c:dev:AjaxRC for info & attribution
        'u:dev:DisableArchiveEdit/code.js', // DisableArchiveEdit – Discourages/disables the editing of talk page archives – By [[User:Porter21]]
        'u:dev:PurgeButton/code.js',        // Adds "purge" option to page controls – See w:c:dev:PurgeButton for info & attribution
        'u:dev:SpoilerAlert/code.js',       // Hides the content area of a page and displays a spoiler alert – See w:c:dev:SpoilerAlert for info & attribution
        'u:dev:HeaderLinks/code.js',
        'u:dev:UserTags/code.js', //Customizes user tags.
        'MediaWiki:CollapsibleTables.js',
        'MediaWiki:CountdownTimer.js',
        'MediaWiki:Toggler.js',
        'MediaWiki:SpecialRandom.js',
        'MediaWiki:UserNameReplace.js',
        'MediaWiki:MessageWallUserTags.js' // Admin tags for names on MessageWall posts
        'u:dev:DisplayClock/code.js',
        'u:dev:FloatingToc/code.js',
        'u:dev:Quiz/code.js',
        'u:dev:Countdown/code.js',          //Countdowns.
        'u:dev:AdminDashboard JS-Button/code.js' //A JS button is added to the Admin Dashboard.
    ]
});

/* User Tags sec. 1*/
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
        patroller: {
            link: 'Special:ListUsers/patroller'
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
            'patroller',
            'bot',
            'imagecontrol'
        ],
        newuser: true
    }
};
 
/* User Tags sec. 2 */
 
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
		founder: { u:'Founder', order: -1/0 },
		bureaucrat: { u:'Bureaucrat', order: -1/0 },
		adopter: { u:'Wiki Adopter', link:'User:Mother-zombie', order: -1/0 },
		usermonth: { u:'User of the Month', order: -1/0 },
		vstf: { u:'VSTF', order: -1/0 },
		staff: { u:'Staff', order: -1/0 },
		councilor: 'Councilor',
		assistant: 'Assistant',
		permdisabled: 'Permanantly Disabled Account'
	}
};
 
UserTagsJS.modules.custom = {
    '17Nanorobin': ['founder'],
    'Mother-zombe': ['adopter'],
	'Crossovers': ['sysop']
};
 
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'bannedfromchat', 'bot', 'bot-global', 'assistant', 'moderator'];


/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */