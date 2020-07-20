/********************************************************************************/
/***** Any JavaScript Here Will Be Loaded For Users Using The MonoBook Skin *****/
/********************************************************************************/
 
/*******************/
/***** Imports *****/
/*******************/
 
/* Auto Refresh */
importScriptPage('AjaxRC/code.js', 'dev');
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 
/* Collapsible */
importScriptPage('ShowHide/code.js', 'dev');
 
/* Reveal Anonymous IP */
importScriptPage('RevealAnonIP/code.js', 'dev');
 
/* Reference Pop Ups */
importScriptPage('ReferencePopups/code.js', 'dev');
 
/* InactiveUsers */
importScriptPage('InactiveUsers/code.js', 'dev');

/*****************/
/***** Local *****/
/*****************/
 
/* DisplayTimer */
importScriptPage('MediaWiki:DisplayTimer.js');
 
/* Toggle */
importScriptPage('MediaWiki:Toggle.js');
 
/* Preload */
importScriptPage('MediaWiki:Preload.js');