/* Collapsible elements and tables */
importScriptPage('ShowHide/code.js', 'dev');

/* Add "purge" option to page controls */
importScriptPage('PurgeButton/code.js', 'dev');

/* Discourage/disable the editing of talk page archives */
importScriptPage('DisableArchiveEdit/code.js', 'dev');

/* Countdown clock */
importScriptPage('Countdown/code.js', 'dev');

/* Inactive users get an "inactive" tag on their profile headers */
InactiveUsers = {months: 2};
importScriptPage('InactiveUsers/code.js', 'dev');

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');

/* Automatically fills the summary field in upload form with filebox
 * by: [[User:Xiao Qiao]]
 */
 
if ( wgCanonicalSpecialPageName == "Upload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}
 
if ( wgCanonicalSpecialPageName == "MultipleUpload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}