/* Any JavaScript here will be loaded for all users on every page load. */

var PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');

UserTagsJS.modules.inactive = {
	days: 30,
	namespaces: [0],
	zeroIsInactive: true // 0 article edits = inactive
}
 
/* Auto-Refresh in Recent Changes */
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Watchlist", "Log", "Contributions"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb1468579810/common/skins/common/images/ajax.gif';
window.ajaxRefresh = 30000;
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});

/* Back to top button */
importScriptPage('BackToTopButton/code.js', 'dev');
 
/* Spoilers */
SpoilerAlert = {
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('Spoiler');
    }
};
importScriptPage('SpoilerAlert/code.js', 'dev');
 
/* Admin List */
importScriptPage('ListAdmins/code.js', 'dev');
 
/* Collapsible Tables */
importScriptPage('ShowHide/code.js', 'dev');
 
/* Collapsible Infobox */
importScriptPage('CollapsibleInfobox/code.js', 'dev'); 
 
/* Adds Purge button */
var PurgeButtonText = 'Refresh';
importScriptPage('PurgeButton/code.js', 'dev');
 
/* Display Clock */
importArticles({
	type: 'style',
	articles: [
		'u:dev:MediaWiki:TZclock.css'
	]
}, {
	type: 'script',
	articles: [
		'u:dev:TZclock.js'
	]
});