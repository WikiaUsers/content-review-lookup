//message block config
var MessageBlock = {
  title : 'Blocage',
  message : '{{Blocked|$2|$1}}',
  autocheck : true
};

//lock forums config
window.LockForums = {
    expiryDays: 30,
    expiryMessage: "This forum is considered archived because it hasn\'t been commented on in over <expiryDays> days, please don\'t edit this forum post!",
    forumName: "Forum Board" 
};
 




//lock old blogs config
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog is considered archived because it hasn\'t been commented on in over <expiryDays> days,editing is no longer needed",
    nonexpiryCategory: "Never archived blogs"
};
 
 



//cache skip config
cacheSkip = [];
cacheSkipLimit = 1000;

//usertags
window.UserTagsJS = {
	modules: {},
	tags: {
		
                sysop: { link:'Project:Administrators ' },
                bot: { link:'Help:Bots' },
                bureaucrat: {link: 'Help:User_Acess_Levels#Bureaucrats' },
		
	}
};

UserTagsJS.modules.nonuser = (mediaWiki.config.get('skin') === 'monobook');

UserTagsJS.modules.isblocked = true;
 
UserTagsJS.modules.mwGroups = ['bot', 'bot-global', 'rollback', 'bureaucrat',];


UserTagsJS.modules.inactive = {
	days: 60,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
};

UserTagsJS.modules.metafilter = {
	'rollback': ['sysop'],
};

UserTagsJS.modules.userfilter = {
	'Rider ranger47': ['inactive']
};

//message wall usertags
window.MessageWallUserTags = {
    tagColor: '#DF0174',
    glow: false,
       users: {
        'LovelyLies': 'Founder',
        'Fearless_Diva': 'Admin'
    }
};

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
 
 
 
/* add history to the dropdown menu for pages - 2/1/11 */
function HistoryDropdownMenuItem() {
	$('ul.wikia-menu-button li:first-child ul li:first-child').after('<li><a href="/index.php?title='+ encodeURIComponent (wgPageName) +'&action=history">History</a></li>');
}
 
addOnloadHook(HistoryDropdownMenuItem);

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat', 'chatmoderator', ]
};
 
//imports
importArticles({
    type: "script",
    articles: [
        "u:dev:LockForums/code.js" ,
        'u:dev:DisableBotMessageWalls/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'w:c:dev:MessageWallUserTags/code.js',
        'u:dev:Standard_Edit_Summary/code.js',
        'w:c:dev:UserTags/code.js',
        'u:dev:CacheCheck/code.js',
        "w:c:dev:LockOldBlogs/code.js",
        'u:dev:FixWantedFiles/code.js', 
        'w:dev:WallGreetingButton/code.js',
        'w:c:dev:ReferencePopups/code.js',
        'u:dev:BackToTopButton/code.js',
         'u:dev:AjaxRC/code.js',
        'u:dev:DisplayClock/code.js',
        'w:c:dev:SignatureCheck/code.js',
        'w:c:dev:VisualSpellCheck/code.js',
        'u:dev:MessageBlock/code.js',
        'u:dev:UnsafeScripts/code.js',
        'w:c:dev:AntiUnicruft/code.js',
        "w:c:dev:ArchiveBoards/code.js",
        'u:admintools:MediaWiki:Common.js/profileRedesign.js',
        'u:admintools:MediaWiki:Common.js/sitenotice.js',
        'u:admintools:MediaWiki:Common.js/extraRollbacks.js',
        'u:admintools:MediaWiki:Common.js/ajaxRollback.js',
        'u:admintools:MediaWiki:Common.js/SvgToPng.js',
    ]
});