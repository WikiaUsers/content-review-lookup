/* Any JavaScript here will be loaded for all users on every page load. */

/* Automated User Pages*/ 
window.AutoCreateUserPagesConfig = {
    content: {
        2:'{{sub'+'st:MediaWiki:Welcome-user-page}}',
        3:false,
        1202:false
    },
    summary:'Automatic Creation'
};

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/Protection.js",
		"MediaWiki:Common.js/AOTM.js",
		"MediaWiki:Common.js/Walkthrough.js",
		"MediaWiki:Common.js/Usernames.js",
		"MediaWiki:Common.js/WikiNotification.js",
		"u:dev:MediaWiki:AutoCreateUserPages.js"
    ]
});

/*AjaxRC (Auto Refresh)*/
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automtaically refreshes the page when new edits occur.';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
	"Special:SocialActivity",
    "Special:Log",
    "Special:NewFiles",
    "Special:Videos",
    "Special:Images"
];

/*Remove Edit Wall Greeting Button if not your greeting*/
$(function() {
var interval = setInterval(function() {
	  if ($('.MessageWallButtons').length) {
	      clearInterval(interval);
		var username = mw.config.get('wgUserName');
		var page = mw.config.get('wgTitle');
		if (page != username) {
			$('.MessageWallButtons').remove();
		}
    }
}, 10);
});

/*Inactive User Tag*/
InactiveUsers = { 
    months: 2,
    text: 'Inactive'
};