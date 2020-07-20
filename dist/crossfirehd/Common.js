/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
    type: 'script',
    articles: [
        //other scripts,
        'u:dev:MessageWallUserTags/code.js'
    ]
});
 
/* Auto-Refresh for Wiki Activity */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');
var ajaxPages =["Special:WikiActivity"];
 
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