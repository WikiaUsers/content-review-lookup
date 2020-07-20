AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');
 
importScriptPage('ShowHide/code.js','dev');
 
/* Automatically fills the summary field in upload form with filebox
 * by: [[User:Xiao Qiao]]
 */
 
if ( wgCanonicalSpecialPageName == "Upload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}
 
if ( wgCanonicalSpecialPageName == "MultipleUpload" ) {
	document.write('<script type="text/javascript" src="/index.php?title=MediaWiki:Filebox.js&action=raw&ctype=text/javascript&dontcountme=s"></script>');
}