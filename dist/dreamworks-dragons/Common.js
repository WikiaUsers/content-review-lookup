/* lockfourms config */

window.LockForums = {
    expiryDays: 60,
    expiryMessage: "This forum has been automatically archived because its most recent comment is over <expiryDays> days old.",
    warningDays: 30,
    warningMessage: "This forum is now <actualDays> days old; out of courtesy to your fellow Wikians, please do not comment unless it is absolutely necessary. This forum will archive automatically when the last comment is <expiryDays> days old.",
    banners: true,
    ignoreDeletes: true,
    warningPopup: true,
    warningPopupMessage: "By posting on an old forum you may be filling up the e-mail boxes of many people who are still following this topic. Are you sure you want to do this?"

};
 
/* message wallusertags config */
window.MessageWallUserTags = {
    tagColor: 'blue',
    glow: true,
    glowSize: '15px',
    glowColor: '#f77',
    users: {
        'username': 'usergroup',
        'SirSkrill': 'Admin',
        'Station7': 'Admin',
        'Toothless_the_Nightfury': 'Admin',
        'Evilfeline': 'Admin',
        'Kyurem147' : 'Admin',
        'Rider_ranger47' : 'Admin',
        'Dragondude45' : 'Chat Moderator',
    }
};
 


/* lock old blogs config */

window.LockOldBlogs = {
    expiryDays: 70,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days, IF you are the creator of this blog post and would like it re-opened,contact the admin Rider ranger47.",
    nonexpiryCategory: "User_blog:Dragondude45/Dragons_comic"
};
 
 


/* usertags config */
 
 
window.UserTagsJS = {
	modules: {},
	tags: {
}
};

UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

UserTagsJS.modules.isblocked = true;
 
UserTagsJS.modules.mwGroups = ['bot', 'bot-global', 'rollback', sysop];

UserTagsJS.modules.metafilter = {
	'rollback': ['sysop'],
};

/* imports */


 
importArticles({
    type: "script",
    articles: [
        "u:dev:LockForums/code.js" ,
        'u:dev:DisableBotMessageWalls/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'w:c:dev:MessageWallUserTags/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'u:dev:YoutubePlayer/code.js',
        "w:c:dev:LockOldBlogs/code.js",
        'u:dev:AjaxRC/code.js',
        'w:dev:WallGreetingButton/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:BackToTopButton/code.js',
        'w:c:dev:UserTags/code.js',
        
    ]
});


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
 
addOnloadHook(HistoryDropdownMenuItem);


// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'chatmoderator']
};

//ajax rc config
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];