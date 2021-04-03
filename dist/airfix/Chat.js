// Credit to Runescape Wiki

//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Airfix Wiki chat. Rules and more information can be found <a href="/wiki/Airfix Wiki:Chat" target="_blank" title="Airfix Wiki:Chat"><u>here</u></a>.<br />FAQs <a href="/wiki/Airfix Wiki:Chat/FAQ" target="_blank" title="Chat FAQ"><u>here</u></a>. Fill out the Chat questionnaire <a href="https://docs.google.com/spreadsheet/viewform?formkey=dFhmOXBISXBQRUVsbi1vcHYxZE5OU2c6MQ" target="_blank" title="Chat Questionnaire"><u>here!</u></a> <a href="http://fire.xertion.org/chat.html" target="_blank" title="Stats"><u>Chat statistics</u></a>'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center; position:absolute; width:60%; z-index:0; font-size: 13px; color:#3A3A3A; font-weight:bold; line-height:1.6; margin-left:110px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()