    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
	$('.insertusername').html(wgUserName);
}
 
/****************************/
/* IMPORTED START           */
/****************************/
 
// Extra Rollback Buttons
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback
 
/* Standard edit summaries*/
importScript('MediaWiki:Common.js/es.js');

 
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
 
 
/** Dynamic Navigation Bars (experimental)**/
importScript('MediaWiki:Common.js/Nav.js');
 
/* other */ 
importScript('MediaWiki:Common.js/other.js');
 
 
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