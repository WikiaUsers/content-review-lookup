/* Inactive users get an "inactive" tag on their profile headers */
InactiveUsers = {months: 1};
importScriptPage('InactiveUsers/code.js', 'dev');
 
/* Auto-refreshing recent changes */
ajaxPages = ["Special:WikiActivity","Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
importScriptPage('AjaxRC/code.js', 'dev');