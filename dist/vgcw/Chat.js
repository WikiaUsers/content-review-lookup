//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Talking about the Wiki, or watching the <a href="http://www.twitch.tv/bazza87" target="_blank">live show</a>.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="position:absolute;z-index:0;font-size: 13px;color:#CCCCCC;font-weight:bold;line-height:1.6;margin-left:115px;"><div style="color:#F7D7D7;padding-right:20px;vertical-align: bottom;font-size:20px;display:inline;font-family:"Lucida Console",Monaco,monospace;">Chat</div>'+chatTopic+'</div>')
	//.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()