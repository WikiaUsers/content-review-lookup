importScriptPage('AjaxRC/code.js', 'dev');
 
importScript('MediaWiki:Wikia.js/userRightsIcons.js');

AjaxRCRefreshText = 'Auto-refresh';  
AjaxRCRefreshHoverText = 'Automatically refresh the page';  
var ajaxPages =["Special:RecentChanges", "Special:WikiActivity"];
 
importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});