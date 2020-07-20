/********************************/
/* Auto-refresh by wikiactivity */
/********************************/
 
var	ajaxIndicator = ajaxIndicator || 'https://images.wikia.nocookie.net/__cb20100617113125/dev/images/e/e4/3D_throbber.gif',
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
	months: 2
};
importScriptPage('InactiveUsers/code.js', 'dev');
 
 
/****************************************************************************/
/* Adds various links and buttons to Oasis' UI; removed 'move' for TGP wiki */
/****************************************************************************/
 
window.AdvancedOasisUI = {
      accountNavFollowedPages: false,
      accountNavWatchlist: false,
      categoryRedlink: false,
      RCHeader: true,
      randomPageLimitedTo: '',
      userLang: true,
};
importScriptPage('User:Sunriseondarkenedseas/AdvancedOasis.js', 'musicalworld');
 
 
/******************************/
/* No anonymous anons anymore */
/******************************/
 
window.RevealAnonIP = {
    permissions : ['rollback', 'sysop', 'bureaucrat']
};
importScriptPage('RevealAnonIP/code.js', 'dev');
 
 
/******************/
/* Easy archiving */
/******************/
 
var ArchiveToolConfig = { 
   archiveListTemplate: 'Archives',
   archivePageTemplate: 'Archivepage',
   archiveSubpage: 'Archive',
   userLang: true
};
importScriptPage('ArchiveTool/code.js', 'dev');