//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Please read our <a href="/wiki/Chat_Policies" target="_blank" title="Chat Policies">Chat Policies</a> - <a href="/wiki/MediaWiki:Emoticons" target="_blank" title="Emoticons">Emoticons</a> for fun!'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:100%;z-index:0;font-size:55%;color:#3A3A3A">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()