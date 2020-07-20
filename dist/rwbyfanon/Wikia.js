importScriptPage('AjaxBatchDelete/code.js', 'dev');
 
// Auto-refresh Special:RecentActivity
 
AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page every minute';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];

//Snow
importScriptPage('MediaWiki:Snow.js','c');