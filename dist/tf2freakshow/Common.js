/* Any JavaScript here will be loaded for all users on every page load. */

importScriptPage('Standard_Edit_Summary/code.js', 'dev');

// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];