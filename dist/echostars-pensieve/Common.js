AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity","Special:BlockList"]
importScriptPage('AjaxRC/code.js', 'dev');
/* Adds "purge" option to page controls

* See w:c:dev:PurgeButton for info & attribution
*/



importScriptPage('PurgeButton/code.js', 'dev');


/* Any JavaScript here will be loaded for all users on every page load. */