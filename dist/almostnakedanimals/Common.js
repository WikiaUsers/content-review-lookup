/* Search bar text */
$('.WikiaSearch input[type="text"]').attr('placeholder', 'Welcome to the Banana Cabana!');

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
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});

/* MessageWallUserTags config */
window.MessageWallUserTags = {
    tagColor: '#BDB',
    glow: true,
    glowSize: '10px',
    glowColor: '#fff',
    users: {
        'Crossovers'   : 'Owner • Bureaucrat • Admin • Rollback • Chatmod',
        'Boyariffic'   : 'Bureaucrat • Admin • Rollback • Chatmod',
        'Mother-zombie': 'Admin • Rollback • Chatmod',
        'RRabbit42'    : 'Cross-wiki helper • Admin • Bureaucrat • Rollback • Chatmod'
    }
};


window.UserTagsJS = {
	modules: {},
	tags: {
                howie: { u: 'Hotel Manager', order: 100 },
		octo: { u: 'Octopus CEO', order: 101 },
		duck: { u: 'Handy Duck', order: 102 },
		bureaucrat: { order: 1 }
        }
};
UserTagsJS.modules.custom = {
	'Crossovers': ['Hotel Manager', 'Octopus CEO', 'Handy Duck'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/ Display 12 hour time followed by day, month (English, full name)
// and year with "(UTC)" at the end
window.DisplayClockJS = '%2I:%2M:%2S %p %2d %{January;Febuary;March;April;May;June;July;August;September;October;November;December}m %Y (UTC)';

importArticles({
    type: "script",
    articles: [
        // ...
        "w:c:dev:Countdown/code.js",
        'u:dev:AjaxRC/code.js',             // Auto updating recent changes opt-in – See w:c:dev:AjaxRC for info & attribution
        'u:dev:DisableArchiveEdit/code.js', // DisableArchiveEdit – Discourages/disables the editing of talk page archives – By      [[User:Porter21]]
        'u:dev:PurgeButton/code.js',        // Adds "purge" option to page controls – See w:c:dev:PurgeButton for info & attribution
        'u:dev:SpoilerAlert/code.js',       // Hides the content area of a page and displays a spoiler alert – See w:c:dev:SpoilerAlert for info & attribution
        'u:dev:DisplayClock/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:MessageWallUserTags/code.js',
        'u:dev:Quiz/code.js',
        'u:dev:DisplayClock/code.js',
        'BackToTopButton/code.js',
        'u:dev:FloatingToc/code.js'
        // ...
    ]
});

var quizName = "The Almost Naked Quiz";
var quizLang = "en";
var resultsTextArray = [
      "You need to watch more Almost Naked Animals!",
      "Not bad. You have a decent knowledge of  Almost Naked Animals.",
      "You are a Almost Naked Animals expert!"
       ];
var questions = [
 
       ["Who is the most liked character by the Almost Naked Animals fanbase?",
       "Duck",
       "Octo",
       "Bunny",
       "Howie"],
 
       ["How is Howie related to Poodle?",
       "They are siblings.",
       "They are rivals.",
       "They met while building their hotels.",
       "They are business partners."],
 
       ["Who is the owner of the Banana Cabana?",
       "Howie",
       "Bunny",
       "Duck",
       "Octo"],
 
       ["What was the first episode of Almost Naked Animals?",
       "It's My Party",
       "Gone Banana",
       "It's Duck's Party",
       "Home for the Howiedays"],
 
       ["Where is the Banana Cabana located?",
       "Banana Island",
       "Atlantic Ocean",
       "Indian Ocean",
       "In an unknown dimension"],
 
       ["Why does Duck switch between being smart and being dumb?",
       "His mind is wired weirdly",
       "To stop stress",
       "To confuse others",
       "He is wacky"],
 
        ];

// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
$(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$("#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});