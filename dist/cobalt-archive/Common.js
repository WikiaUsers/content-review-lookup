/* Any JavaScript here will be loaded for all users on every page load. */
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity','Special:Log'];
var AjaxRCRefreshText = 'Auto-refresh';
importScript('MediaWiki:Common.js/ajaxRefresh.js');
// END of ajax auto-refresh
 
// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries
 
// FastDelete Buttons for Administrators
importScript('MediaWiki:Common.js/fastDelete.js');
// END FastDelete Buttons for Administrators
 
//DupImageList
importScriptPage('DupImageList/code.js', 'dev');
//END DupImageList
 
//A few extra links in the "On the Wiki" tab
$(document).ready(function() {
 $('.WikiHeaderRestyle > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="/wiki/Category:Videos">Videos</a></li><li><a class="subnav-2a" href="/wiki/Special:Recentchanges">Recent Changes</a></li>');
});

/* Any JavaScript here will be loaded for all users on every page load. */

// All imported scripts
importArticles({
	type: 'script',
	articles: [
		'u:dev:DisplayClock/code.js',
		'u:dev:AjaxRC/code.js',
		'u:dev:MessageBlock/code.js',
		'u:dev:BackToTopButton/code.js'
	]
});