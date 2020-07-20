var	ajaxIndicator = ajaxIndicator || 'https://images.wikia.nocookie.net/__cb20100617104236/dev/images/d/de/Ajax-loader.gif',
	ajaxTimer,
	ajaxRefresh = 30000,
	refreshText = 'Refresh',
	refreshHover = 'Check to automatically refresh the content of the page',
	doRefresh = true;
 
if ( !window.ajaxPages ) {
	var ajaxPages = [ 'Special:RecentChanges', 'Special:Log', 'Special:WikiActivity', 'Special:WikiActivity/activity', 'Special:WikiActivity/watchlist' ];
}
if ( !window.ajaxCallAgain ) {
	var ajaxCallAgain = [];
}
if( typeof AjaxRCRefreshText == "string" ) {
	refreshText = AjaxRCRefreshText;
}
if( typeof AjaxRCRefreshHoverText == "string" ) {
	refreshHover = AjaxRCRefreshHoverText;
}
 
importScriptPage('AjaxRC/code.js', 'dev');