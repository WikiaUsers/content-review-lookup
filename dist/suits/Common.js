/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
	type: "script",
	articles: [
		"w:dev:ShowHide/code.js", /* Collapsible elements and tables */
                "w:dev:Countdown/code.js", /* Countdown clock */
                "w:dev:ReferencePopups/code.js", /* Reference Popups */
                "MediaWiki:Common.js/youtube.js", /* Youtube template */
	]
});

/* Auto-refreshing recent changes */
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');