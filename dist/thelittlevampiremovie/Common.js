/* Any JavaScript here will be loaded for all users on every page load. */


 
/* Replaces {{USERNAME}} with the name of the user browsing the page.
   Requires copying Template:USERNAME. */
 
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);
 
/* End of the {{USERNAME}} replacement */
 
 
/* Ajax Auto-Refresh (courtesy pcj) */
/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */
 
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
/* Falling Wikia Ws*/
importScript('MediaWiki:Common.js/falling.js');
 
 
/* Display Timer */
importScript('MediaWiki:Common.js/DisplayTimer.js');
 
$(document).ready(function() {
    if (skin == 'oasis') 
        $('<a href="http://community.wikia.com/wiki/Community_Central">Wiki Rules</a>').apendTo('#CorporateFooter');
});
// 01:39, February 23, 2012 (UTC) // <source lang="JavaScript"> // Test if an Element has a Certain Class importScript('MediaWiki:Common.js/elementClass.js'); // END Test if an Element has a Certain Class // Cookie accessor functions importScript('MediaWiki:Common.js/cookieAccessor.js'); // END Cookie accessor functions // Redesign of ProfileMastheads (included for statustop) importScript('MediaWiki:Common.js/profileRedesign.js'); // END Redesign of ProfileMastheads // Custom edit buttons importScript('MediaWiki:Common.js/CEB.js'); // END of custom edit buttons var autoCollapse = 2; var collapseCaption = "hide"; var expandCaption = "show"; var maxHeight = 300; // Collapsible Tables importScriptPage('ShowHide/code.js', 'dev'); // END of Collapsible Tables // Standard Edit Summaries importScript('MediaWiki:Common.js/standardeditsummaries.js'); // END of Standard Edit Summaries // Ajax auto-refresh var ajaxPages = ['Special:RecentChanges','Special:WikiActivity']; var AjaxRCRefreshText = 'Auto-refresh'; importScript('MediaWiki:Common.js/ajaxRefresh.js'); // END of ajax auto-refresh // Added SiteNotice Functionality importScript('MediaWiki:Common.js/sitenotice.js'); // END of added SiteNotice functionality // Fix Edit Summary Prompt for UNDO importScript('MediaWiki:Common.js/undoSummary.js'); // END Fix Edit Summary Prompt for UNDO // Skin Redirect Code importScript('MediaWiki:Common.js/skinRedirect.js'); // END of Skin Redirect Code // Extra Rollback Buttons importScript('MediaWiki:Common.js/extraRollbacks.js'); // END Extra Rollback Buttons // AjaxRollback - works with Extra Rollback Buttons importScript('MediaWiki:Common.js/ajaxRollback.js'); // END AjaxRollback // FastDelete Buttons for Administrators importScript('MediaWiki:Common.js/fastDelete.js'); // END FastDelete Buttons for Administrators // Adds DisplayClock importScript('MediaWiki:Common.js/displayClock.js'); // END Adds DisplayClock // JS for Template:CSS importScript('MediaWiki:Common.js/userCSS.js'); // END JS for Template:CSS // Adds PURGE button for both skins var PurgeButtonText = 'Purge'; importScript('MediaWiki:Common.js/PurgeButton.js'); // END Adds PURGE button for both skins // For UserGroup-only messages importScript('MediaWiki:Common.js/UserGroupMessages.js'); // END For UserGroup-only messages // Add "Edit Intro" Button/Tab importScript('MediaWiki:Common.js/EditIntroButton.js'); // END Add "Edit Intro" Button/Tab // Adds PopupsNavigation importScript('MediaWiki:Common.js/popupsNav.js'); // END Adds PopupsNavigation // Add Enhanced DIFF View importScript('MediaWiki:Common.js/wikEdDiff.js'); // END Add Enhanced DIFF View // Add Template:Information to Special:Upload importScript('MediaWiki:Common.js/uploadTemp.js'); // END Add Template:Information to Special:Upload // Backwards compatibility CSS importScript('MediaWiki:Common.js/backupCSS.js'); // END Backwards compatibility CSS // Locate Main Page "Buttons" into Headers importScript('MediaWiki:Common.js/mainPageButtons.js'); // END Locate Main Page "Buttons" into Headers // IE-specific fixes importScript('MediaWiki:Common.js/IE.js'); // END IE-specific fixes // Display Comments w/ Local Times // importScript('MediaWiki:Common.js/localTimeComments.js'); // END Display Comments w/ Local Times // </source>