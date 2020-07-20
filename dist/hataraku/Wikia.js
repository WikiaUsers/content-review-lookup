AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
importScriptPage('AjaxRC/code.js', 'dev');  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];

importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

nullEditDelay = 1000;
importScriptPage('MassNullEdit/code.js', 'dev');