importScriptPage('MediaWiki:AddRailModule/code.js', 'dev');

//************
//Auto Refresh
//************
 
var ajaxPages = ["Special:RecentChanges", "Special:Log", "Special:Contributions", "Special:WikiActivity"];
var AjaxRCRefreshText = 'Auto-refresh';
importScriptPage('AjaxRC/code.js', 'dev');
 
//****************
//End Auto Refresh
//****************