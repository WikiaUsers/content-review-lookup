// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
var ajaxRefresh = 10000;