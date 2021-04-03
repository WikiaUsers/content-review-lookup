/* Any JavaScript here will be loaded for all users on every page load. */

//**Custom user tags**//
window.UserTagsJS = {
	modules: {},
	tags: {
		// FORMAT= groupe: { tag }
		'founder': { u:'Founder', title: 'This user is the founder of the wiki.', order:0},
		'bureaucrat': { link:'Project:Admins and Mods', title: 'This user is an bureaucrat.', order:-1/0},
		'sysop': { link:'Project:Admins and Mods', title: 'This user is an administrator.', order:-2/0},
		'chatmoderator': { link:'Project:Admins and Mods', title: 'This user is a chat moderator.', order:-1/0},
		'rollback': { link:'Special:ListUsers/rollback', title: 'This user has rollback privileges.', order:-1/0},
		'verified': { u:'Verified', title: 'This user is a verified member of the staff producing the show.'},
	}
};
UserTagsJS.modules.custom = {
	'DJSponge': ['founder'], // Add Founder to DJSponge
	'TTGcrew': ['verified'], // Add Verified to TTGcrew
};
UserTagsJS.modules.mwGroups = ['rollback']; // Add rollback group to Rollbacks
UserTagsJS.modules.metafilter = {
	'rollback': ['sysop', 'chatmoderator'],  // Remove rollback from Sysops/Mods
    'chatmoderator': ['sysop'],              // Remove chat moderator from admin
    'threadmoderator': ['sysop']             // Remove DisMod from admin
};

//**End custom user tags**//

//**Lock blog posts**//
window.LockOldBlogs = {
    expiryDays: 60,
    expiryMessage: "This blog hasn\'t been commented on for over <expiryDays> days. There is no need to comment." ,
    nonexpiryCategory: "Never archived blogs"
};
 
//**End lock blog posts**// 

if (wgUserName != 'null') {
	$('.insertusername').html(wgUserName);
}

//**LastEdited**//
window.lastEdited = {
    avatar: true,
    size: false,
    diff: true,
    comment: false,
    time: 'timestamp',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};

//**End LastEdited**//

//**AjaxRC**//
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-refresh';

//**AjaxRC**//

//**MessageBlock**//
var MessageBlock = {
  title : 'Block',
  message : 'This username has been blocked from Teen Titans Go! Wiki for $2 for the given reason(s) of: <u>$1</u>',
  autocheck : false
};

//**MessageBlock**//

importArticles({
    type: "script",
    articles: [
        'u:dev:MediaWiki:LastEdited/code.js',           //**last edited- UCP OK**//
        'u:dev:MediaWiki:AjaxRC/code.js',               //**Auto-refresh- UCP OK**//
        'u:dev:MediaWiki:Countdown/code.js',            //**Creates countdown clock- UCP OK**//
        'u:dev:MediaWiki:BackToTopButton/code.js',      //**Back to top of page- UCP OK**//
        'u:dev:MediaWiki:MassProtect/code.js',          //**Mass protect articles- UCP OK**//
        'u:dev:MediaWiki:ListFiles/code.js'             //**List files- UCP OK**//
        'u:dev:MediaWiki:WallGreeting.js',              //**NEW WallGreeting in beta- UCP OK**//
        'u:dev:MediaWiki:MessageBlock/code.js',         //**Send message to blocked user- UCP OK**//
        'u:dev:MediaWiki:MassProtect/code.js',          //**Mass protect articles- UCP OK**//
        'u:dev:MediaWiki:ReferencePopups/code.js',      //**References popup- UCP Partial**//
        'u:dev:MediaWiki:UserTags/code.js',             //**Custom usertags- UCP Broken**//
        'u:dev:MediaWiki:LockOldBlogs/code.js',         //**Lock blog posts- UCP Broken**//
        'u:dev:MediaWiki:Standard_Edit_Summary/code.js',     //**Standard edit summaries- Broken**//
    ]
});