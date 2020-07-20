//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Please follow the <a href="/wiki/Policies" target="_blank" title="Chat_Rules">Chat Rules</a> so<br />that we all have a great time! :D<br>We would also like to ask that you check our <a href="/wiki/IRC" target="_blank" title="IRC_Channel">IRC channel</a> for other wiki members.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:90%;z-index:0;font-size:12px;line-height:1.6;color:#3A3A3A">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()
 
importScriptPage('ChatOptions/code.js', 'dev');