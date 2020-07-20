/****************************/
/* the JS is mostly from the Dev wiki either copied over or imported Credits: Moncho,Pcj,Splarka ,Grunny from Wikia Dev (dev.wikia.com)*/
/****************************/
 
/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME. credi w:c:starwars
*/
function substUsername() {
	$('.insertusername').html(wgUserName);
}
 
addOnloadHook(function() {$('.username').html(wgUserName);});
 
/****************************/
/* IMPORTED START           */
/****************************/
 
// Extra Rollback Buttons -Thanks Monch 
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback
 
 
/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
 
/* Count-down Timer */
importScript('MediaWiki:Common.js/countdowntimer.js');
 
/* Collapsible Tables */
importScript('MediaWiki:Common.js/collapsetables.js');
 
 
/* Custom edit buttons */ 
importScript('MediaWiki:Common.js/CEB.js');
 

 
/* Display Timer */
importScript('MediaWiki:Common.js/DisplayTimer.js');
 
 
 
 
/****************************/
/* END OF THE IMPORTED     */
/****************************/
 
 
//Facebook 'Like Box'
//Graciously (and unknowingly) provided by The Spanish 'Simspedia'
 
function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=126686564044617&amp;connections=10" align="top" frameborder="0" width="300" height="250" scrolling="no" />');
}
 
$(fBox);
 
//USERNAME Template//
addOnloadHook(function() {$('.username').html(wgUserName);});
 
/* Fast Delete see below */
importScriptPage('MediaWiki:Common.js/fastDelete.js');
 
 
// *****************************************************************
// Custom automatic delete buttons 
// *****************************************************************
// Adds customizable one-click deletion buttons to any deletable page.
// Requires MediaWiki:Common.js/fastDelete.js in appendScript();
 
var fdButtons = [];
fdButtons[fdButtons.length] = {
  'summary': 'Vandalism',
  'label': 'Vandalism'};
fdButtons[fdButtons.length] = {
  'summary': 'Cleaning up old pages',
  'label': 'Clean-Up'};
fdButtons[fdButtons.length] = {
  'summary': 'Removing [[Help:Spam|Spam]] Page',
  'label': 'Spam'};
fdButtons[fdButtons.length] = {
  'summary': 'Cleaning up un-Edited  [[Help:Stubs|Stub Page]]',
  'label': 'Old Stub Page'};
 
// end Custom automatic delete buttons 
 
if(wgNamespaceNumber!=-1) addOnloadHook(function() { addPortletLink('p-cactions','/wiki/Special:Prefixindex/' + escape(wgPageName),'Subpages','ca-subpages','Show subages of ' + wgPageName); });
 
//