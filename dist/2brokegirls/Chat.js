/* ============================================================ */
/*  Chat topic - Credit to Runescape Wiki                       */    
/* ============================================================ */

var chatTopic = 'Welcome to Wiliamsburg Diner. </a>';

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;');
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove();
 
/* ============================================================ */
/*  Chat options import - multikick, afk, multipm, and others   */    
/* ============================================================ */

var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScriptPage('MediaWiki:Chat.js/options.js');
}
 
/* ============================================================ */
/*  Title Change - Change the document title for the chat page  */    
/* ============================================================ */
 
document.title = "Williamsburg Diner - " + wgSitename;