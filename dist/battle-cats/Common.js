/* Any JavaScript here will be loaded for all users on every page load. */

// bypass error, remove this if you want to check console


/* auto-refresh in WikiaActivity and RecentChanges */
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('MediaWiki:AjaxRC/code.js', 'dev');
/* end auto-refresh */

/* add a "back to top" button on the right corner */
importScriptPage('BackToTopButton/code.js', 'dev');
/* end back to top */

/* shows if an user is inactive in their profile */
importScriptPage('InactiveUsers/code.js', 'dev');
/* end inactive */