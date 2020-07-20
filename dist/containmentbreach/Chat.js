//Big thanks to the MLP Wiki and Halo Nation Wiki staff for helping me set up most of these scripts.

// Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
// Credit to the Runescape Wiki.
var chatTopic = '<font color="#FFFFFF">Welcome! Please read the<br /> <a href="/Project:Chat" target="_blank" title="Chat Guidelines"><u>Chat Guidelines</u></a> before using the chat.</font>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#FF0000; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// END Chat Topic

// ************
// Chat options import
// ************
// Written by Sactage, Callofduty4 and Madnessfan34537
var chatOptionsLoaded;
if (chatOptionsLoaded != 1){
	chatOptionsLoaded = 1;
	importScript('MediaWiki:Chat.js/options.js');
}
 
// ****************
// END Chat options import
// ****************

// Change the document title for the chat page.
// Credit to the MLP Wiki.
document.title = "MEMETIC KILL AGENT ACTIVATED";
//END