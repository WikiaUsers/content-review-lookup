/* Any JavaScript here will be loaded for all users on every page load. */

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
};
})();

/* add contribs to user menu - 2/1/11 */
 
function UserContribsMenuItem() {
	$('ul.AccountNavigation li:first-child ul.subnav li:first-child').after('<li><a href="/wiki/Special:Contributions/'+ encodeURIComponent (wgUserName) +'">My contributions</a></li>');
}
 
addOnloadHook(UserContribsMenuItem);
 
/* add history to the dropdown menu for pages - 2/1/11 */
function HistoryDropdownMenuItem() {
	$('ul.wikia-menu-button li:first-child ul li:first-child').after('<li><a href="/index.php?title='+ encodeURIComponent (wgPageName) +'&action=history">History</a></li>');
}

//ajax rc config
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];

//lock forums config 
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This forum is considered archived because it hasn\'t been commented on in over <expiryDays> days.",
    forumName: "Forum Board" 
};

//lock old blogs config
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days.",
    nonexpiryCategory: "Never archived blogs"
};

//Usertags config
window.UserTagsJS = {
	modules: {},
	tags: {
sysop: { link:'Project:Administrators ' },
bot: { link:'Help:Bots' },
}
};
UserTagsJS.modules.isblocked = true;
 
UserTagsJS.modules.mwGroups = ['bot', 'bot-global', 'rollback'];
 
UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: true
};
UserTagsJS.modules.metafilter = {
	'rollback': ['sysop'],
};
UserTagsJS.modules.autoconfirmed = true;
 
UserTagsJS.modules.userfilter = {
	'Rider ranger47': ['inactive'], // User is *never* inactive
 
};

//Message wall usertags config
window.MessageWallUserTags = {
    tagColor: 'red',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'KCCreations': 'Admin',
    }
};

window.importArticles( {
    type: 'script',
    articles: [
 
       
        'u:dev:LockOldBlogs/code.js',
       'u:dev:MessageWallUserTags/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:UserTags/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:BackToTopButton/code.js',
        "w:c:dev:LockForums/code.js",
        'u:dev:AjaxRC/code.js',
        'u:dev:DisplayClock/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'u:admintools:MediaWiki:Common.js/SvgToPng.js',

    ]
} );