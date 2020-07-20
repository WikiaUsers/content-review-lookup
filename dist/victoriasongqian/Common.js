/* Any JavaScript here will be loaded for all users on every page load. */
 
/* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');
 
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
 
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity'];
var AjaxRCRefreshText = 'Auto-refresh';
importScript('MediaWiki:Common.js/ajaxRefresh.js');
// END of ajax auto-refresh
 
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

// Tooltip JS
importScript('MediaWiki:Common.js/tooltip.js');
// END Tooltip JS

// ==============================
// BackToTopButton
// ==============================
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//I don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
 
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:-2px; border:none;"><button style=" font-size: 97%; height: 17px; line-height: 16px;" type="button" value="Back To Top" onClick="goToTop();">Back To Top</button></li>').appendTo('#WikiaFooter > .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication

 
// *************************************************
// Pagetitle rewrite
//
// Rewrites the page's title, used by Template:Title
// *************************************************
 
    $(function(){
	var newTitle = $("#title-meta").html();
	if (!newTitle) return;
	var edits = $("#user_masthead_since").text();
	$(".firstHeading,#WikiaUserPagesHeader h1,#WikiaPageHeader h1").html(newTitle);
	$(".#user_masthead_head h2").html(newTitle + "<small id='user_masthead_since'>" + edits + "</small>");
});