/* Any JavaScript here will be loaded for all users on every page load. */
/* Add timer to nav bar */
importScriptPage('MediaWiki:Common.js/displayTimer.js');

/* Auto updating recent changes opt-in */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');