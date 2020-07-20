/********************************/
/* Auto-refresh by wikiactivity */
/********************************/
 
var	ajaxIndicator = ajaxIndicator || 'https://images.wikia.nocookie.net/__cb20120926174803/dev/images/8/82/Facebook_throbber.gif',
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
 
 
/******************/
/* Inactive Users */
/******************/
 
InactiveUsers = { 
	months: 1
};
importScriptPage('InactiveUsers/code.js', 'dev');
 

/******************************/
/* No anonymous anons anymore */
/******************************/
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');