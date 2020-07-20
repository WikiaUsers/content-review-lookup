/* Any JavaScript here will be loaded for all users on every page load. */

/* Auto Refresh */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

//* Duplicate Image Search *//
importScriptPage('DupImageList/code.js', 'dev');

/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');
 
importScriptPage('CollapsibleInfobox/code.js', 'dev');