// Chat's topic.
var chatTopic = '<font color="#000000">Welcome! Please read the<br /> <a href="/Project:Main_Rules#Chat_Rules" target="_blank" title="Chat Rules"><u>Chat Rules</u></a> before using the chat.</font>'
 
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
importScriptPage("ChatOptions/code.js", "dev");