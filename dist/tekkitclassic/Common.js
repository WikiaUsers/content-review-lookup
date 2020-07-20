/* Any JavaScript here will be loaded for all users on every page load. */

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions : ['user']
};

importArticles({
	type:'script',
	articles: [
		"w:c:dev:RevealAnonIP/code.js",   // adding RevealAnonIP/code.js to the array
		'w:c:dev:UserTags/code.min.js'
	]
});

importScriptPage('AjaxRC/code.js', 'dev');
ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Message Wall:MinecraftRogue", "User blog:MinecraftRogue/Auto Update Blog"]
var ajaxRefresh = 30000;
var AjaxRCRefreshText = 'Auto-refresh';

importScriptPage('ShowHide/code.js', 'dev');