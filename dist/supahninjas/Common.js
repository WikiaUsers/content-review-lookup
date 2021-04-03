/* Credits to Avatar and Dev Wiki */
 
// UserBadges settings
window.UserBadgesJS = {
	inactive: 30,          // Inactive if no edits in this many days, 0=disabled
	gone: {'Some User Name':true}, // List of users who have formally left or are taking a break but it hasn't been 'inactive' days yet
//      example - gone: {'Some User Name':true, 'Some Other User':true},
	groups: { bureaucrat:1, patroller:1, rollback:1, chatmoderator:1 },
	stopBlocked: true,     // Don't display any non-custom tags for blocked users
	newusers: true,        // Tag non-autoconfirmed users (MW1.19 only)
	nonusers: true,        // Tag global Wikia accounts that have never edited anything
	custom: { },    // Custom tags for users
//      example - custom: { 'UserName 1': ['My Badge 1', 'My Badge 2'], 'UserName 2': ['Other Badge'] },
	names: {},             // Tags display names
	debug: false           // Extra debugging messages in the console
}
/* Any JavaScript here will be loaded for all users on every page load. */

/* collapsible */
importScriptPage('ShowHide/code.js', 'dev');

/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */

importScriptPage('Countdown/code.js', 'dev');

importScriptPage('ShowHide/code.js', 'dev');

importScriptPage('RevealAnonIP/code.js', 'dev');
 
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

if (wgNamespaceNumber === 2 || wgNamespaceNumber === 3) {
$(function() {
    var i, len, html, rights = {
	"Bat Forever": ["Bureaucrat"],
    };
    rights = rights[wgTitle];
    if (typeof rights !== "undefined") {
        len = rights.length;
        html = "";
        // remove old rights
        //$('.UserProfileMasthead .masthead-info span.group').remove();
        for (i = 0; i < len; i += 1) {
            html += '<span class="group">' + rights[i] + '</span>';
        }
        $(html).appendTo('.masthead-info hgroup');
    }
});
}
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u: 'Rollback' },
		sourcepolice: { u: 'RS Police' },
	}
};
UserTagsJS.modules.custom = {
	'Empty': ['rollback'] // NOTE: order of list here does NOT matter
	'DeeMoShow': ['sourcepolice'] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});