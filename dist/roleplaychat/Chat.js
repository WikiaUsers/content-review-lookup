// Credit to Runescape Wiki
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Welcome to the Roleplay Chat. Please read <a href="/wiki/User blog:Phillycj/The Problem" target="/wiki/User blog:Phillycj/The Problem" title="The Problem"><u>this</u></a>.'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:100%;z-index:0;font-size:14px;color:#3A3A3A">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()