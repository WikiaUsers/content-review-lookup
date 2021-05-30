/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre> */

/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Taken from Wikipedia's Common.js.
  */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    	};
	})();
}
 
/* JS imports */
importArticles({
    type: 'script',
    articles: [
        'User:Mroosa/js/Popups.js'
    ]
});
 
/* Spoilers */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};

/* User Tags */
// User Tags
window.UserTagsJS = {
	modules: {
			inactive: 90,
			mwGroups: ['bureaucrat', 'chatmoderator', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: false,
			metafilter: {
				sysop: ['bureaucrat'],
				chatmoderator: ['sysop'],
				rollback: ['sysop'],
			},
			newuser: true,},
tags: {		}
};

UserTagsJS.modules.custom = {
	'ConTraZ VII': ['sysop'],
	'Irv1n3': ['sysop', 'bureaucrat'],
	'Mroosa': ['sysop'],
	'TheNeXusCore': ['sysop', 'bureaucrat'],
	'Yong_feng': ['sysop', 'bureaucrat'],
	'HEADSHOTDEALER': ['sysop'],
};

UserTagsJS.modules.userfilter = {
};

UserTagsJS.modules.mwGroups = ['bureaucrat,sysop']; 
UserTagsJS.modules.mwGroups = ['rollback'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

window.MessageWallUserTags = {
    tagColor: '#000000',
    users: {
        'username': 'usergroup',
        'Mroosa': 'Admin',
        'ConTraZ_VII': 'Admin',
        'Irv1n3': 'Inactive Bureaucrat',
        'TheNeXusCore': 'Bureaucrat',
        'Yong_feng': 'Bureaucrat',
        'Wuzh': 'Bureaucrat',
        'Elite_Abyssal': 'Bureaucrat',
        'GameZone1': 'Admin',
        'HEADSHOTDEALER': 'Admin',
    }
};
 
//Auto Message Blocked
var MessageBlock = {
  title : 'Block.',
  message : 'You have been blocked for $2 for the following reason(s): "$1"',
  autocheck : false
};