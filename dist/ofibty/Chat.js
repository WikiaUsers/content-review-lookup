/* ============================================================ */
/*  Chat topic - Credit to Runescape Wiki                       */    
/* ============================================================ */

var chatTopic = 'Welcome to our Amazing Family. <br/><a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emoticons" style="position:relative;text-decoration:underline;">Emoticons</a> • <a href="/wiki/OFIBTY Wiki:Chat/Help" target="_blank" title="OFIBTY Wiki:Chat/Help" style="position:relative;text-decoration:underline;">Chat Help</a>';

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
 
document.title = "Our Awesome Chat - " + wgSitename;

/* ============================================================ */
/*  Chat Censor - changes specified characters in specific text */    
/* ============================================================ */
 
$('[name="message"]').keypress(function(e) {
	if (e.which == 32||e.which == 13) {
	}
})