/* Opens chat in a new window for homepage */
 
$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});
 
/*
$(function(){
	if ( wgNamespaceNumber === 112 || wgNamespaceNumber === 113 ||wgNamespaceNumber === 114 || wgNamespaceNumber === 115 ) {
		var FEurl = wgScript + '?title=Admin_Central:Main_Page';
		$('h1.wordmark.medium.graphic > a').attr('href', FEurl);
	}
});
*/

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */

/****************************/
/* IMPORTED START           */
/****************************/
// Extra Rollback Buttons -Thanks Monch 
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