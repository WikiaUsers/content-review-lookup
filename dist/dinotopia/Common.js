/* Any JavaScript here will be loaded for all users on every page load. */
// To make hover over tag appear for admins
function AdminTag() {
 $('[href="/wiki/User:Starfleet_Academy"], [href="/wiki/User:MakeShift"]').attr('title', 'This user is an Administrator');
}
 
/* === AjaxRC (and compatibility code by Mathmagician & Pecoes) === */
// Ajax auto-refresh
var ajaxPages = ['Special:RecentChanges','Special:WikiActivity'];
var AjaxRCRefreshText = 'Auto-refresh';
 
/* This calls FounderTag() and AdminTag()
 * after every time the ajax reloads */
ajaxCallAgain = [AdminTag];
 
importScriptPage('AjaxRC/code.js', 'dev');
// END of ajax auto-refresh
 
/* These next line will call AdminTag() 
* only once, after the page
* finishes loading */
$(AdminTag);
//END AdminTag

/* === Importing Show/Hide code from Wikia Devolopers' Wiki === */
// importing show/hide
var ShowHideConfig = { autoCollapse: Infinity };
importScriptPage('ShowHide/code.js', 'dev');
// END importing show/hide