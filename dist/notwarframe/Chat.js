//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = 'Warframe Wiki Chat'
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="font-family:Roboto;font-weight:100;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})