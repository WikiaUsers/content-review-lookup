var chatTopic = 'Welcome to the Vampire Diaries Wiki Chat! Please make sure to read the policy
 and other information <a href="/wiki/The Vampire Diaries Wiki:Chat"><u>here</u></a>.<br />Take part in discussion concerning the chat <a href="/wiki/Board:Chat_discussion">here</a>.'

$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
$('#ChatHeader .public.wordmark div:not(:first-child)').remove()

importScriptPage('ChatOptions/code.js', 'dev');