/* Any JavaScript here will be loaded for all users on every page load. */

/* ######################################################################## */
/* ### SHOW/HIDE                                                        ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description: Collapsible tables using jQuery. Allows tables to   ### */
/* ###              be collapsed, showing only the header.              ### */
/* ### Credit:      User:Dantman                                        ### */
/* ### Disclaimer:  See http://dev.wikia.com/wiki/ShowHide/code.js      ### */
/* ######################################################################## */
 
var ShowHideConfig = { autoCollapse: 1, userLang: false };
importScriptPage( 'ShowHide/code.js', 'dev' );
 
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:WikiActivity","Special:UncategorizedPages","Special:AllPages"];
 importScriptPage('AjaxRC/code.js', 'dev');


/* Hide Redirect
  * See w:c:dev:AjaxRC for info & attribution 
  */
importScriptPage('AllPagesHideRedirect/code.js', 'dev');

/*UserTags settings*/
UserTagsJS.modules.autoconfirmed = true; // Switch on
UserTagsJS.modules.custom = {
	'Purple Heart': ['founder'], // Founder of the wiki
};