/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage( 'AjaxRC/code.js', 'dev' );
var ajaxPages = ["Special:WikiActivity"];
var AjaxRCRefreshText = 'Auto-Refresh';
 
importScriptPage('BackToTopButton/code.js', 'dev');
 
importScriptPage('OasisToolbarButtons/code.js', 'dev');
 
importScriptPage('AutoEditDropdown/code.js', 'dev');

importScriptPage('SearchGoButton/code.js', 'dev');
 
PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');
 
/* Add UTC clock above articles */
importScript('MediaWiki:Common.js/displayTimer.js');
 
/** Collapsible tables *********************************************************
  */
 
importScriptPage('ShowHide/code.js', 'dev');

/*UserTags*/
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
importArticles({
	type:'script',
	articles: [
		// ...
		'w:c:dev:UserTags/code.js',
		// ...
	]
});