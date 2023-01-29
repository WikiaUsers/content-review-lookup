// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to Community Central chat, feel free to ask for help or advice. If nobody's spoken for a while, we could be doing different things,  feel free to try the <a href="/wiki/Forum:Index" target="_blank" title="Forum:Index"><u>Forums</u></a> - or wait a bit, we\'ll be back.<br />For staff help, <a href="/wiki/Special:Contact" target="_blank" title="Special:Contact"><u>Click here</u></a>. To adopt a wiki <a href="/wiki/Adopt" target="_blank" title="Adopt"><u>Click here</u></a>.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
// END Chat topic