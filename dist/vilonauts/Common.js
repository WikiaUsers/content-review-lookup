 /* Any JavaScript here will be loaded for all users on every page load. */
 
/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');
 
importScriptPage('Countdown/code.js', 'dev');
 
/* track incontent share fb button */
$(function(){
    $("#incontent_share").click(function(){
        WET.byStr("articleAction/incontent_share/" + wgPageName);
    });
});
 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
// Redesign of ProfileMastheads (included for statustop)
importScript('MediaWiki:Common.js/profileRedesign.js');
// END Redesign of ProfileMastheads
 
// Custom edit buttons
importScript('MediaWiki:Common.js/CEB.js');
// END of custom edit buttons
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
var maxHeight = 300;
 
// Dynamic Navigation Bars
importScript('MediaWiki:Common.js/navigationbars.js');
// END Dynamic Navigation Bars
 
// Dynamic Navigation Bars (2)
importScript('MediaWiki:Common.js/navigationbars2.js');
// END Dynamic Navigation Bars (2)
 
// Collapsible Tables
importScript('MediaWiki:Common.js/collapsibleTables.js');
// END of Collapsible Tables
 
// Standard Edit Summaries
importScript('MediaWiki:Common.js/standardeditsummaries.js');
// END of Standard Edit Summaries
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
/* Adds "purge" option to page controls
 
* See w:c:dev:PurgeButton for info & attribution
*/
 
 
 
importScriptPage('PurgeButton/code.js', 'dev');
 
 
// Added SiteNotice Functionality
importScript('MediaWiki:Common.js/sitenotice.js');
// END of added SiteNotice functionality
 
// Fix Edit Summary Prompt for UNDO
importScript('MediaWiki:Common.js/undoSummary.js');
// END Fix Edit Summary Prompt for UNDO
 
// Skin Redirect Code
importScript('MediaWiki:Common.js/skinRedirect.js');
// END of Skin Redirect Code
 
// Extra Rollback Buttons
importScript('MediaWiki:Common.js/extraRollbacks.js');
// END Extra Rollback Buttons
 
// AjaxRollback - works with Extra Rollback Buttons
importScript('MediaWiki:Common.js/ajaxRollback.js');
// END AjaxRollback
 
// Adds DisplayClock
importScript('MediaWiki:Common.js/displayTimer.js');
// END Adds DisplayClock
 
// JS for Template:CSS
importScript('MediaWiki:Common.js/userCSS.js');
// END JS for Template:CSS
 
// Adds PURGE button for both skins
var PurgeButtonText = 'Purge';
importScript('MediaWiki:Common.js/PurgeButton.js');
// END Adds PURGE button for both skins
 
// For UserGroup-only messages
importScript('MediaWiki:Common.js/UserGroupMessages.js');
// END For UserGroup-only messages
 
// Add "Edit Intro" Button/Tab
importScript('MediaWiki:Common.js/EditIntroButton.js');
// END Add "Edit Intro" Button/Tab
 
// Adds PopupsNavigation
// importScript('MediaWiki:Common.js/popupsNav.js');
// END Adds PopupsNavigation
 
// Add Enhanced DIFF View
importScript('MediaWiki:Common.js/wikEdDiff.js');
// END Add Enhanced DIFF View
 
// Add Template:Information to Special:Upload
importScript( 'MediaWiki:Common.js/uploadTemp.js');
// END Add Template:Information to Special:Upload
 
// Backwards compatibility CSS
importScript('MediaWiki:Common.js/backupCSS.js');
// END Backwards compatibility CSS